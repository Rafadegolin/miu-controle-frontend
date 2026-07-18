# 💡 Recomendações Inteligentes (Recommendations) - Documentação Técnica

O módulo de Recomendações é o "Consultor Financeiro" do sistema. Ele roda analisadores especializados para encontrar oportunidades de economia e melhoria financeira.

**Controller**: `RecommendationsController` (`/recommendations`)
**Service**: `RecommendationsService`
**Entidade**: `Recommendation`

---

## 1. Pipeline de Geração (Job Semanal)

Todo domingo (`@Cron`), o sistema executa uma cadeia de **Analyzers** para cada usuário:

1.  **ExpenseReducer**: Identifica gastos supérfluos recorrentes.
2.  **SubscriptionReviewer**: Detecta assinaturas duplicadas ou que aumentaram de preço.
3.  **BudgetOptimizer**: Sugere ajustes em orçamentos estourados.
4.  **OpportunityDetector**: Sugere investimentos se houver sobra de caixa.
5.  **RiskAlert**: Alerta sobre falta de reserva de emergência.

### 1.1 Refinamento com IA
Se o usuário tiver uma chave de IA configurada (OpenAI/Gemini), o texto técnico do analisador é enviado para a LLM reescrevê-lo com um tom mais humano, persuasivo e personalizado.

---

## 2. Sistema de Prioridade

Cada recomendação recebe um cálculo de:
- **Impacto** (Quanto dinheiro economiza).
- **Dificuldade** (Quão difícil é aplicar).
- **Prioridade Final**: `(Impacto * 0.6) + ((6 - Dificuldade) * 0.4)`.

O sistema limita a exibir no máximo **5 recomendações ativas** por vez para não sobrecarregar o usuário.

---

## 3. Endpoints

- **Listar Ativas**: `GET /recommendations`
- **Aplicar**: `POST /recommendations/:id/apply`
    - Marca como resolvida. (Futuro: Executar ação automática, como cancelar assinatura).
- **Dispensar**: `POST /recommendations/:id/dismiss`
    - Remove da lista.

---

## 4. Tipos (`RecommendationType`)
- `SPENDING_CUT`: Cortar gastos.
- `BUDGET_ADJUST`: Ajustar orçamento.
- `INVESTMENT`: Oportunidade de investir.
- `DEBT_REDUCTION`: Pagar dívida.
- `SAVING_OPPORTUNITY`: Trocar serviço por um mais barato.
