# 📚 Documentação Completa de Endpoints - Miu Controle API

**Base URL**: `https://api.miucontrole.com.br`  
**Documentação Swagger**: `https://api.miucontrole.com.br/api/docs`

---

## 🔐 1. Autenticação

### 1.1. Criar Conta (Registro)
```http
POST /auth/register
Content-Type: application/json
```

**Payload:**
```json
{
  "fullName": "João Silva",
  "email": "joao@email.com",
  "password": "SenhaForte@123"
}
```

**Requisitos da Senha:**
- Mínimo 8 caracteres
- Deve conter: letras maiúsculas, minúsculas, números e símbolos (@$!%*?&)

**Resposta (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "joao@email.com",
    "fullName": "João Silva",
    "emailVerified": false
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2. Login
```http
POST /auth/login
Content-Type: application/json
```

**Payload:**
```json
{
  "email": "joao@email.com",
  "password": "SenhaForte@123"
}
```

**Resposta (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "joao@email.com",
    "fullName": "João Silva"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.3. Obter Perfil do Usuário Logado
```http
GET /auth/me
Authorization: Bearer {accessToken}
```

### 1.4. Recuperação de Senha

**Solicitar recuperação:**
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "joao@email.com"
}
```

**Verificar token:**
```http
POST /auth/verify-reset-token
Content-Type: application/json

{
  "token": "token-recebido-por-email"
}
```

**Redefinir senha:**
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "token-recebido-por-email",
  "newPassword": "NovaSenha@123"
}
```

### 1.5. Verificação de Email

**Verificar email:**
```http
POST /auth/verify-email
Content-Type: application/json

{
  "token": "token-recebido-por-email"
}
```

**Reenviar verificação:**
```http
POST /auth/resend-verification
Content-Type: application/json

{
  "email": "joao@email.com"
}
```

### 1.6. Gerenciamento de Sessões

**Listar sessões ativas:**
```http
GET /auth/sessions
Authorization: Bearer {accessToken}
```

**Revogar sessão específica:**
```http
DELETE /auth/sessions/{sessionId}
Authorization: Bearer {accessToken}
```

**Revogar todas as sessões (exceto atual):**
```http
DELETE /auth/sessions/revoke-all
Authorization: Bearer {accessToken}
```

---

## 👤 2. Usuários

> **Nota:** Todos os endpoints requerem autenticação (Bearer Token)

### 2.1. Obter Perfil
```http
GET /users/me
Authorization: Bearer {accessToken}
```

### 2.2. Atualizar Perfil
```http
PATCH /users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fullName": "João Silva Santos",
  "preferredCurrency": "BRL"
}
```

### 2.3. Trocar Senha
```http
PATCH /users/me/password
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "currentPassword": "SenhaForte@123",
  "newPassword": "NovaSenhaForte@456"
}
```

### 2.4. Upload de Avatar
```http
POST /users/me/avatar
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

avatar: [arquivo] (max 5MB, formatos: jpg, jpeg, png, webp)
```

### 2.5. Remover Avatar
```http
DELETE /users/me/avatar
Authorization: Bearer {accessToken}
```

### 2.6. Deletar Conta
```http
DELETE /users/me
Authorization: Bearer {accessToken}
```

---

## 💰 3. Transações

### 3.1. Criar Transação
```http
POST /transactions
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "accountId": "uuid-da-conta",
  "categoryId": "uuid-da-categoria",
  "type": "EXPENSE",
  "amount": 150.50,
  "description": "Almoço no restaurante",
  "merchant": "Restaurante Bom Sabor",
  "date": "2025-11-28",
  "tags": ["alimentação", "restaurante"],
  "notes": "Reunião com cliente"
}
```

**Tipos disponíveis:** `INCOME`, `EXPENSE`, `TRANSFER`

### 3.2. Listar Transações
```http
GET /transactions?type=EXPENSE&startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 3.3. Buscar por ID
```http
GET /transactions/{id}
Authorization: Bearer {accessToken}
```

### 3.4. Atualizar Transação
```http
PATCH /transactions/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 200.00,
  "description": "Almoço atualizado"
}
```

### 3.5. Deletar Transação
```http
DELETE /transactions/{id}
Authorization: Bearer {accessToken}
```

### 3.6. Estatísticas Mensais
```http
GET /transactions/stats/monthly?month=2025-11-01
Authorization: Bearer {accessToken}
```

### 3.7. Estatísticas por Categoria
```http
GET /transactions/stats/category/{categoryId}?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

---

## 🏦 4. Contas

### 4.1. Criar Conta
```http
POST /accounts
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Nubank",
  "type": "CHECKING",
  "bankCode": "260",
  "initialBalance": 1000.00,
  "color": "#6366F1",
  "icon": "credit-card"
}
```

**Tipos de conta:** `CHECKING`, `SAVINGS`, `CREDIT_CARD`, `INVESTMENT`

### 4.2. Listar Contas
```http
GET /accounts?activeOnly=true
Authorization: Bearer {accessToken}
```

### 4.3. Obter Saldo Total
```http
GET /accounts/balance
Authorization: Bearer {accessToken}
```

### 4.4. Buscar por ID
```http
GET /accounts/{id}
Authorization: Bearer {accessToken}
```

### 4.5. Atualizar Conta
```http
PATCH /accounts/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Nubank Atualizado",
  "color": "#8B5CF6"
}
```

### 4.6. Desativar Conta
```http
DELETE /accounts/{id}
Authorization: Bearer {accessToken}
```

---

## 📁 5. Categorias

### 5.1. Criar Categoria
```http
POST /categories
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Freelance",
  "type": "INCOME",
  "icon": "briefcase",
  "color": "#10B981"
}
```

### 5.2. Listar Categorias
```http
GET /categories?type=EXPENSE
Authorization: Bearer {accessToken}
```

### 5.3. Buscar por ID
```http
GET /categories/{id}
Authorization: Bearer {accessToken}
```

### 5.4. Estatísticas da Categoria
```http
GET /categories/{id}/stats?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 5.5. Atualizar Categoria
```http
PATCH /categories/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Freelance Web"
}
```

### 5.6. Deletar Categoria
```http
DELETE /categories/{id}
Authorization: Bearer {accessToken}
```

---

## 💵 6. Orçamentos

### 6.1. Criar Orçamento
```http
POST /budgets
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "categoryId": "uuid-da-categoria",
  "amount": 500.00,
  "period": "MONTHLY",
  "startDate": "2025-11-01"
}
```

**Períodos:** `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`

### 6.2. Listar Orçamentos
```http
GET /budgets?period=MONTHLY
Authorization: Bearer {accessToken}
```

### 6.3. Resumo Mensal
```http
GET /budgets/summary?month=2025-11-01
Authorization: Bearer {accessToken}
```

### 6.4. Buscar por ID
```http
GET /budgets/{id}
Authorization: Bearer {accessToken}
```

### 6.5. Atualizar Orçamento
```http
PATCH /budgets/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 600.00
}
```

### 6.6. Deletar Orçamento
```http
DELETE /budgets/{id}
Authorization: Bearer {accessToken}
```

---

## 🎯 7. Objetivos (Metas/Potes)

### 7.1. Criar Objetivo
```http
POST /goals
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Viagem para Europa",
  "targetAmount": 15000.00,
  "currentAmount": 0,
  "targetDate": "2026-06-01",
  "color": "#F59E0B",
  "icon": "airplane"
}
```

### 7.2. Listar Objetivos
```http
GET /goals?status=ACTIVE
Authorization: Bearer {accessToken}
```

**Status:** `ACTIVE`, `COMPLETED`, `CANCELLED`

### 7.3. Resumo Geral
```http
GET /goals/summary
Authorization: Bearer {accessToken}
```

### 7.4. Buscar por ID
```http
GET /goals/{id}
Authorization: Bearer {accessToken}
```

### 7.5. Contribuir para Objetivo
```http
POST /goals/{id}/contribute
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 500.00,
  "accountId": "uuid-da-conta"
}
```

### 7.6. Retirar do Objetivo
```http
POST /goals/{id}/withdraw
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 200.00
}
```

### 7.7. Atualizar Objetivo
```http
PATCH /goals/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "targetAmount": 20000.00
}
```

### 7.8. Deletar Objetivo
```http
DELETE /goals/{id}
Authorization: Bearer {accessToken}
```

### 7.9. Upload de Imagem
```http
POST /goals/{id}/image
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

image: [arquivo] (max 5MB)
```

### 7.10. Remover Imagem
```http
DELETE /goals/{id}/image
Authorization: Bearer {accessToken}
```

### 7.11. Adicionar Link de Compra
```http
POST /goals/{id}/purchase-links
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "url": "https://amazon.com/produto",
  "title": "Passagem Aérea",
  "price": 2500.00
}
```

### 7.12. Atualizar Link
```http
PATCH /goals/{id}/purchase-links/{linkId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "price": 2300.00
}
```

### 7.13. Remover Link
```http
DELETE /goals/{id}/purchase-links/{linkId}
Authorization: Bearer {accessToken}
```

### 7.14. Resumo de Links
```http
GET /goals/{id}/purchase-links/summary
Authorization: Bearer {accessToken}
```

---

## 📊 8. Relatórios

### 8.1. Dashboard Completo
```http
GET /reports/dashboard?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 8.2. Análise por Categorias
```http
GET /reports/category-analysis?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 8.3. Tendência Mensal
```http
GET /reports/monthly-trend?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer {accessToken}
```

### 8.4. Análise por Conta
```http
GET /reports/account-analysis?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 8.5. Top Transações
```http
GET /reports/top-transactions?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 8.6. Insights Automáticos
```http
GET /reports/insights?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 8.7. Relatório Completo
```http
GET /reports/full-report?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

---

## 🔔 9. Notificações

### 9.1. Listar Notificações
```http
GET /notifications?unreadOnly=true
Authorization: Bearer {accessToken}
```

### 9.2. Contar Não Lidas
```http
GET /notifications/unread-count
Authorization: Bearer {accessToken}
```

### 9.3. Marcar como Lidas
```http
POST /notifications/mark-as-read
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "ids": ["uuid1", "uuid2"]
}
```

### 9.4. Marcar Todas como Lidas
```http
POST /notifications/mark-all-as-read
Authorization: Bearer {accessToken}
```

### 9.5. Limpar Lidas
```http
DELETE /notifications/clear-read
Authorization: Bearer {accessToken}
```

### 9.6. Deletar Notificação
```http
DELETE /notifications/{id}
Authorization: Bearer {accessToken}
```

---

## 💱 10. Moedas

### 10.1. Listar Moedas
```http
GET /currencies?activeOnly=true
```

### 10.2. Buscar por ID
```http
GET /currencies/{id}
```

### 10.3. Buscar por Código
```http
GET /currencies/code/BRL
```

### 10.4. Criar Moeda (Admin)
```http
POST /currencies
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "code": "USD",
  "name": "Dólar Americano",
  "symbol": "$"
}
```

### 10.5. Atualizar Moeda (Admin)
```http
PATCH /currencies/{id}
Authorization: Bearer {accessToken}
```

### 10.6. Ativar/Desativar (Admin)
```http
POST /currencies/{id}/toggle-active
Authorization: Bearer {accessToken}
```

---

## 💹 11. Taxas de Câmbio

### 11.1. Listar Taxas
```http
GET /exchange-rates?fromCurrency=USD&toCurrency=BRL
```

### 11.2. Taxa Mais Recente
```http
GET /exchange-rates/latest?from=USD&to=BRL
```

### 11.3. Converter Valor
```http
POST /exchange-rates/convert
Content-Type: application/json

{
  "amount": 100,
  "fromCurrency": "USD",
  "toCurrency": "BRL"
}
```

### 11.4. Consolidar Saldos
```http
GET /exchange-rates/consolidate
Authorization: Bearer {accessToken}
```

### 11.5. Atualizar Taxas (Admin)
```http
POST /exchange-rates/update-rates
Authorization: Bearer {accessToken}
```

---

## 📤 12. Exportação

### 12.1. Exportar CSV
```http
GET /export/csv?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 12.2. Exportar Excel
```http
GET /export/excel?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

### 12.3. Exportar PDF
```http
GET /export/pdf?startDate=2025-11-01&endDate=2025-11-30
Authorization: Bearer {accessToken}
```

---

## 🔁 13. Transações Recorrentes

### 13.1. Criar Recorrência
```http
POST /recurring-transactions
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "accountId": "uuid",
  "categoryId": "uuid",
  "type": "EXPENSE",
  "amount": 99.90,
  "description": "Assinatura Netflix",
  "frequency": "MONTHLY",
  "startDate": "2025-11-01"
}
```

### 13.2. Listar Recorrências
```http
GET /recurring-transactions?activeOnly=true
Authorization: Bearer {accessToken}
```

### 13.3. Buscar por ID
```http
GET /recurring-transactions/{id}
Authorization: Bearer {accessToken}
```

### 13.4. Atualizar Recorrência
```http
PATCH /recurring-transactions/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 109.90
}
```

### 13.5. Deletar Recorrência
```http
DELETE /recurring-transactions/{id}
Authorization: Bearer {accessToken}
```

### 13.6. Ativar/Desativar
```http
POST /recurring-transactions/{id}/toggle-active
Authorization: Bearer {accessToken}
```

### 13.7. Processar Manualmente
```http
POST /recurring-transactions/{id}/process-now
Authorization: Bearer {accessToken}
```

---

## 📌 Notas Importantes

### Autenticação
- A maioria dos endpoints requer Bearer Token no header `Authorization`
- Tokens são obtidos nos endpoints de login/registro
- Refresh tokens são usados automaticamente para renovar access tokens

### Formatos de Data
- Datas devem estar no formato ISO 8601: `YYYY-MM-DD` ou `YYYY-MM-DDTHH:mm:ss.sssZ`

### Paginação
- Alguns endpoints suportam paginação via query params `page` e `limit`

### Códigos de Status HTTP
- `200` - OK
- `201` - Criado com sucesso
- `400` - Erro de validação
- `401` - Não autenticado
- `403` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (ex: email já cadastrado)
- `500` - Erro interno do servidor

### Variáveis de Ambiente
Configure no arquivo `.env`:
- `DATABASE_URL` - String de conexão PostgreSQL
- `JWT_SECRET` - Chave secreta para JWT
- `PORT` - Porta do servidor (padrão: 3001)
- `FRONTEND_URL` - URL do frontend para CORS
