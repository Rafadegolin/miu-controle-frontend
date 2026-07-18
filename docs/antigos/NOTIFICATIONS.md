# 🔔 Sistema de Notificações - Documentação Técnica

O sistema de notificações do Miu Controle é responsável por alertar o usuário sobre eventos críticos (orçamento estourado, metas atingidas) e manter uma central de avisos dentro da aplicação.

**Controller**: `NotificationsController` (`/notifications`)
**Service**: `NotificationsService`

---

## 1. Tipos de Notificação (`NotificationType`)

O sistema suporta os seguintes tipos de eventos (Enum no Banco):

| Tipo | Descrição | Dados Extras (`data`) |
|------|-----------|------------------------|
| `BUDGET_ALERT` | O usuário atingiu 80% do orçamento. | `budgetId`, `categoryName`, `spent`, `percentage` |
| `BUDGET_EXCEEDED` | O orçamento foi estourado (>100%). | `budgetId`, `categoryName`, `spent`, `percentage` |
| `GOAL_ACHIEVED` | Uma meta atingiu 100% do valor alvo. | `goalId`, `goalName`, `amount`, `target` |
| `GOAL_MILESTONE` | Progression milestones (25%, 50%, 75%). | `goalId`, `goalName`, `milestone`, `percentage` |
| `BILL_DUE` | Conta a pagar vencendo em breve. | `transactionId`, `description`, `dueDate` |
| `SYSTEM` | Avisos gerais do sistema. | Variável |

---

## 2. Endpoints da API

### 2.1 Listar Notificações
Lista paginada (Cursor-based) para feed infinito.

- **GET** `/notifications`
- **Query Params**:
    - `unreadOnly=true`: Apenas não lidas.
    - `cursor`: ID do último item recebido (para paginação).
    - `take`: Quantidade (padrão 50).
- **Resposta**:
```json
{
  "items": [
    {
      "id": "uuid",
      "type": "BUDGET_ALERT",
      "title": "⚠️ Alerta de Orçamento",
      "message": "Você gastou 85% do orçamento de Alimentação",
      "data": { "categoryName": "Alimentação", "percentage": "85.00" },
      "read": false,
      "createdAt": "2024-01-25T..."
    }
  ],
  "nextCursor": "uuid-do-ultimo",
  "hasMore": true
}
```

### 2.2 Gerenciamento de Estado
- **Contador de Não Lidas**: `GET /notifications/unread-count`
- **Marcar como Lida**: `POST /notifications/mark-as-read` (Body: `{ "ids": ["uuid1", "uuid2"] }`)
- **Marcar Todas como Lidas**: `POST /notifications/mark-all-as-read`
- **Limpar Lidas**: `DELETE /notifications/clear-read` (Remove do banco)
- **Remover Específica**: `DELETE /notifications/:id`

---

## 3. Automação e Jobs

O sistema possui **Jobs Agendados** (`@Cron`) que monitoram proativamente o estado financeiro.

### 3.1 Monitor de Orçamentos
- **Frequência**: Diário às 20h (`0 20 * * *`).
- **Lógica**:
    1. Varre todos os orçamentos ativos do mês.
    2. Calcula o gasto atual da categoria.
    3. **Regra de 80%**: Se gasto >= 80% e < 100%, gera `BUDGET_ALERT`.
    4. **Regra de 100%**: Se gasto >= 100%, gera `BUDGET_EXCEEDED`.
    5. **Proteção de Spam**: Não envia se já notificou o mesmo alerta nas últimas 24h.
    6. **Canais**: Cria notificação In-App + Envia **Email**.

### 3.2 Monitor de Metas
- **Gatilho**: Executado sempre que uma transação é vinculada a uma meta (`checkGoalAchieved`).
- **Lógica**:
    1. Verifica milestones (25%, 50%, 75%). Apenas um disparo por milestone.
    2. Se atingir 100%, marca meta como `COMPLETED` e envia `GOAL_ACHIEVED`.
    3. **Canais**: In-App + Email (apenas para conquista de 100%).

---

## 4. Integração WebSocket

Sempre que uma notificação é criada (`NotificationsService.create`), ela é enviada em tempo real para o usuário conectado.

- **Evento**: `NOTIFICATION_NEW`
- **Payload**:
```json
{
  "notificationId": "uuid",
  "type": "SYSTEM",
  "title": "Título",
  "message": "Mensagem",
  "data": {}
}
```
Isso permite que o frontend exiba "Toasts" ou atualize o badge de sino sem refresh.

---

## 5. Emails Transacionais

Além do alerta no app, notificações críticas disparam emails via `EmailService`.
- Alerta de Orçamento (Amarelo).
- Orçamento Estourado (Vermelho).
- Meta Atingida (Verde).
