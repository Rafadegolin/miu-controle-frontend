# Miu Controle - Guia de Funcionalidades de IA

Este documento detalha o funcionamento das funcionalidades de Inteligência Artificial no backend do Miu Controle e serve como guia para a implementação da interface de configuração e feedback no frontend.

## 1. Visão Geral e Arquitetura

O sistema de IA do Miu Controle foi desenhado para ser **agnóstico de provedor** e **granular**. Isso significa que o usuário pode escolher diferentes modelos de IA para diferentes tarefas (ex: usar um modelo mais rápido e barato para categorização, e um modelo mais inteligente e analítico para insights financeiros).

### Provedores Suportados
Atualmente, o sistema suporta integração nativa com:
- **OpenAI** (GPT-4o, GPT-4o-mini)
- **Google Gemini** (Gemini 1.5 Flash, Gemini 1.5 Pro)

### Segurança e Privacidade
- **Criptografia**: As chaves de API fornecidas pelos usuários do plano FREE são criptografadas antes de serem salvas no banco de dados (`useAiConfig`).
- **Planos PRO/FAMILY**: Usuários destes planos utilizam automaticamente as chaves corporativas configuradas no backend, sem necessidade de fornecerem suas próprias chaves (mas podem sobrescrever se desejarem).

---

## 2. Configuração e Seleção de Modelos (`AiKeyManagerService`)

O coração da flexibilidade está no `AiKeyManagerService`. O frontend deve permitir que o usuário configure o comportamento da IA através de uma tela de configurações dedicada.

### Entidade `UserAiConfig`
As preferências do usuário são salvas nesta entidade.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `isAiEnabled` | Boolean | Liga/Desliga globalmente as features de IA. |
| `categorizationModel` | String | Modelo usado para categorizar transações (ex: `gpt-4o-mini`). |
| `analyticsModel` | String | Modelo usado para relatórios e previsões (ex: `gemini-1.5-flash`). |
| `recommendationModel` | String | Modelo usado para recomendações de economia. |
| `monthlyTokenLimit` | Int | Limite de segurança para usuários FREE (Default: 1M tokens). |

### Lógica de Seleção
Quando o backend executa uma tarefa de IA, ele decide qual chave e modelo usar seguindo esta lógica:
1. Verifica o plano do usuário. Se for PRO/FAMILY, usa a chave corporativa (a menos que configurado o contrário).
2. Se for FREE, busca a chave criptografada do usuário.
3. Verifica qual `feature` está sendo executada (CATEGORIZATION, ANALYTICS, etc.) e seleciona o modelo configurado no `UserAiConfig`.
4. Instancia o cliente (OpenAI ou Gemini) com base no prefixo do modelo escolhido.

---

## 3. Detalhamento das Features

### A. Categorização Inteligente (`AiCategorizationService`)
**Objetivo**: Atribuir automaticamente uma categoria a uma nova transação.

**Funcionamento**:
1. **Contexto**: O backend busca as categorias do usuário e as últimas 5 transações similares.
2. **Confiança**: A IA retorna um nível de confiança (0.0 a 1.0).
3. **Threshold**: O sistema só aplica a categoria se a confiança for **>= 0.7**.
4. **Feedback Loop**: O usuário pode corrigir a categoria "sugerida" no frontend. É importante que o frontend envie esse feedback para melhorar o histórico (simplesmente editando a transação).

### B. Análise Preditiva e Insights (`PredictiveAnalyticsService`)
**Objetivo**: Prever gastos futuros e analisar a saúde financeira.

**Funcionamento (Híbrido)**:
1. **Matemática (Regressão Linear)**: Calcula a tendência "fria" dos números (ex: gastos subindo R$ 50/mês).
2. **IA Generativa**: O backend envia os dados históricos + a tendência matemática para o modelo de IA (preferencialmente Gemini ou GPT-4o).
3. **Output**: A IA gera um resumo em texto, dicas de economia e uma "Health Score" ajustada.

### C. Detecção de Anomalias (Auto-Execução)
**Objetivo**: Alertar sobre gastos fora do padrão.

**Funcionamento**:
1. O backend calcula o Z-Score (desvio padrão) dos gastos históricos.
2. Se uma transação desvia > 3 sigmas, é marcada como anomalia.
3. Se o desvio for crítico, a IA é acionada para analisar o contexto ("É fraude ou apenas um gasto esporádico?").

---

## 4. Guia de Implementação no Frontend

### Tela de Configurações de IA
Você deve criar uma página em `/dashboard/settings/ai` (ou similar) que consuma os seguintes endpoints:

#### 1. Obter Configuração Atual
- **GET** `/ai/config`
- **Retorno**:
```json
{
  "configured": true,
  "isAiEnabled": true,
  "categorizationModel": "gpt-4o-mini",
  "analyticsModel": "gemini-1.5-flash",
  "hasOpenAiKey": true,  // Use para mostrar que a chave já está salva (não retorne a chave!)
  "hasGeminiKey": false
}
```

#### 2. Salvar Configuração
- **POST** `/ai/config`
- **Payload (DTO)**:
```json
{
  "isAiEnabled": true,
  "openaiApiKey": "sk-...", // Opcional (apenas se for alterar)
  "geminiApiKey": "AIza...", // Opcional (apenas se for alterar)
  "categorizationModel": "gpt-4o-mini",
  "analyticsModel": "gemini-1.5-flash"
}
```
> **Nota**: As chaves são enviadas em "plain text" via HTTPS. O backend cuida da criptografia. Nunca armazene as chaves no LocalStorage.

#### 3. Testar Chave (UX Friendly)
Antes de salvar, permita que o usuário teste se a chave é válida.
- **POST** `/ai/config/test`
- **Payload**: `{ "openaiApiKey": "..." }` ou `{ "geminiApiKey": "..." }`

### Componentes de UI Recomendados

1. **Seletor de Modelo**:
   Use um Dropdown para permitir a escolha do modelo.
   - **Opções Sugeridas para Categorização**: `gpt-4o-mini` (Rápido/Barato), `gemini-1.5-flash` (Rápido/Gratuito layer).
   - **Opções Sugeridas para Análise**: `gpt-4o` (Melhor raciocínio), `gemini-1.5-pro` (Janela de contexto maior).

2. **Indicador de "IA em Ação"**:
   Ao exibir o `Health Score` ou `Previsão`, mostre um ícone (ex: ✨) indicando que aquele dado foi gerado por IA.

3. **Feedback de Categorização**:
   Na lista de transações, se uma transação foi categorizada via IA (campo `aiCategorized: true` na Transação), destaque sutilmente. Se o usuário alterar a categoria, o backend entenderá como uma correção.

### Tratamento de Erros
- Se a IA falhar (ex: chave inválida, cota excedida), o backend lançará exceções ou retornará dados calculados apenas matematicamente (fallback). O frontend deve degradar graciosamente (ex: mostrar apenas o gráfico de tendência sem o texto explicativo).
