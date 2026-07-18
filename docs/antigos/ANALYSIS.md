# 📊 Análise Financeira (Analysis) - Documentação Técnica

O módulo de Análise gera relatórios mensais fechados (`MonthlyReport`), congelando o estado financeiro do usuário para permitir comparações históricas precisas e geração de insights.

**Controller**: `AnalysisController` (`/analysis`)
**Service**: `AnalysisService`
**Entidade**: `MonthlyReport`

---

## 1. O Relatório Mensal

O sistema gera (ou atualiza) um snapshot contendo:
- **Totais**: Receita, Despesa, Saldo, Taxa de Poupança (Savings Rate).
- **Comparativos**:
    - `comparisonPrev`: Variação % em relação ao mês anterior.
    - `comparisonAvg`: Variação % em relação à média dos últimos 6 meses.
- **Top Categorias**: As 5 categorias onde mais se gastou.
- **Insights (Texto)**: Frases geradas automaticamente (ex: "📉 Parabéns! Você gastou 10% a menos que mês passado.").

---

## 2. Endpoints

- **Relatório Mensal**: `GET /analysis/monthly-comparison?month=YYYY-MM`
    - Se o mês for passado, busca o relatório salvo.
    - Se for o mês atual, gera um relatório parcial (forecast) em tempo real.
- **Último Relatório**: `GET /analysis/latest`
    - Atalho para pegar o último mês fechado.

---

## 3. Detecção de Anomalias

O serviço compara os gastos do mês com a média histórica. Se uma categoria desviar muito (ex: > 2x desvio padrão), ela é marcada na lista `anomalies`.
