# 🧠 Planejamento Inteligente (Intelligent Planning) - Documentação Técnica

O módulo de Planejamento Inteligente utiliza análise de dados para ajudar o usuário a alcançar seus objetivos financeiros. Ele verifica se a meta é viável considerando o fluxo de caixa atual e sugere ações corretivas (cortes ou adiamento).

**Controller**: `PlanningController` (`/planning`)
**Service**: `PlanningService`
**Entidade**: `GoalPlan`

---

## 1. Algoritmo de Viabilidade

Ao simular um plano para um objetivo (`calculateGoalPlan`), o sistema executa:

1.  **Cálculo da Necessidade**:
    - `Valor_Restante = Meta - Atual`
    - `Mensalidade_Necessaria = Valor_Restante / Meses_Restantes`
2.  **Análise de Capacidade (Surplus)**:
    - Analisa média de `Receitas - Despesas` dos últimos 3 meses.
    - `Capacidade_Real = Média_Sobras`
3.  **Veredito**:
    - Se `Capacidade_Real >= Mensalidade_Necessaria` → **VIÁVEL** 🟢
    - Se `Capacidade_Real < Mensalidade_Necessaria` → **INVIÁVEL** 🔴

---

## 2. Motor de Recomendações

Se o plano for **INVIÁVEL**, o sistema tenta "consertar" sugerindo ações:

### 2.1 Estratégia de Cortes ("CUT")
Analisa gastos em categorias **NÃO ESSENCIAIS** nos últimos 3 meses.
- Sugere cortes de até 50% nessas categorias para liberar fluxo de caixa.
- Ex: "Cortar R$ 200,00 em Restaurantes".

### 2.2 Estratégia de Adiamento ("SAVE - Extend")
Se mesmo cortando gastos não for possível atingir a meta no prazo:
- O sistema calcula o novo prazo realista.
- Sugere: "Adie a meta em X meses".

---

## 3. Endpoints

- **Simular**: `GET /planning/goal/:id/calculate`
    - Não salva nada, apenas retorna o objeto com `isViable`, `margin` e `actionPlan`.
- **Salvar Plano**: `POST /planning/goal/:id/save`
    - Se o usuário aceitar a sugestão, o plano é salvo no banco (`GoalPlan`) vinculado à meta.

---

## 4. Estrutura do Plano
```typescript
interface Plan {
    isViable: boolean;
    monthlyDeposit: number;
    actionPlan: {
        type: 'CUT' | 'SAVE' | 'EARN';
        title: string;        // "Cortar em Lazer"
        description: string;  // "Reduzir para R$ 300,00"
        value?: number;
    }[];
    suggestedCuts: Array<{ category: string, amount: number }>;
}
```
