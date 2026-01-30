# 🛟 Colchão Financeiro (Emergency Fund) - Documentação Técnica

O módulo de Colchão Financeiro ajuda o usuário a construir uma reserva de segurança baseada em seus gastos essenciais reais. O sistema calcula automaticamente o valor ideal e monitora a cobertura (quantos meses o usuário "sobrevive" sem renda).

**Controller**: `EmergencyFundController` (`/emergency-fund`)
**Service**: `EmergencyFundService`
**Entidade**: `EmergencyFund` e `EmergencyFundWithdrawal`

---

## 1. Funcionamento

### 1.1 Cálculo de Meta Ideal
O sistema analisa os últimos **3 meses** de transações em categorias marcadas como `isEssential` (Alimentação, Moradia, Saúde, etc.).
- `Gasto_Mensal_Essencial = Média(Gastos_Essenciais_Ultimos_3_Meses)`
- `Meta_Ideal = Gasto_Mensal_Essencial * 6` (Regra dos 6 meses).

### 1.2 Monitoramento Mensal
Um Job (`@Cron`) roda todo dia 1º do mês para recalcular o gasto essencial.
- Se o novo valor divergir mais de 10% da meta atual, o sistema atualiza a meta automaticamente.
- Se a cobertura cair para menos de 3 meses, emite um alerta (`SYSTEM`).

### 1.3 Status de Saúde
- 🟢 **SECURE**: Cobre >= 3 meses.
- 🟡 **WARNING**: Cobre >= 1 mês e < 3 meses.
- 🔴 **CRITICAL**: Cobre < 1 mês.

---

## 2. Endpoints

- **Setup**: `POST /emergency-fund/setup`
    - Inicializa o fundo calculando a meta pela primeira vez.
- **Status**: `GET /emergency-fund/status`
    - Retorna `currentAmount`, `targetAmount`, `monthsCovered` e o status visual.
- **Aportar**: `POST /emergency-fund/contribute`
    - Adiciona saldo. Pode disparar notificações de Milestone (1, 3, 6 meses atingidos).
- **Sacar**: `POST /emergency-fund/withdraw`
    - Body: `{ "amount": 100, "reason": "Carro quebrou" }`
    - Registra o motivo do saque para histórico e notifica o usuário ("Saque de Emergência").

---

## 3. Integração com Objetivos

O Colchão Financeiro pode (opcionalmente) estar vinculado a um Objetivo (`linkedGoalId`).
- Se vinculado, qualquer aporte no Colchão também atualiza o saldo desse Objetivo "espelho", permitindo visualizar o progresso na árvore de metas.
