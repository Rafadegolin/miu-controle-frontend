# Guia de Funcionalidades e Integração Backend - Miu Controle

Este documento serve como um guia explicativo sobre as funcionalidades complexas do backend do Miu Controle e como a aplicação frontend deve interagir com elas para oferecer a melhor experiência ao usuário.

## 🏗️ Visão Geral da Arquitetura

O backend foi construído utilizando **NestJS**, seguindo uma arquitetura modular e orientada a serviços.

- **Banco de Dados**: PostgreSQL (gerenciado via Prisma ORM).
- **Validação**: Pipes globais validam todos os DTOs automaticamente. Se o frontend enviar dados inválidos, receberá `400 Bad Request` com a lista de erros.
- **Segurança**: Autenticação via JWT (Access Token curta duração + Refresh Token longa duração).
- **Real-time**: WebSocket (Socket.io) para notificações instantâneas.

---

## 🌟 Funcionalidades Principais (Deep Dive)

### 1. Sistema de Gamificação (XP, Missões e Níveis)
O sistema de gamificação ("Miu Hero") é orientado a eventos.

*   **Como funciona**: Quase todas ações do usuário (criar transação, atingir meta, pagar conta) emitem eventos internos.
*   **Processamento**: O `GamificationService` escuta esses eventos e:
    1.  Verifica se alguma missão ativa foi progredida.
    2.  Concede XP se aplicável.
    3.  Verifica se o usuário subiu de nível.
*   **No Frontend**:
    *   Sempre que o usuário realizar uma ação importante, atualize o contexto de gamificação ou faça listening do evento via WebSocket `gamification.level_up` ou `mission.completed` para exibir confetes/modais sem precisar de refresh.
    *   Endpoint: `GET /gamification/profile` e `/gamification/missions` são vitais para o dashboard.

### 2. Planejamento Inteligente (AI Goals)
Permite que o usuário planeje como atingir metas usando IA.

*   **Fluxo**:
    1.  Frontend chama `GET /planning/goal/:id/calculate`.
    2.  Backend analisa o saldo do usuário, despesas médias e o valor da meta.
    3.  IA (Gemini/GPT) sugere um valor de depósito mensal e estratégias (ex: "Corte 10% de iFood").
    4.  Frontend exibe as sugestões. O usuário aprova.
    5.  Frontend chama `POST /planning/goal/:id/save` para persistir o plano.

### 3. Transações Recorrentes (Engine)
O sistema gerencia assinaturas e contas fixas automaticamente.

*   **Engine**: Um Job (Cron) roda todo dia à meia-noite (`00:00`). Ele busca transações recorrentes onde `nextOccurrence <= hoje`.
*   **Geração**: Cria a transação real e recalcula a próxima data com base na frequência (MENSAL, SEMANAL, etc).
*   **Visibilidade**: No frontend, transações "futuras" (ainda não geradas) só aparecem na lista de Recorrências (`/recurring-transactions`). Na lista de extrato normal (`/transactions`), elas só aparecem *depois* de serem geradas (no dia do vencimento).
*   **Dica**: Use o endpoint `process-now` se o usuário quiser antecipar o pagamento de uma conta futura.

### 4. Categorização por IA
Toda nova transação sem categoria definida passa por uma tentativa de categorização automática.

*   **Fluxo**:
    1.  `POST /transactions` (sem categoryId).
    2.  Backend busca padrões (Regex) locais primeiro.
    3.  Se falhar, chama a IA (OpenAI/Gemini) para inferir a categoria com base na descrição.
    4.  Retorna a transação criada JÁ com a categoria e uma flag `aiCategorized: true`.
*   **Feedback Loop**: Se a IA errar, o frontend deve permitir que o usuário edite a categoria. Ao fazer isso, chame o endpoint específico de correção (`/transactions/:id/correct-category`) para que o sistema "aprenda" e crie uma regra personalizada para o futuro.

### 5. Health Score (Saúde Financeira)
Uma pontuação de 0 a 1000 que mede a saúde financeira.

*   **Cálculo**: Baseado em 5 pilares: Consistência (Logins/Registros), Orçamento (Respeitou limites?), Potes (Tem metas?), Emergência (Tem reserva?), Diversidade.
*   **Atualização**: Recalculado periodicamente, não instantaneamente.
*   **Frontend**: Use componentes estilo "Speedometer" ou "Radial Progress" para exibir o score `GET /health-score`.

---

## 💻 Guia para o Frontend

### 🔐 Autenticação e Sessão
O sistema usa par de tokens (Access + Refresh).

1.  **Login**: Salve o `accessToken` e o `refreshToken`.
2.  **Requests**: Envie `Authorization: Bearer <accessToken>`.
3.  **Expiração**: Se receber `401 Unauthorized`, tente usar o `refreshToken` (endpoint não implementado explicitamente no controller público, mas o fluxo padrão seria pedir novo token ou refazer login se simplificado). *Nota: No código atual, foque em manter o usuário logado e redirecionar para Login se 401.*

### 📡 WebSocket (Real-time)
O backend possui um servidor Socket.io pronto.

*   **URL**: A mesma da API (ex: `http://localhost:3000`).
*   **Conexão**:
    ```javascript
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3000", {
      auth: { token: "SEU_JWT_ACCESS_TOKEN" }
    });
    ```
*   **Eventos para escutar**:
    *   `notification`: Quando recebe notificação do sistema.
    *   `gamification.level_up`: Quando sobe de nível (exiba modal de parabéns!).
    *   `sync:transactions`: Quando uma transação é criada por outro dispositivo ou webhook bancário (atualize a lista).

### 🐛 Tratamento de Erros
O backend segue um padrão estrito para erros (`HttpException`).
Sempre espere um JSON no formato:
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password is too short"], // Array ou String
  "error": "Bad Request"
}
```
*Frontend*: Se `message` for array, exiba o primeiro item ou liste todos no toast de erro.

### 🖼️ Imagens e Uploads
O backend processa uploads e salva (localmente ou S3, dependendo da config).
*   **Avatar**: `POST /users/me/avatar`. Envie como `multipart/form-data`.
*   **Metas**: `POST /goals/:id/image`.
*   **Cache**: As URLs retornadas são públicas. O navegador fará cache, então se a imagem mudar mas a URL for a mesma, adicione um timestamp (`?v=123`) no src da imagem no React.

### 📱 Dicas de UI/UX
1.  **Skeletons**: A API é rápida, mas use Skeletons enquanto carrega dados (especialmente Dashboard).
2.  **Optimistic UI**: Para ações como "Check" em missões ou "Like", atualize a UI imediatamente antes de esperar a resposta da API.
3.  **Temas**: O backend salva a preferência de tema (`ocean`, `neon`, etc) no perfil do usuário (`GET /users/me`). Use isso para aplicar a classe CSS correta no `body` ao carregar a app.

---
*Gerado automaticamente pelo Agente AI Antigravity.*
