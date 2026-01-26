# 📊 Documentação da API de Relatórios (Miu Controle)

Este documento detalha os endpoints de relatórios disponíveis no backend, seus parâmetros de filtro e as estruturas de resposta.

**Base URL**: `/reports`
**Autenticação**: Obrigatória (`Bearer Token`)

---

## 🔍 Filtros Globais

Todos os endpoints de relatórios aceitam os seguintes query parameters para filtragem de dados. Todos são opcionais.

| Parâmetro | Tipo | Exemplo | Descrição |
|-----------|------|---------|-----------|
| `startDate` | DateString | `2024-01-01` | Data inicial do período (YYYY-MM-DD). Default: 1º dia do ano atual. |
| `endDate` | DateString | `2024-01-31` | Data final do período (YYYY-MM-DD). Default: Hoje. |
| `type` | Enum | `EXPENSE` | Filtrar por tipo: `INCOME` (Receita) ou `EXPENSE` (Despesa). |
| `accountId` | UUID | `123e4567...` | Filtrar transações de uma conta específica. |
| `categoryId` | UUID | `987fcdeb...` | Filtrar transações de uma categoria específica. |

---

## 1. Dashboard Resumido

Retorna os Key Performance Indicators (KPIs) principais, médias diárias e destaques do período.

- **Endpoint**: `/reports/dashboard`
- **Método**: `GET`
- **Cache**: 5 minutos

### Exemplo de Resposta

```json
{
  "summary": {
    "totalIncome": 15000.00,
    "totalExpense": 8500.50,
    "balance": 6499.50,
    "transactionCount": 45,
    "incomeCount": 5,
    "expenseCount": 40
  },
  "averages": {
    "avgDailyIncome": 500.00,
    "avgDailyExpense": 283.35,
    "avgTransactionValue": 522.23
  },
  "highlights": {
    "highestIncome": {
      "amount": 10000.00,
      "description": "Salário Mensal",
      "date": "2024-01-05T00:00:00.000Z"
    },
    "highestExpense": {
      "amount": 2500.00,
      "description": "Aluguel",
      "date": "2024-01-10T00:00:00.000Z"
    }
  },
  "period": {
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-31T23:59:59.999Z",
    "days": 31
  }
}
```

---

## 2. Análise por Categoria

Agrupa as transações por categoria, calculando totais e porcentagens. Ordenado do maior valor total para o menor.

- **Endpoint**: `/reports/category-analysis`
- **Método**: `GET`

### Exemplo de Resposta

```json
{
  "categories": [
    {
      "categoryId": "uuid-moradia",
      "categoryName": "Moradia",
      "categoryColor": "#FF5733",
      "categoryIcon": "🏠",
      "count": 5,
      "totalIncome": 0,
      "totalExpense": 3500.00,
      "total": 3500.00,
      "percentage": 41.17,
      "transactions": [
        {
          "id": "uuid-transacao",
          "amount": 2500.00,
          "description": "Aluguel",
          "date": "2024-01-10...",
          "type": "EXPENSE"
        }
      ]
    },
    {
      "categoryId": "uuid-alimentacao",
      "categoryName": "Alimentação",
      "total": 1200.00,
      "percentage": 14.11
      // ...
    }
  ],
  "totalCategories": 5,
  "grandTotal": 8500.50
}
```

---

## 3. Tendência Mensal

Agrupa os dados por mês para exibição em gráficos de linha ou barra.

- **Endpoint**: `/reports/monthly-trend`
- **Método**: `GET`

### Exemplo de Resposta

```json
{
  "months": [
    {
      "month": "2024-01",
      "income": 15000.00,
      "expense": 8500.50,
      "balance": 6499.50,
      "transactionCount": 45
    },
    {
      "month": "2024-02",
      "income": 15000.00,
      "expense": 7200.00,
      "balance": 7800.00,
      "transactionCount": 38
    }
  ],
  "totalMonths": 2
}
```

---

## 4. Análise por Conta

Mostra o fluxo de caixa e saldo atual de cada conta bancária.

- **Endpoint**: `/reports/account-analysis`
- **Método**: `GET`

### Exemplo de Resposta

```json
{
  "accounts": [
    {
      "accountId": "uuid-nubank",
      "accountName": "Nubank",
      "accountColor": "#820AD1",
      "currentBalance": 5400.00, // Saldo atual real da conta
      "totalIncome": 10000.00,   // Entradas no período filtrado
      "totalExpense": 4500.00,   // Saídas no período filtrado
      "netFlow": 5500.00,        // Resultado líquido no período
      "count": 22
    }
  ],
  "totalAccounts": 1
}
```

---

## 5. Top Transações

Retorna as maiores receitas e maiores despesas do período (Top 10). Útil para identificar grandes vilões do orçamento.

- **Endpoint**: `/reports/top-transactions`
- **Método**: `GET`

### Exemplo de Resposta

```json
{
  "topExpenses": [
    {
      "id": "uuid-1",
      "amount": 2500.00,
      "description": "Aluguel",
      "date": "2024-01-10...",
      "category": "Moradia",
      "account": "Itaú"
    }
    // ... até 10 itens
  ],
  "topIncomes": [
    {
      "id": "uuid-2",
      "amount": 10000.00,
      "description": "Salário",
      "category": "Salário",
      "account": "Nubank"
    }
  ]
}
```

---

## 6. Insights Automáticos

Gera análises textuais simples e avisos baseados nos dados processados (sem usar IA Generativa pesada, apenas lógica de negócio).

- **Endpoint**: `/reports/insights`
- **Método**: `GET`

### Exemplo de Resposta

```json
[
  {
    "type": "positive", // 'positive', 'negative', 'warning', 'info'
    "title": "Saldo Positivo",
    "message": "Você economizou R$ 6.499,50 neste período!",
    "icon": "💰"
  },
  {
    "type": "info",
    "title": "Maior Categoria de Gastos",
    "message": "Moradia representa 41.17% dos seus gastos (R$ 3.500,00)",
    "icon": "🏠"
  },
  {
    "type": "warning",
    "title": "Gastos em Alta",
    "message": "Seus gastos aumentaram 12.5% em relação ao mês anterior",
    "icon": "📈"
  }
]
```

---

## 7. Relatório Completo

Agrega **TODOS** os endpoints acima em uma única resposta. Ideal para carregar a página de Relatórios de uma só vez.

- **Endpoint**: `/reports/full-report`
- **Método**: `GET`

### Exemplo de Resposta

```json
{
  "dashboard": { ... },       // Estrutura do endpoint 1
  "categoryAnalysis": { ... },// Estrutura do endpoint 2
  "monthlyTrend": { ... },    // Estrutura do endpoint 3
  "accountAnalysis": { ... }, // Estrutura do endpoint 4
  "topTransactions": { ... }, // Estrutura do endpoint 5
  "insights": [ ... ],        // Estrutura do endpoint 6
  "generatedAt": "2024-01-25T22:00:00.000Z"
}
```
