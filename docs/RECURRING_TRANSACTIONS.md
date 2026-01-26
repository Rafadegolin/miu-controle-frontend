# 🔄 Transações Recorrentes - Documentação Técnica

O módulo de Transações Recorrentes automatiza o lançamento de receitas e despesas repetitivas (ex: Aluguel, Salário, Assinaturas). O sistema gera as transações oficiais automaticamente com base na frequência e datas configuradas.

**Controller**: `RecurringTransactionsController` (`/recurring-transactions`)
**Service**: `RecurringTransactionsService`
**Entidade**: `RecurringTransaction`

---

## 1. Funcionamento Básico

Uma transação recorrente **não afeta o saldo** diretamente. Ela é apenas um "modelo" (template) que diz ao sistema **quando** e **como** criar a transação real.

### Frequências Suportadas (`RecurrenceFrequency`)
- `DAILY`: A cada X dias.
- `WEEKLY`: A cada X semanas (com dia da semana fixo).
- `MONTHLY`: A cada X meses (com dia do mês fixo).
- `YEARLY`: A cada X anos.

O campo `interval` define o multiplicador (ex: `MONTHLY` com `interval: 3` = Trimestral).

---

## 2. Automação (Job Diário)

O coração do sistema é o Cron Job que roda toda manhã.

- **Horário**: 06:00 AM (`@Cron('0 6 * * *')`).
- **Lógica**:
    1. Busca todas os modelos ativos (`isActive: true`) e com criação automática (`autoCreate: true`).
    2. Filtra aqueles onde `nextOccurrence` <= Data/Hora atual.
    3. Para cada item encontrado:
        - Gera uma nova `Transaction` (com status `COMPLETED`).
        - Atualiza o saldo da conta vinculada.
        - Calcula a **próxima data** (`nextOccurrence`) baseado na regra de frequência.
        - Se houver `endDate` e a próxima data passar do limite, desativa a recorrência.

### Processamento Manual (`/process-now`)
Se o usuário quiser antecipar um lançamento (ex: pagou a conta antes do dia), ele pode chamar o endpoint:
- `POST /recurring-transactions/:id/process-now`
- Isso força a geração imediata da transação e avança a data da próxima ocorrência, evitando duplicidade no dia agendado.

---

## 3. Endpoints Principais

### 3.1 Criação
- **POST** `/recurring-transactions`
    ```json
    {
      "description": "Netflix",
      "amount": 55.90,
      "type": "EXPENSE",
      "frequency": "MONTHLY",
      "dayOfMonth": 15,
      "startDate": "2024-01-15",
      "autoCreate": true
    }
    ```

### 3.2 Listagem
Permite filtrar por ativas/inativas para "faxina" financeira.
- **GET** `/recurring-transactions?isActive=true`

### 3.3 Pausar/Retomar
Útil para assinaturas suspensas temporariamente.
- **POST** `/recurring-transactions/:id/toggle-active`

---

## 4. Regras de Negócio

1.  **Fim de Semana/Feriado**: Atualmente o sistema lança na data exata, não posterga para dia útil (Simplificação de MVP).
2.  **Edição**:
    - Se editar o valor (`amount`) ou descrição, só afetará as **futuras** transações geradas. As já geradas permanecem intocadas (histórico preservado).
    - Se editar a data (`startDate`/`dayOfMonth`), o sistema recalcula a `nextOccurrence` imediatamente.
3.  **Deleção**:
    - Deletar a recorrência **não apaga** as transações que ela já gerou no passado (Key constraint `onDelete: SetNull` no banco).

---

## 5. Relação com UI
No frontend, é comum exibir:
- Uma lista separada em "Configurações > Recorrências".
- No extrato futuro, é possível "projetar" esses lançamentos (ex: *previsão de saldo*), mas o backend só persiste a transação no dia certo.
