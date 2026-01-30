# 📈 Taxas de Câmbio (Exchange Rates) - Documentação Técnica

O módulo de Taxas de Câmbio permite a conversão de valores entre diferentes moedas e a consolidação do patrimônio total do usuário em uma moeda preferida.

**Controller**: `ExchangeRatesController` (`/exchange-rates`)
**Service**: `ExchangeRatesService`
**Entidade**: `ExchangeRate`

---

## 1. Funcionamento

As taxas de câmbio são armazenadas com referência a um par de moedas (`from` -> `to`) e uma data específica. O sistema suporta histórico de taxas, permitindo recálculos retroativos precisos.

### Fontes de Dados
1.  **API Externa (Job Diário)**: O sistema consulta `api.exchangerate.host` (ou similar) diariamente às 09:00 AM para atualizar as taxas com base no Dólar (USD).
2.  **Manual**: Administradores podem forçar uma taxa específica para um dia.

---

## 2. Endpoints Principais

### 2.1 Conversão (`/exchange-rates/convert`)
Converte um valor monetário instantaneamente usando a taxa mais recente disponível.

- **POST Body**:
```json
{
  "fromCurrency": "USD",
  "toCurrency": "BRL",
  "amount": 100.00
}
```
- **Retorno**:
```json
{
  "rate": 5.15,
  "convertedAmount": 515.00,
  "date": "2024-01-25T..."
}
```

### 2.2 Consolidação de Saldo (`/exchange-rates/consolidate`)
Endpoint essencial para o Dashboard. Ele pega todas as contas do usuário (que podem estar em EUR, USD, BRL) e calcula quanto isso vale na **Moeda Preferida** do usuário.

- **GET** `/exchange-rates/consolidate`
- **Output**:
    - `totalBalance`: Soma total convertida.
    - `preferredCurrency`: Moeda de destino (ex: BRL).
    - `accounts`: Lista com saldo original vs saldo convertido.

### 2.3 Gestão de Taxas
- **Listar**: `GET /exchange-rates`
- **Criar Manualmente**: `POST /exchange-rates` (Admin)
- **Forçar Atualização API**: `POST /exchange-rates/update-rates` (Admin)

---

## 3. Lógica de Conversão (`getLatestRate`)

Ao solicitar uma taxa de `A` para `B`:
1.  Procura taxa direta (`A` -> `B`) mais recente.
2.  Se não achar, procura taxa inversa (`B` -> `A`) e inverte o valor (`1 / rate`).
3.  Se `A` for igual a `B`, retorna 1.0.
4.  Se não achar nada, retorna Erro 404 (Front deve tratar ou exibir valor original com aviso).

---

## 4. Automação

**Cron Job**: `@Cron('0 9 * * *')`
- Busca as taxas baseadas em USD.
- Salva no banco com `source: 'API'`.
- Isso garante que o sistema sempre tenha taxas frescas para o dia atual.
