# Documentação da API - Miu Controle Backend

Esta documentação lista todos os módulos, endpoints e estruturas de retorno disponíveis no backend para integração com o frontend.

**Base URL**: `http://localhost:3000` (ou URL de produção)

## 🔐 Autenticação (`/auth`)
Responsável pelo registro, login e gestão de sessões.

| Método | Endpoint | Descrição | Corpo da Requisição | Retorno |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/auth/register` | Criar nova conta | `{ email, password, fullName, phone? }` | `User` (objeto usuário criado) |
| **POST** | `/auth/login` | Login | `{ email, password }` | `{ accessToken, refreshToken, user }` |
| **GET** | `/auth/me` | Dados do usuário atual | - | `User` (dados completos) |
| **POST** | `/auth/forgot-password` | Solicitar recuperação | `{ email }` | `{ message }` |
| **POST** | `/auth/verify-reset-token`| Verificar token senha | `{ token }` | `{ valid: boolean }` |
| **POST** | `/auth/reset-password` | Redefinir senha | `{ token, newPassword }` | `{ message }` |
| **GET** | `/auth/sessions` | Listar sessões ativas | - | `[ { id, deviceInfo, ipAddress, lastUsedAt, ... } ]` |
| **DELETE**| `/auth/sessions/:id` | Revogar sessão | - | `{ message }` |

## 👤 Usuários (`/users`)
Gestão de perfil e avatar.

| Método | Endpoint | Descrição | Corpo | Retorno |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/users/me` | Perfil detalhado | - | `UserProfile` (inclui configs, etc) |
| **PATCH** | `/users/me` | Atualizar perfil | `{ fullName, phone, ... }` | `User` atualizado |
| **PATCH** | `/users/me/password` | Trocar senha | `{ currentPassword, newPassword }` | `{ message }` |
| **POST** | `/users/me/avatar` | Upload avatar | `FormData: { avatar: File }` | `{ avatarUrl }` |
| **DELETE**| `/users/me/avatar` | Remover avatar | - | `{ message }` |
| **DELETE**| `/users/me` | Excluir conta | - | `{ message }` |
| **PATCH** | `/users/admin/:id/ban`| Banir usuário (Admin)| `{ isActive: boolean }` | `User` |

## 🏦 Contas (`/accounts`)
Gestão de contas bancárias e carteiras.

| Método | Endpoint | Descrição | Corpo | Retorno |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/accounts` | Criar conta | `{ name, type, bankCode?, initialBalance, color?, icon? }` | `Account` |
| **GET** | `/accounts` | Listar contas | `?activeOnly=true` | `[Account]` |
| **GET** | `/accounts/balance` | Resumo de saldos | - | `{ totalBalance, accounts: [...] }` |
| **GET** | `/accounts/:id` | Detalhes da conta | - | `Account` |
| **PATCH** | `/accounts/:id` | Atualizar conta | `{ name, color, ... }` | `Account` |
| **DELETE**| `/accounts/:id` | Arquivar conta | - | `{ message }` |

## 💸 Transações (`/transactions`)
Lançamentos de receitas e despesas.

| Método | Endpoint | Descrição | Query Params | Retorno |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/transactions` | Criar transação | N/A | `Transaction` |
| **GET** | `/transactions` | Listar transações | `?page=1&limit=20&type=EXPENSE&startDate=...` | `{ data: [Transaction], meta: { total, pages... } }` |
| **GET** | `/transactions/stats/monthly` | Estatísticas do mês | `?month=2025-01-01` | `{ income, expense, balance, categoryBreakdown: [...] }` |
| **GET** | `/transactions/:id` | Detalhes | - | `Transaction` |
| **PATCH** | `/transactions/:id` | Editar | - | `Transaction` |
| **DELETE**| `/transactions/:id` | Excluir | - | `{ message }` |
| **POST** | `/transactions/:id/correct-category` | Feedback IA | `{ correctedCategoryId }` | `{ message }` |

## 🔁 Transações Recorrentes (`/recurring-transactions`)
Assinaturas e contas fixas.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **POST** | `/recurring-transactions` | Criar recorrência | `RecurringTransaction` |
| **GET** | `/recurring-transactions` | Listar todas | `[RecurringTransaction]` |
| **POST** | `/recurring-transactions/:id/process-now` | Gerar transação agora | `Transaction` (gerada) |
| **POST** | `/recurring-transactions/:id/toggle-active` | Ativar/Pausar | `{ isActive }` |

## 🏷️ Categorias (`/categories`)
Categorias de receitas e despesas.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **POST** | `/categories` | Criar categoria | `Category` |
| **GET** | `/categories` | Listar todas | `[Category]` (Hierárquicas se aplicável) |
| **GET** | `/categories/:id/stats` | Gastos na categoria | `{ totalAmount, transactionCount, history: [...] }` |
| **PATCH** | `/categories/:id` | Editar | `Category` |
| **DELETE**| `/categories/:id` | Excluir | `{ message }` |

## 💰 Orçamentos (`/budgets`)
Metas de gastos por categoria.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **POST** | `/budgets` | Definir orçamento | `Budget` |
| **GET** | `/budgets` | Listar orçamentos | `[Budget]` (com progresso atual) |
| **GET** | `/budgets/summary` | Resumo mensal | `{ totalBudgeted, totalSpent, health: 'OK'|'WARNING' }` |

## 🎯 Objetivos / Potes (`/goals`)
Metas financeiras de economia.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **POST** | `/goals` | Criar objetivo | `Goal` |
| **GET** | `/goals` | Listar objetivos | `[Goal]` |
| **GET** | `/goals/hierarchy` | Árvore de objetivos | `[GoalNode]` (Parent -> Children) |
| **POST** | `/goals/:id/contribute`| Adicionar saldo | `GoalContribution` |
| **POST** | `/goals/:id/withdraw` | Retirar saldo | `GoalContribution` (negativa) |
| **POST** | `/goals/:id/image` | Upload capa | `{ imageUrl }` |
| **POST** | `/goals/:id/purchase-links` | Adicionar link | `Goal` (com links atualizados) |

## 🧠 Planejamento Inteligente (`/planning`)
Planejamento assistido por IA para atingir objetivos.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/planning/goal/:goalId/calculate` | Simular plano | `{ monthlyDeposit, monthsToGoal, isViable, suggestions: [...] }` |
| **POST** | `/planning/goal/:goalId/save` | Salvar plano | `Goal` (com `plan` atualizado) |

## 🚨 Alertas Proativos (`/proactive-alerts`)
Alertas de saldo negativo e contas a vencer.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/proactive-alerts` | Listar alertas ativos | `[Alert]` |
| **POST** | `/proactive-alerts/:id/dismiss` | Marcar como lido | `{ message }` |

## 🎮 Gamificação (`/gamification`)
Sistema de engajamento (XP, Missões).

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/gamification/profile` | Perfil Gamificado | `{ level, currentXp, nextLevelXp, streak }` |
| **GET** | `/gamification/missions` | Missões Ativas | `[UserMission]` |

## 🚀 Onboarding (`/onboarding`)
Fluxo inicial do usuário.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/onboarding/status` | Status atual | `{ hasCompletedOnboarding, currentStep }` |
| **POST** | `/onboarding/step` | Atualizar etapa | `{ status: 'OK' }` |
| **POST** | `/onboarding/complete` | Finalizar | `{ message, user }` |

## ❤️ Health Score (`/health-score`)
Pontuação de saúde financeira e insights.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/health-score` | Obter pontuação | `{ totalScore, scores: { budget, savings... }, aiInsights }` |
| **GET** | `/health-score/achievements` | Conquistas | `[UserAchievement]` |

## 🤖 Recomendações IA (`/recommendations`)
Dicas personalizadas.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/recommendations` | Listar dicas | `[Recommendation]` |
| **POST** | `/recommendations/:id/apply` | Aplicar (se automation)| `{ success: boolean }` |
| **POST** | `/recommendations/:id/dismiss` | Ignorar dica | `{ message }` |

## 📢 Release Notes & Feedback (`/release-notes`, `/feedback`)
Comunicação com o usuário.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/release-notes/pending` | Notas não lidas | `[ReleaseNote]` |
| **POST** | `/release-notes/:id/read` | Marcar lida | `{ success: boolean }` |
| **POST** | `/feedback` | Enviar bug/sugestão | `{ message }` |
| **GET** | `/feedback/me` | Meus feedbacks | `[Feedback]` |


## 🛠️ System Admin (`/admin`)
Endpoints técnicos para administradores do sistema.

| Método | Endpoint | Descrição | Retorno |
| :--- | :--- | :--- | :--- |
| **GET** | `/admin/cache-stats` | Estatísticas Redis | `{ cacheHits, cacheMisses }` |
| **POST** | `/admin/cache-reset` | Limpar métricas Cache | `{ message }` |
| **GET** | `/admin/slow-queries` | Queries lentas DB | `[QueryLog]` |
| **GET** | `/admin/dashboard/stats` | KPIs do Sistema | `{ users, subscriptions, system }` |

---
*Gerado automaticamente pelo Agente AI Antigravity.*
