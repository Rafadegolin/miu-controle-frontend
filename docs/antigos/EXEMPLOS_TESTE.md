# 🧪 Exemplos de Teste - Miu Controle API

Este documento contém exemplos práticos usando **cURL** para testar os principais endpoints da API.

## 📋 Índice Rápido
1. [Registro e Login](#1-registro-e-login)
2. [Criar Conta Bancária](#2-criar-conta-bancária)
3. [Criar Transação](#3-criar-transação)
4. [Criar Objetivo](#4-criar-objetivo)

---

## 1. Registro e Login

### 1.1. Criar Conta (Registro)
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva",
    "email": "joao@email.com",
    "password": "SenhaForte@123"
  }'
```

**Resposta esperada:**
```json
{
  "user": { "id": "...", "email": "joao@email.com", "fullName": "João Silva" },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "..."
}
```

### 1.2. Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "SenhaForte@123"
  }'
```

**💡 Dica:** Salve o `accessToken` em uma variável:
```bash
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 1.3. Obter Perfil
```bash
curl -X GET http://localhost:3001/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 2. Criar Conta Bancária

### 2.1. Criar Conta Corrente
```bash
curl -X POST http://localhost:3001/accounts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nubank",
    "type": "CHECKING",
    "bankCode": "260",
    "initialBalance": 1000.00,
    "color": "#6366F1",
    "icon": "credit-card"
  }'
```

**Salve o ID da conta:**
```bash
export ACCOUNT_ID="uuid-retornado"
```

### 2.2. Listar Contas
```bash
curl -X GET http://localhost:3001/accounts \
  -H "Authorization: Bearer $TOKEN"
```

### 2.3. Obter Saldo Total
```bash
curl -X GET http://localhost:3001/accounts/balance \
  -H "Authorization: Bearer $TOKEN"
```

---

## 3. Criar Transação

### 3.1. Criar Categoria Personalizada
```bash
curl -X POST http://localhost:3001/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Restaurantes",
    "type": "EXPENSE",
    "icon": "utensils",
    "color": "#EF4444"
  }'
```

**Salve o ID da categoria:**
```bash
export CATEGORY_ID="uuid-retornado"
```

### 3.2. Criar Transação de Despesa
```bash
curl -X POST http://localhost:3001/transactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "'$ACCOUNT_ID'",
    "categoryId": "'$CATEGORY_ID'",
    "type": "EXPENSE",
    "amount": 150.50,
    "description": "Almoço no restaurante",
    "merchant": "Restaurante Bom Sabor",
    "date": "2025-12-26",
    "tags": ["alimentação", "restaurante"],
    "notes": "Reunião com cliente"
  }'
```

### 3.3. Criar Transação de Receita
```bash
curl -X POST http://localhost:3001/transactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "'$ACCOUNT_ID'",
    "type": "INCOME",
    "amount": 5000.00,
    "description": "Salário de Dezembro",
    "date": "2025-12-26"
  }'
```

### 3.4. Listar Transações do Mês
```bash
curl -X GET "http://localhost:3001/transactions?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

### 3.5. Estatísticas Mensais
```bash
curl -X GET "http://localhost:3001/transactions/stats/monthly?month=2025-12-01" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 4. Criar Objetivo

### 4.1. Criar Objetivo de Viagem
```bash
curl -X POST http://localhost:3001/goals \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Viagem para Europa",
    "targetAmount": 15000.00,
    "currentAmount": 0,
    "targetDate": "2026-06-01",
    "color": "#F59E0B",
    "icon": "airplane"
  }'
```

**Salve o ID do objetivo:**
```bash
export GOAL_ID="uuid-retornado"
```

### 4.2. Contribuir para o Objetivo
```bash
curl -X POST http://localhost:3001/goals/$GOAL_ID/contribute \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500.00,
    "accountId": "'$ACCOUNT_ID'"
  }'
```

### 4.3. Adicionar Link de Compra
```bash
curl -X POST http://localhost:3001/goals/$GOAL_ID/purchase-links \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://amazon.com/produto",
    "title": "Passagem Aérea",
    "price": 2500.00
  }'
```

### 4.4. Listar Objetivos
```bash
curl -X GET http://localhost:3001/goals \
  -H "Authorization: Bearer $TOKEN"
```

### 4.5. Resumo dos Objetivos
```bash
curl -X GET http://localhost:3001/goals/summary \
  -H "Authorization: Bearer $TOKEN"
```

---

## 5. Orçamentos

### 5.1. Criar Orçamento Mensal
```bash
curl -X POST http://localhost:3001/budgets \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": "'$CATEGORY_ID'",
    "amount": 500.00,
    "period": "MONTHLY",
    "startDate": "2025-12-01"
  }'
```

### 5.2. Resumo de Orçamentos
```bash
curl -X GET "http://localhost:3001/budgets/summary?month=2025-12-01" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 6. Relatórios

### 6.1. Dashboard Completo
```bash
curl -X GET "http://localhost:3001/reports/dashboard?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

### 6.2. Análise por Categorias
```bash
curl -X GET "http://localhost:3001/reports/category-analysis?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

### 6.3. Top Transações
```bash
curl -X GET "http://localhost:3001/reports/top-transactions?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 7. Gerenciamento de Usuário

### 7.1. Atualizar Perfil
```bash
curl -X PATCH http://localhost:3001/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva Santos",
    "preferredCurrency": "BRL"
  }'
```

### 7.2. Trocar Senha
```bash
curl -X PATCH http://localhost:3001/users/me/password \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "SenhaForte@123",
    "newPassword": "NovaSenhaForte@456"
  }'
```

### 7.3. Upload de Avatar (multipart/form-data)
```bash
curl -X POST http://localhost:3001/users/me/avatar \
  -H "Authorization: Bearer $TOKEN" \
  -F "avatar=@/caminho/para/foto.jpg"
```

---

## 8. Notificações

### 8.1. Listar Notificações Não Lidas
```bash
curl -X GET "http://localhost:3001/notifications?unreadOnly=true" \
  -H "Authorization: Bearer $TOKEN"
```

### 8.2. Contar Não Lidas
```bash
curl -X GET http://localhost:3001/notifications/unread-count \
  -H "Authorization: Bearer $TOKEN"
```

### 8.3. Marcar Todas como Lidas
```bash
curl -X POST http://localhost:3001/notifications/mark-all-as-read \
  -H "Authorization: Bearer $TOKEN"
```

---

## 9. Exportação

### 9.1. Exportar CSV
```bash
curl -X GET "http://localhost:3001/export/csv?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o transacoes.csv
```

### 9.2. Exportar Excel
```bash
curl -X GET "http://localhost:3001/export/excel?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o transacoes.xlsx
```

### 9.3. Exportar PDF
```bash
curl -X GET "http://localhost:3001/export/pdf?startDate=2025-12-01&endDate=2025-12-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o transacoes.pdf
```

---

## 10. Transações Recorrentes

### 10.1. Criar Recorrência (Assinatura)
```bash
curl -X POST http://localhost:3001/recurring-transactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "'$ACCOUNT_ID'",
    "categoryId": "'$CATEGORY_ID'",
    "type": "EXPENSE",
    "amount": 99.90,
    "description": "Assinatura Netflix",
    "frequency": "MONTHLY",
    "startDate": "2025-12-01"
  }'
```

### 10.2. Listar Recorrências Ativas
```bash
curl -X GET "http://localhost:3001/recurring-transactions?activeOnly=true" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔧 Script Completo de Teste

Aqui está um script Bash completo para testar o fluxo básico:

```bash
#!/bin/bash

# Configurações
BASE_URL="http://localhost:3001"

echo "=== 1. Criar Conta ==="
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Teste User",
    "email": "teste@email.com",
    "password": "Teste@123"
  }')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.accessToken')
echo "Token obtido: ${TOKEN:0:50}..."

echo -e "\n=== 2. Criar Conta Bancária ==="
ACCOUNT_RESPONSE=$(curl -s -X POST $BASE_URL/accounts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Banco Teste",
    "type": "CHECKING",
    "initialBalance": 1000.00
  }')

ACCOUNT_ID=$(echo $ACCOUNT_RESPONSE | jq -r '.id')
echo "Conta criada: $ACCOUNT_ID"

echo -e "\n=== 3. Criar Categoria ==="
CATEGORY_RESPONSE=$(curl -s -X POST $BASE_URL/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alimentação",
    "type": "EXPENSE",
    "color": "#EF4444"
  }')

CATEGORY_ID=$(echo $CATEGORY_RESPONSE | jq -r '.id')
echo "Categoria criada: $CATEGORY_ID"

echo -e "\n=== 4. Criar Transação ==="
curl -s -X POST $BASE_URL/transactions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "'$ACCOUNT_ID'",
    "categoryId": "'$CATEGORY_ID'",
    "type": "EXPENSE",
    "amount": 50.00,
    "description": "Almoço"
  }' | jq

echo -e "\n=== 5. Ver Saldo ==="
curl -s -X GET $BASE_URL/accounts/balance \
  -H "Authorization: Bearer $TOKEN" | jq

echo -e "\n✅ Testes concluídos!"
```

**Para executar:**
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## 💡 Dicas

### Usar com HTTPie (mais amigável que cURL)
```bash
# Instalar: pip install httpie

# Registro
http POST :3001/auth/register fullName="João Silva" email="joao@email.com" password="SenhaForte@123"

# Login com token
http POST :3001/auth/login email="joao@email.com" password="SenhaForte@123"

# Requisições autenticadas
http GET :3001/accounts "Authorization:Bearer $TOKEN"
```

### Usar Postman
Importe a collection Swagger em: `http://localhost:3001/api/docs-json`

### Variáveis de Ambiente
Crie um arquivo `.env.test` para seus testes:
```bash
export API_URL="http://localhost:3001"
export TEST_EMAIL="teste@email.com"
export TEST_PASSWORD="Teste@123"
```

---

## ℹ️ Informações Adicionais

- **Documentação Swagger**: http://localhost:3001/api/docs
- **Documentação Completa**: Ver arquivo `ENDPOINTS_COMPLETOS.md`
- **Códigos HTTP**: 200 (OK), 201 (Criado), 400 (Erro), 401 (Não autenticado), 404 (Não encontrado)
