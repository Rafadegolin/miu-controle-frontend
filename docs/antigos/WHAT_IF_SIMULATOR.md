# 🎲 Simulador "E Se?" (What-If Simulator) - Documentação Técnica

O Simulador de Cenários ("Simulador E Se") permite que o usuário projete o impacto financeiro de grandes decisões antes de tomá-las, utilizando a projeção de fluxo de caixa baseada no histórico.

**Controller**: `ScenariosController` (`/scenarios`)
**Service**: `ScenariosService`

---

## 1. Lógica de Simulação

O motor de simulação funciona em 4 etapas:

1.  **Baseline (Linha de Base)**: Calcula a média de *Superávit Mensal* (Receitas - Despesas) dos últimos 3 meses.
2.  **Projeção Inicial**: Projeta o saldo acumulado para os próximos **12 meses** assumindo que o padrão de consumo se mantenha.
3.  **Aplicação do Evento**: Insere o evento simulado no fluxo.
    - `BIG_PURCHASE`: Subtrai valor (único ou parcelado) do saldo projetado.
    - `INCOME_LOSS`: Reduz a entrada mensal a partir da data especificada.
    - `NEW_RECURRING`: Adiciona uma despesa mensal fixa.
4.  **Análise de Viabilidade**:
    - Se o saldo acumulado ficar **negativo** em qualquer mês futuro → **INVIÁVEL**.
    - Se o saldo permanecer positivo → **VIÁVEL**.

---

## 2. Tipos de Cenário (`ScenarioType`)

| Tipo | Descrição | Parâmetros Extras |
|------|-----------|-------------------|
| `BIG_PURCHASE` | Compra de alto valor (ex: Carro). | `installments` (Parcelas). |
| `INCOME_LOSS` | Perda de renda (Demitido?). | - |
| `NEW_RECURRING`| Nova assinatura/Mensalidade. | - |
| `EMERGENCY` | Gasto imprevisto imediato. | - |

---

## 3. Endpoints

- **Simular**: `POST /scenarios/simulate`
    ```json
    {
      "type": "BIG_PURCHASE",
      "amount": 5000.00,
      "installments": 10,
      "description": "Notebook Gamer"
    }
    ```
    - **Retorno**:
        - `isViable`: Boolean.
        - `lowestBalance`: Pior saldo atingido no período.
        - `projectedBalance12Months`: Array com 12 valores numéricos (gráfico).
        - `recommendations`: Lista de sugestões (ex: "Aumente as parcelas", "Corte gastos").

---

## 4. Recomendações Automáticas

O sistema sugere ajustes dinâmicos:
- Se o impacto for alto no mês 1, sugere **Parcelamento**.
- Se o saldo ficar negativo por pouco (ex: R$ -200), sugere **Pequenos Cortes**.
- Se for inviável a longo prazo, sugere **Adiar**.
