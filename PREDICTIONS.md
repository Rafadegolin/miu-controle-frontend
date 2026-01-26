# 🔮 Previsões de Gastos (Predictions) - Documentação Técnica

O módulo de Previsões utiliza estatística e IA para estimar os gastos futuros em categorias variáveis (ex: Mercado, Uber, Lazer), onde não existe um valor fixo recorrente.

**Controller**: `PredictionsController` (`/predictions`)
**Service**: `PredictionEngineService`

---

## 1. Motor de Previsão

### 1.1 Detecção de Categorias Variáveis
O sistema analisa o histórico do usuário para identificar quais categorias têm comportamento variável, mas frequente.
- Critério: Categorias com transações em pelo menos 3 dos últimos 6 meses e desvio padrão > 0.

### 1.2 Algoritmo de Estimativa
Para cada categoria detectada, o sistema calcula:
- **PredictedAmount**: Média ponderada dos últimos meses (pesos maiores para meses recentes).
- **Confidence**: Grau de certeza baseado na variabilidade histórica (Desvio Padrão).
- **Bounds**: Limites Superior e Inferior (Intervalo de Confiança).

---

## 2. Endpoints

- **Variáveis do Mês**: `GET /predictions/variable-expenses?month=YYYY-MM`
    - Retorna a lista de categorias variáveis com seus valores previstos para o mês solicitado.
    - Útil para preencher o orçamento antes do mês começar.

- **Previsão Específica**: `GET /predictions/category/:id`

---

## 3. Uso no Dashboard

Essas previsões alimentam o gráfico de **Fluxo de Caixa Projetado** (módulo Projections), preenchendo a lacuna dos gastos que não são fixos. Sem isso, a projeção ficaria artificialmente "rica" pois só consideraria contas fixas.
