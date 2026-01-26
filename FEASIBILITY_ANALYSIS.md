# ⚖️ Análise de Viabilidade (Feasibility) - Documentação Técnica

O módulo de Viabilidade (`Affordability`) é um "Score de Crédito Pessoal" para compras pontuais. Ele responde à pergunta: *"Posso comprar isso agora?"* com uma nota de 0 a 100.

**Controller**: `AffordabilityController` (`/affordability`)
**Service**: `AffordabilityService`

---

## 1. Sistema de Pontuação (Score)

A nota final (0-100) é composta por 6 dimensões ponderadas:

1.  **Saldo Atual (25 pts)**: Tenho dinheiro na conta hoje?
2.  **Orçamento (20 pts)**: Cabe no orçamento da categoria esse mês?
3.  **Reserva de Segurança (20 pts)**: Depois de comprar, sobra um saldo mínimo de segurança (ex: R$ 1.000)?
4.  **Impacto em Metas (15 pts)**: Essa compra vai atrasar meus sonhos (simulado via `ScenariosService`)?
5.  **Histórico (10 pts)**: É um gasto comum para meu padrão?
6.  **Timing (10 pts)**: Momento do mês (ex: Comprar dia 28 com saldo baixo é arriscado).

---

## 2. Classificação de Risco

| Score | Status | Cor | Recomendação |
|-------|--------|-----|--------------|
| 70-100| `CAN_AFFORD` | 🟢 Verde | Compra segura. Baixo impacto. |
| 40-69 | `CAUTION` | 🟡 Amarelo | Atenção. Pode comprometer orçamento ou reserva. |
| 0-39 | `NOT_RECOMMENDED`| 🔴 Vermelho | Alto risco. Adie ou parcele. |

---

## 3. Endpoints

- **Verificar**: `POST /affordability/check`
    ```json
    {
      "amount": 250.00,
      "categoryId": "uuid...", // ex: Vestuário
      "installments": 1
    }
    ```
    - **Retorno**:
        - `score`: 65
        - `status`: "CAUTION"
        - `badgeColor`: "#F59E0B"
        - `recommendations`: ["Essa compra vai estourar seu orçamento de Vestuário em 10%."]

---

## 4. Diferença para Simulador "E Se"

- **Simulador E Se**: Focado em **longo prazo** (Fluxo de Caixa de 12 meses) e grandes decisões (Carro, Casa).
- **Viabilidade**: Focado no **imediato** (Compra do dia-a-dia, Tênis, Jantar caro). É uma verificação rápida e tática.
