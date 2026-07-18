# 🚨 Alertas Proativos - Documentação Técnica

Diferente das notificações reativas (que avisam *depois* que algo aconteceu), os Alertas Proativos tentam prever problemas financeiros antes que eles ocorram, analisando padrões futuros.

**Controller**: `ProactiveAlertsController` (`/proactive-alerts`)
**Service**: `ProactiveAlertsService`
**Entidade**: `ProactiveAlert`

---

## 1. Monitoramento Diário

Um Job (`@Cron`) é executado diariamente às **06:00 AM** para todos os usuários verificados. Ele executa uma bateria de verificações:

### 1.1 Previsão de Saldo Negativo (`NEGATIVE_BALANCE`)
- O sistema projeta o saldo para os próximos **7 dias**.
- Cálculo: `Saldo_Atual - Soma(Despesas_Recorrentes_Proximos_7_Dias)`.
- Se o resultado for negativo, gera alerta de prioridade **CRITICAL**.

### 1.2 Contas a Pagar Iminentes (`BILL_DUE`)
- Verifica contas (Recorrências) que vencem nas próximas **48 horas**.
- Gera alerta **WARNING** para lembrar o usuário de conferir o saldo.

---

## 2. Gestão de Alertas

Os alertas são persistidos no banco para que o usuário possa vê-los na "Central de Alertas" ou no Dashboard.

- **Status**:
    - `dismissed`: Se o usuário dispensou o alerta (ex: "Já paguei").
    - `actionable`: Se o alerta possui um botão de ação (ex: "Pagar Agora", "Ver Extrato").

---

## 3. Endpoints

- **Listar Ativos**: `GET /proactive-alerts`
    - Retorna apenas alertas não dispensados. Ideal para widget de dashboard.
- **Dispensar**: `POST /proactive-alerts/:id/dismiss`
    - Remove o alerta da visão do usuário.
- **Executar Manualmente (Dev)**: `POST /proactive-alerts/run-checks`
    - Força a rodada de verificação imediata para testes.

---

## 4. Prevenção de Spam

O serviço verifica se já existe um alerta idêntico criado nas últimas **24 horas** para o mesmo usuário e tipo. Se existir, ele silencia a nova detecção para evitar notificações repetidas sobre o mesmo problema.
