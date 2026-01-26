# 💰 Orçamentos (Budgets) - Documentação Técnica

O módulo de Orçamentos permite que o usuário defina limites de gastos para categorias específicas, ajudando no controle financeiro e evitando surpresas no fim do mês.

**Controller**: `BudgetsController` (`/budgets`)
**Service**: `BudgetsService`
**Entidade**: `Budget` (Prisma)

---

## 1. Estrutura do Orçamento

Um orçamento é sempre vinculado a uma **Categoria** e um **Período**.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `amount` | Decimal | Valor limite do orçamento (ex: R$ 1.000,00). |
| `period` | Enum | `MONTHLY`, `WEEKLY` ou `YEARLY`. |
| `startDate` | Date | Data de início da vigência. |
| `endDate` | Date? | Data final (opcional). Se nulo, é perpétuo (renova a cada ciclo). |
| `alertPercentage` | Int | Porcentagem para disparar alerta amarelo (Padrão: 80%). |

---

## 2. Endpoints Principais

### 2.1 Criar Orçamento
Cria um novo limite de gastos. Não é permitido criar dois orçamentos para a mesma categoria com datas conflitantes.

- **POST** `/budgets`
- **Body**:
```json
{
  "categoryId": "uuid-da-categoria",
  "amount": 1000.00,
  "period": "MONTHLY",
  "startDate": "2024-01-01",
  "alertPercentage": 80
}
```

### 2.2 Listagem e Status
Retorna a lista de orçamentos com o status atual calculado em tempo real.

- **GET** `/budgets`
- **Resposta**:
```json
[
  {
    "id": "uuid",
    "category": { "name": "Alimentação", "icon": "🍔" },
    "amount": 1000.00,
    "spent": 850.00,           // Gasto total no período
    "remaining": 150.00,       // Quanto ainda pode gastar
    "percentage": 85.00,       // % consumida
    "status": "WARNING",       // OK, WARNING ou EXCEEDED
    "startDate": "2024-01-01"
  }
]
```

### 2.3 Resumo Mensal (`/summary`)
Retorna uma visão agregada de todos os orçamentos ativos no mês, ideal para dashboards.

- **GET** `/budgets/summary?month=2024-01-01`
- **Cache**: 10 minutos.
- **Retorno**:
    - `totalBudgeted`: Soma dos orçamentos.
    - `totalSpent`: Soma dos gastos nessas categorias.
    - `overallPercentage`: % global de consumo.
    - `budgets`: Lista detalhada.

---

## 3. Lógica de Status e Alertas

O sistema classifica a saúde do orçamento em 3 estados:

1.  🟢 **OK**: Gasto abaixo do alerta (Ex: < 80%).
2.  🟡 **WARNING**: Gasto acima do alerta, mas dentro do limite (Ex: 80% - 99%).
3.  🔴 **EXCEEDED**: Gasto ultrapassou o limite (>= 100%).

### Automação (Notificações)
Existe um Job (`NotificationsService.checkBudgets`) que roda diariamente às 20h. Ele verifica esses status e envia notificações automáticas:
- **Tipo**: `BUDGET_ALERT` quando entra em WARNING.
- **Tipo**: `BUDGET_EXCEEDED` quando entra em EXCEEDED.
- **Canais**: Notificação no App e E-mail.

---

## 4. Regras de Negócio
1.  **Imutabilidade Histórica**: Alterar um orçamento afeta como o cálculo é feito no presente. O sistema não "congela" versões passadas de orçamentos (simplificação de MVP).
2.  **Exclusividade**: Um orçamento ativo bloqueia a criação de outro para a mesma categoria no mesmo intervalo de datas.
3.  **Visualização**: Gasto (`spent`) é a soma de todas as transações do tipo `EXPENSE` com status `COMPLETED` que pertencem àquela categoria e estão dentro do range de datas (`startDate` até `endDate`).
