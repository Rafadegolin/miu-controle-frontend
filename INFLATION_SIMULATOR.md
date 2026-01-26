# 🎈 Simulador de Inflação - Documentação Técnica

Ferramenta educativa que projeta a perda de poder de compra do usuário ao longo do tempo e o impacto da inflação em suas metas de longo prazo.

**Controller**: `InflationSimulatorController` (`/simulations/inflation`)
**Service**: `InflationSimulatorService`

---

## 1. Métricas Calculadas

### 1.1 Ganho Real (`Real Gain`)
Compara o ajuste salarial do usuário com a inflação projetada.
- Fórmula: `((1 + %Aumento) / (1 + %Inflação)) - 1`
- Se positivo: Ganho Real (Poder de compra aumentou).
- Se negativo: Perda de Poder de Compra.

### 1.2 Projeção de Poder de Compra
Mostra quanto valerá R$ 1.000,00 no futuro.
- Ex: Com inflação de 10% a.a., em 10 anos R$ 1.000,00 valerão apenas ~R$ 385,00.

---

## 2. Impacto no Sistema

O simulador cruza os dados da simulação com os dados reais do usuário:

### 2.1 Metas (`Goals`)
Recalcula o custo futuro das metas ativas.
- Ex: Meta "Carro" de R$ 50k para daqui 5 anos.
- Com inflação de 5%, o custo ajustado será ~R$ 63.8k.
- O sistema alerta: "Você precisará poupar R$ 13.8k a mais".

### 2.2 Orçamentos (`Budgets`)
Estima quanto o usuário precisará aumentar seus orçamentos mensais (Mercado, Gasolina) para manter o mesmo padrão de vida no final do período.

---

## 3. Endpoints

- **Simular**: `POST /simulations/inflation/impact`
    ```json
    {
      "inflationRate": 4.5,    // % a.a.
      "salaryAdjustment": 2.0, // % a.a.
      "periodMonths": 24       // Horizonte
    }
    ```
- **Cenários Prontos**: `GET /simulations/inflation/scenarios`
    - Retorna presets como "Otimista", "Pessimista" e "Realista (IPCA Atual)" para facilitar o uso.
