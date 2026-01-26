# 🤖 AI Usage & Stats - Documentação Técnica

Este documento detalha o sistema de monitoramento de uso de IA do Miu Controle. Ele explica como o consumo de tokens é rastreado, como os custos são calculados e como as estatísticas são apresentadas ao usuário.

**Controller**: `AiUsageController` (`/ai`)
**Service**: `AiUsageService`

---

## 1. Visão Geral do Sistema de Rastreamento

O sistema intercepta todas as chamadas feitas aos provedores de IA (OpenAI e Google Gemini) e registra métricas detalhadas no banco de dados.

### 1.1 Entidade `AiUsageMetric`
Cada requisição bem-sucedida ou falha gera um registro nesta tabela:

| Campo | Descrição |
|-------|-----------|
| `userId` | ID do usuário que iniciou a ação. |
| `feature` | A funcionalidade utilizada (ex: `CATEGORIZATION`, `PREDICTIVE_ANALYTICS`). |
| `model` | O modelo de IA utilizado (ex: `gpt-4o-mini`, `gemini-1.5-flash`). |
| `promptTokens` | Tokens de entrada (enviados). |
| `completionTokens` | Tokens de saída (gerados). |
| `totalTokens` | Soma dos tokens. |
| `estimatedCost` | Custo estimado em USD baseado na tabela de preços interna. |
| `success` | Booleano indicando se a chamada funcionou. |

---

## 2. Endpoints de Estatísticas

### 2.1 Estatísticas de Uso Mensal

Retorna o consumo acumulado do mês atual, incluindo custos e quebra por funcionalidade.

- **Endpoint**: `GET /ai/usage-stats`
- **Autenticação**: Bearer Token
- **Exemplo de Resposta**:

```json
{
  "month": "dezembro de 2025",
  "totalTokens": 15420,
  "totalCost": 0.002345, // Custo em USD
  "totalCostBRL": 0.01,  // Custo aproximado em R$ (USD * 5.5)
  "byFeature": {
    "CATEGORIZATION": {
      "tokens": 12000,
      "cost": 0.0018,
      "requests": 45
    },
    "PREDICTIVE_ANALYTICS": {
      "tokens": 3420,
      "cost": 0.000545,
      "requests": 2
    }
  }
}
```

### 2.2 Estatísticas de Desempenho (Categorização)

Mede a eficiência da IA na categorização de transações, permitindo avaliar se a IA está "aprendendo" ou errando muito.

- **Endpoint**: `GET /ai/categorization-stats`
- **Lógica**:
    - **Acurácia**: Baseada nos feedbacks explícitos do usuário (`AiCategorizationFeedback`). Se o usuário não corrige, assume-se correto? *Nota: Atualmente a acurácia é calculada apenas sobre transações que tiveram feedback (correção ou confirmação).*
    - **Taxa de Correção**: Porcentagem de vezes que o usuário alterou uma categoria sugerida pela IA.
- **Exemplo de Resposta**:

```json
{
  "totalPredictions": 150,
  "averageConfidence": 0.89, // 0.0 a 1.0
  "accuracy": 95.5,          // % de acertos
  "correctionRate": 4.5,     // % de correções manuais
  "message": "150 transações categorizadas com 96% de precisão"
}
```

---

## 3. Cálculo de Custos

O serviço `AiUsageService` mantém uma tabela de preços interna (hardcoded) para estimativa. O custo real pode variar dependendo do provedor e data.

**Tabela de Preços (Referência USD por 1M tokens):**

| Modelo | Input (USD) | Output (USD) |
|--------|-------------|--------------|
| `gpt-4o-mini` | $0.15 | $0.60 |
| `gpt-4o` | $5.00 | $15.00 |
| `gemini-1.5-flash` | $0.075 | $0.30 |
| `gemini-1.5-pro` | $1.25 | $5.00 |

> **Nota**: O cálculo é `(tokens / 1M) * preço`.

---

## 4. Limites Mensais

Para evitar custos excessivos, especialmente no plano FREE (onde usamos chaves do usuário ou cotas limitadas), existe um checador de limites.

- **Método**: `checkMonthlyLimit(userId)`
- **Limite Padrão**: 1.000.000 de tokens/mês (Configurável no banco).
- **Comportamento**: Se o limite for excedido, as features de IA param de funcionar até o próximo mês, retornando erro ou fallback para lógica não-IA.
