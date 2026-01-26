# 🧠 AI Analytics - Documentação Técnica

O módulo de AI Analytics do Miu Controle combina matemática tradicional (Regressões Lineares, Z-Score) com Inteligência Artificial Generativa para oferecer insights financeiros profundos e previsões.

**Controller**: `AnalyticsController` (`/ai/analytics`)
**Service**: `PredictiveAnalyticsService`

---

## 1. Previsões Financeiras (`/forecast`)

Este endpoint gera uma visão do próximo mês baseada no histórico dos últimos 12 meses.

- **Método**: `GET /ai/analytics/forecast`
- **Fluxo de Processamento**:
    1. **Coleta de Dados**: Busca histórico agregado de receitas e despesas (12 meses).
    2. **Regressão Linear**: Calcula matematicamente a tendência (slope/intercept) para projetar o valor "frio" do próximo mês.
    3. **Análise de IA**: Envia os dados e a projeção matemática para o LLM (Gemini 1.5 Flash). O prompt pede para o modelo atuar como um "analista financeiro sênior".
    4. **Persistência**: Salva o resultado na tabela `PredictionHistory`.

### Exemplo de Resposta

```json
{
  "available": true,
  "forecast": {
    "summary": "Suas finanças estão estáveis, mas os gastos com alimentação subiram.",
    "healthScore": 75,
    "predictedExpense": 4250.00, // Valor ajustado pela IA ou matemático
    "predictedIncome": 8500.00,
    "savingsGoal": 1500.00,      // Sugestão de economia
    "insights": [
      "Aumento de 15% em Moradia nos últimos 3 meses.",
      "Você gasta mais nos finais de semana."
    ],
    "recommendation": "Tente reduzir os gastos com delivery."
  },
  "trends": {
    "predictedExpense": 4200.00, // Valor puramente matemático
    "predictedIncome": 8500.00,
    "expenseTrendSlope": 50.5,   // > 0 indica tendência de alta
    "incomeTrendSlope": 0
  }
}
```

---

## 2. Detecção de Anomalias

Sistema híbrido para identificar transações suspeitas ou fora do padrão.

- **Endpoint**: `GET /ai/analytics/anomalies`
- **Lógica de Detecção (Executada via Job Diário)**:
    1. **Baseline**: Calcula média e desvio padrão das despesas dos últimos 90 dias.
    2. **Z-Score**: Para cada nova transação, calcula `(Valor - Média) / DesvioPadrão`.
    3. **Threshold**:
        - Se `Z-Score > 3`: Considerada anomalia.
    4. **Análise de IA**: Se detectada, a IA analisa o contexto (descrição, categoria) para classificar o risco (`LOW`, `MEDIUM`, `HIGH`) e tentar explicar o motivo (ex: "Provável gasto anual recorrente").

### Gerenciamento
- **Dismiss**: O usuário pode dispensar uma anomalia (`POST /ai/analytics/anomalies/:id/dismiss`), marcando-a como "Visto/Aceito".

---

## 3. Health Score (Saúde Financeira)

Calcula uma pontuação de 0 a 100 indicando a saúde financeira do usuário.

- **Endpoint**: `GET /ai/analytics/financial-health`
- **Composição da Nota**:
    1. **Taxa de Poupança (40 pts)**: Quanto sobra do salário? (>20% = max pts).
    2. **Consistência (30 pts)**: Baixa variância nos gastos mensais (Coeficiente de Variação).
    3. **Saúde do Orçamento (30 pts)**: Respeito aos limites definidos e ausência de meses no negativo.

**Níveis**:
- 💎 **DIAMANTE**: Score >= 80
- 🪙 **PLATINA**: Score >= 60
- 🥇 **OURO**: Score >= 40
- 🥈 **PRATA**: Score >= 20
- 🥉 **BRONZE**: Score < 20

---

## 4. Previsão de Metas (`/goal-forecast/:id`)

Calcula quando uma meta será atingida com base no ritmo atual de contribuições.

- **Lógica**:
    - Analisa as contribuições dos últimos **90 dias**.
    - Calcula a "velocidade diária" média de contribuição.
    - Estima a data de conclusão: `Hoje + (Restante / Velocidade)`.
- **Status Retornados**:
    - `COMPLETED`: Já atingida.
    - `ON_TRACK`: Ritmo suficiente para atingir.
    - `STALLED`: Sem contribuições recentes (90 dias).

---

## 5. Análise de Tendências (`/trends`)

Endpoint puro para gráficos, retornando dados de `3M`, `6M` ou `1Y`.

- **Output Extra**:
    - `incomeGrowth`: Crescimento % da receita no período.
    - `expenseGrowth`: Crescimento % da despesa no período.
