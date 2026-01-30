# 💱 Moedas (Currencies) - Documentação Técnica

O módulo de Moedas gerencia as divisas fiduciárias suportadas pelo sistema Miu Controle. Ele serve como base para contas multimoeda e conversão de valores.

**Controller**: `CurrenciesController` (`/currencies`)
**Service**: `CurrenciesService`
**Entidade**: `Currency`

---

## 1. Modelo de Dados

Cada moeda cadastrada no sistema possui:
- **Code**: Código ISO 4217 (ex: `USD`, `BRL`, `EUR`). Chave única.
- **Name**: Nome legível (ex: "Dólar Americano").
- **Symbol**: Símbolo de exibição (ex: `$`, `R$`).
- **IsActive**: Flag para habilitar/desabilitar uso.

---

## 2. Endpoints Principais

### 2.1 Público / Usuário
- **Listar Moedas**: `GET /currencies`
    - Query `activeOnly=true` (padrão) retorna apenas moedas operacionais.
- **Buscar por Código**: `GET /currencies/code/:code` (ex: `/currencies/code/BRL`)

### 2.2 Administração (Admin Only)
- **Criar**: `POST /currencies`
    ```json
    {
      "code": "JPY",
      "name": "Iene Japonês",
      "symbol": "¥"
    }
    ```
- **Atualizar**: `PATCH /currencies/:id`
- **Toggle Active**: `POST /currencies/:id/toggle-active` (Desativar moeda sem deletar histórico).
- **Deletar**: `DELETE /currencies/:id` (Bloqueado se houver contas vinculadas).

---

## 3. Uso no Sistema

As moedas são usadas primariamente na entidade `Account` (Conta Bancária).
- Ao criar uma conta, o usuário seleciona uma `currencyId`.
- Isso define em qual moeda o `currentBalance` está expresso.
- O sistema não permite misturar transações de moedas diferentes na mesma conta (uma conta = uma moeda).

---

## 4. Integração Frontend

O frontend deve usar o `symbol` da moeda ao formatar valores monetários.
- Exemplo: Se `account.currency.code == 'USD'`, formatar como `$ 1,234.56`.
- Se `account.currency.code == 'BRL'`, formatar como `R$ 1.234,56`.
