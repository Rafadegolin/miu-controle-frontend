# Roadmap de Implementação Frontend - Miu Controle

Este documento sugere uma ordem lógica de implementação das funcionalidades no Frontend. A ordem foi escolhida baseada em **dependências técnicas** (o que precisa existir antes) e **valor para o usuário** (o que é essencial para o app funcionar).

---

## 🏁 Fase 1: Fundação & Acesso (Essential)
**Objetivo**: Permitir que o usuário entre no sistema e configure sua conta. Sem isso, nada mais funciona.

1.  **Autenticação (`/auth`)**
    *   **Login & Registro**: Telas bonitas, com validação de formulário.
    *   **Recuperação de Senha**: Fluxo completo (Esqueci senha -> Token -> Nova senha).
    *   **Gestão de Sessão**: Implementar Contexto de Auth (`AuthProvider`) para salvar tokens e proteger rotas privadas.
2.  **Onboarding (`/onboarding`)**
    *   **Por que agora?** Assim que o usuário cria conta, ele CAI aqui. É a primeira impressão.
    *   **Implementação**: Wizard (Passo a passo) para configurar tema, moeda e perfil inicial.
3.  **Perfil do Usuário (`/users`)**
    *   Upload de Avatar e edição de dados básicos.

---

## 💰 Fase 2: O Core Financeiro (MVP)
**Objetivo**: Entregar a promessa básica do app: controlar dinheiro.

4.  **Contas (`/accounts`)**
    *   **Por que antes de transações?** Você precisa de uma conta para criar uma transação.
    *   **UI**: Listagem de cartões/contas e modal de criação ("Nova Nubank", "Dinheiro", etc).
5.  **Categorias (`/categories`)**
    *   Listagem e CRUD simples. Necessário para classificar os gastos.
6.  **Transações (`/transactions`)**
    *   **A feature mais complexa do Core**.
    *   Listagem (Extrato), Filtros (Mês, Tipo), e Criação/Edição.
    *   **Dica**: Implemente aqui o feedback visual da IA ("Categoria sugerida automaticamente").

---

## 📊 Fase 3: Gestão & Metas
**Objetivo**: Transformar o app de um simples "bloco de notas" em um gerenciador financeiro.

7.  **Dashboard Principal (`/dashboard`)**
    *   Agora que temos transações, podemos montar os gráficos de Visão Geral, Saldo Atual e Despesas vs Receitas.
8.  **Orçamentos (`/budgets`)**
    *   Barras de progresso por categoria (ex: "Alimentação: gastou 80% do planejado").
9.  **Objetivos / Potes (`/goals`)**
    *   UI de "Cards" com imagens bonitas (férias, carro novo).
    *   Funcionalidade de "Depositar" (criar transação vinculada ao objetivo) e "Sacar".

---

## 🧠 Fase 4: Inteligência & Automação (O Diferencial)
**Objetivo**: Ativar as features "Mágicas" que vendem o produto.

10. **Planejamento Inteligente (`/planning`)**
    *   Na tela de detalhe de um Objetivo, adicione o botão "Planejar com IA".
    *   Exiba o chat/sugestões retornadas pelo backend.
11. **Transações Recorrentes (`/recurring-transactions`)**
    *   Tela separada para gerenciar assinaturas (Netflix, Spotify).
    *   Visualmente distinguir o que é "Fixo" do que é avulso.
12. **Alertas Proativos (`/proactive-alerts`)**
    *   Implementar "Toasts" ou banners no topo do Dashboard avisando de contas a vencer.

---

## 🎮 Fase 5: Engajamento (Gamificação)
**Objetivo**: Reter o usuário e tornar o uso divertido.

13. **Barra de XP e Nível**
    *   Componente persistente no Header ou Sidebar mostrando o progresso.
    *   Conectar ao WebSocket para animar quando subir de nível.
14. **Missões (`/gamification/missions`)**
    *   Tela de "Quests" diárias/semanais.
    *   Botão de "Resgatar Recompensa".
15. **Health Score (`/health-score`)**
    *   Página dedicada com o "Velocímetro" da saúde financeira e as dicas da IA.

---

## ⚙️ Fase 6: Polimento & Admin
**Objetivo**: Ajustes finais e ferramentas de gestão.

16. **Central de Notificações**
    *   Menu dropdown ("Sininho") listando os alertas do sistema.
17. **Admin Panel**
    *   Acesso restrito. Gráficos de usuários totais, gestão de usuários (banir), etc.
18. **Feedback & Release Notes**
    *   Modal para ver "O que há de novo" e formulário de contato.

---

## 💡 Resumo da Estratégia
1.  **Fundação**: Garanta que o usuário entra.
2.  **Core**: Garanta que o usuário lança gastos.
3.  **Valor**: Mostre para onde o dinheiro vai (Gráficos/Metas).
4.  **Magia**: Automatize e traga IA.
5.  **Diversão**: Gamifique.

Siga essa ordem para evitar "bloqueios" (ex: tentar fazer gráfico de metas sem ter transações implementadas).
