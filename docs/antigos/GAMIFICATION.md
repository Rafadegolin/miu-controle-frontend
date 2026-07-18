# 🎮 Gamification - Documentação Técnica

O módulo de Gamificação visa aumentar o engajamento do usuário através de recompensas (XP), níveis, ofensiva (streak) e missões diárias/semanais.

**Controller**: `GamificationController` (`/gamification`)
**Service**: `GamificationService` e `MissionsService`
**Entidades**: `User` (campos de XP/Level), `Mission`, `UserMission`, `UserAchievement`.

---

## 1. Conceitos Core

### 1.1 Perfil do Usuário
Todo usuário possui nativamente:
- **Level**: Nível atual (começa no 1).
- **XP Atual**: Progresso para o próximo nível.
- **Streak (Ofensiva)**:
    - `streakCurrent`: Dias consecutivos de uso.
    - `streakLongest`: Recorde de dias consecutivos.

### 1.2 Regras de XP
- **Fórmula de Nível**: `XP_Necessário = Nível_Atual * 1000`.
    - Nível 1 -> 1000 XP para Nível 2.
    - Nível 2 -> 2000 XP para Nível 3.
- **Level Up**: Quando o XP estoura o limite, o nível sobe e o XP restante sobra para o próximo.

### 1.3 Lógica de Streak
Checada a cada ação relevante (ex: criar transação ou apenas login/abrir app).
- Se a última atividade foi **hoje**: nada muda.
- Se foi **ontem**: `streakCurrent + 1`.
- Se foi **antes de ontem**: `streakCurrent` reseta para 1.

---

## 2. Missões (`Missions`)

Missões são tarefas que dão XP extra. Ex: "Registre 3 gastos hoje".

### Ciclo de Vida
1.  **Templates**: Admin cria modelos de missão (`Mission`).
    - `frequency`: `DAILY`, `WEEKLY`, `ONETIME`.
    - `criteria`: JSON definindo a regra (ex: `{ "type": "TRANSACTION_COUNT", "min": 3 }`).
2.  **Atribuição**: O sistema (via Job ou Trigger) copia o Template para `UserMission`.
3.  **Progresso**: Ações do usuário incrementam `UserMission.progress`.
4.  **Conclusão**: Ao atingir `target`, status vira `COMPLETED`, usuario ganha XP e `UserMission.completedAt` é setado.

---

## 3. Endpoints

- **Perfil Completo**: `GET /gamification/profile`
    - Retorna Level, XP, XP para próximo nível (%) e dados de Streak.
- **Missões Ativas**: `GET /gamification/missions`
    - Lista o que o usuário precisa fazer agora.
- **Admin (Missões)**:
    - `POST /gamification/admin/missions` (Criar template).
    - `GET /gamification/admin/missions/templates`.

---

## 4. Integração de Eventos

O serviço escuta eventos do sistema (via `EventEmitter2` ou chamadas diretas) para atualizar progresso:
- `TransactionCreated` -> Incrementa contador de missões de transação.
- `GoalContributed` -> Incrementa missões de poupança.
- `AppOpen` -> Atualiza Streak.
