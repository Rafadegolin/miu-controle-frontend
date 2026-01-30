# ❤️ Health Score (Saúde Financeira) - Documentação Técnica

O Health Score gamifica a saúde financeira do usuário em uma nota única de **0 a 1000**. É recalulado diariamente (`@Cron`) com base em 5 pilares fundamentais.

**Controller**: `HealthScoreController` (`/health-score`)
**Service**: `HealthScoreService`
**Entidade**: `HealthScore`

---

## 1. Os 5 Pilares (Peso Total: 1000 pts)

1.  **Consistência (30% - 300 pts)**
    - Mede se o usuário usa o app regularmente.
    - 30 dias de uso no mês = 300 pontos.

2.  **Orçamento (25% - 250 pts)**
    - Mede a aderência aos orçamentos definidos.
    - Se gastar dentro do limite = Pontuação máxima. Estourar reduz a nota.

3.  **Metas (20% - 200 pts)**
    - Mede o progresso dos Objetivos ativos.
    - Média do % de completude das metas.

4.  **Reserva de Emergência (15% - 150 pts)**
    - Mede a cobertura do Colchão Financeiro.
    - >= 6 meses coberto = 150 pts.
    - >= 3 meses = 75 pts.

5.  **Diversificação (10% - 100 pts)**
    - Mede se o usuário tem mais de uma fonte de renda (redução de risco).
    - >= 2 fontes = 100 pts. 1 fonte = 50 pts.

---

## 2. Níveis de Saúde

| Pontos | Nível | Cor |
|--------|-------|-----|
| > 850 | **EXCELLENT** | 🔵 Azul/Platina |
| > 700 | **GOOD** | 🟢 Verde |
| > 500 | **HEALTHY** | 🟡 Amarelo |
| > 300 | **ATTENTION** | 🟠 Laranja |
| 0-300 | **CRITICAL** | 🔴 Vermelho |

---

## 3. Insights de IA (`refreshAiInsights`)

O endpoint `POST /health-score/refresh-insights` envia os dados brutos dos 5 pilares para a IA (GPT/Gemini) e pede um "diagnóstico médico" curto e motivacional focado no pilar mais fraco.

Exemplo de retorno: *"Sua consistência está ótima, mas sua reserva de emergência é perigosa. Foque em guardar R$ 100 essa semana para começar seu colchão."*
