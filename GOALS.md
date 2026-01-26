# 🎯 Objetivos e Potes (Goals) - Documentação Técnica

O módulo de Objetivos (conhecido no app como "Potes" ou "Metas") permite que o usuário poupe dinheiro para finalidades específicas. O sistema suporta hierarquia, imagens personalizadas e links de compra.

**Controller**: `GoalsController` (`/goals`)
**Service**: `GoalsService`
**Entidade**: `Goal` e `GoalContribution`

---

## 1. Estrutura e Hierarquia

O sistema suporta **Hierarquia de Metas** com até 4 níveis de profundidade (Pai -> Filho -> Neto -> Bisneto).

- **Campo `parentId`**: Define o objetivo pai.
- **Campo `hierarchyLevel`**: 0 (Raiz) a 3 (Nível máximo). Protegido automaticamente na criação.
- **Visualização**: O endpoint `/goals/hierarchy` retorna a árvore completa (recursiva).

### Estratégias de Distribuição (`distributionStrategy`)
Quando se contribui para uma meta "Pai" que possui filhos, o valor pode ser distribuído automaticamente:

1.  **PROPORTIONAL**: Divide o valor baseado no peso de cada filho (quem tem meta maior, recebe mais).
2.  **SEQUENTIAL**: Prioridade baseada no campo `priority` (enche o mais prioritário primeiro).

---

## 2. Endpoints Principais

### 2.1 CRUD Básico
- **GET** `/goals`: Lista plana (com filtros `status=ACTIVE|COMPLETED`).
- **POST** `/goals`: Cria nova meta.
    ```json
    {
      "name": "Viagem Europa",
      "targetAmount": 20000.00,
      "targetDate": "2026-07-01",
      "parentId": null, // Opcional
      "distributionStrategy": "PROPORTIONAL"
    }
    ```
- **DELETE** `/goals/:id`: Remove meta (apenas se não tiver contribuições).

### 2.2 Movimentações Financeiras
Ao contrário de transações bancárias, as métricas de metas são geridas via endpoints específicos de aporte/retirada.

- **Contribuir**: `POST /goals/:id/contribute`
    - Body: `{ "amount": 500.00, "date": "..." }`
    - Opcional: `transactionId` se o dinheiro veio de uma transação real.
    - Se for meta Pai, dispara a lógica de distribuição para os filhos.
- **Retirar**: `POST /goals/:id/withdraw`
    - Retira do saldo acumulado (cria contribuição negativa).
    - Se a meta estava `COMPLETED`, ela volta para `ACTIVE`.

---

## 3. Imagens e Links

### 3.1 Personalização Visual
Cada meta pode ter uma imagem de capa.
- `POST /goals/:id/image`: Upload (Multipart Form-Data). Salva no S3/MinIO e gera URL pública.

### 3.2 Links de Compra (`purchaseLinks`)
Permite salvar links de produtos relacionados àquele objetivo (ex: Link do Airbnb, Passagem Aérea).
- Armazenado como JSON Array no banco.
- Endpoints:
    - `POST /goals/:id/purchase-links`
    - `PATCH/DELETE` com ID do link.

---

## 4. Integrações Automáticas

### Notificações
- **Milestones**: A cada 25%, 50%, 75% atingido, o usuário é notificado.
- **Conclusão**: Ao chegar em 100%, status vira `COMPLETED` e envia e-mail de parabéns.

### Gamificação
- Evento `goal.contributed` é emitido a cada aporte, gerando XP e badges no sistema de Gamificação.

---

## 5. Resumo Global (`/goals/summary`)

Endpoint rápido para exibir card no Dashboard.
- Retorna:
    - Total Poupa (Saldo de todas as metas).
    - Total Objetivo (Soma dos alvos).
    - Progresso Geral (%).
    - Contagem de metas ativas/concluídas.
