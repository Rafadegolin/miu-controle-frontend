# 📈 Projeções de Fluxo de Caixa (Projections) - Documentação Técnica

O módulo de Projeções é responsável por olhar para o futuro e desenhar a curva de saldo do usuário. Ele combina dados determinísticos (fixos) com dados estocásticos (variáveis/previsões).

**Controller**: `ProjectionsController` (`/projections`)
**Service**: `ProjectionsService`

---

## 1. Composição do Cálculo

Para cada mês futuro (loop de projeção):

`Saldo_Final = Saldo_Anterior + (Receitas - Despesas)`

Onde Receitas/Despesas são a soma de:
1.  **Transações Recorrentes (Fixo)**: Aluguel, Salário, Internet. O sistema verifica se a recorrência cai naquele mês específico.
2.  **Previsões (Variável)**: Estimativa de gastos de Mercado, Lazer, etc. (vinda do módulo `Predictions`).

### 1.2 Cenários (`ProjectionScenario`)
O sistema calcula limites para dar uma visão realista:
- **Otimista**: Considera "Variável - Desvio Padrão" (Gastar pouco).
- **Pessimista**: Considera "Variável + Desvio Padrão" (Gastar muito).
- **Realista**: Considera a média.

---

## 2. Endpoints

- **Fluxo de Caixa**: `GET /projections/cash-flow`
    - Query: `months=6` (Padrão), `scenario=REALISTIC`.
    - Retorna array de objetos mês a mês com:
        - `income`: { fixed, variable, total }
        - `expenses`: { fixed, variable, total }
        - `balance`: { period, accumulated }
        - `scenarios`: { optimistic, pessimistic }

- **Saldo Futuro Simples**: `GET /projections/balance-forecast?months=1`
    - Retorna apenas o saldo acumulado previsto para o final do período.

---

## 3. Integração Frontend

Os dados deste endpoint devem ser plotados em um **Gráfico de Área ou Linha**, mostrando a evolução do saldo acumulado e a "faixa de incerteza" (área sombreada entre Otimista e Pessimista).
