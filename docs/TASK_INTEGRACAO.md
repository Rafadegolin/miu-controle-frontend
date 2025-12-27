# 📋 Checklist - Integração Backend Miu Controle

## ✅ Legenda
- `[ ]` Não iniciado
- `[/]` Em progresso
- `[x]` Concluído

---

## 🔐 Fase 1: Autenticação (PRIORIDADE MÁXIMA)

### 1.1. Setup Inicial
- [x] Configurar variável de ambiente `NEXT_PUBLIC_API_URL` apontando para `https://api.miucontrole.com.br`
- [x] Atualizar constante `API_BASE_URL` em `src/services/api.ts`
- [x] Validar estrutura de tipos em `src/types/api.ts` com endpoints do backend

### 1.2. Registro de Usuário
- [x] Implementar validação de senha forte no frontend (min 8 chars, maiúsculas, minúsculas, números, símbolos)
- [x] Conectar formulário de registro com `POST /auth/register`
- [x] Tratar resposta com tokens (accessToken, refreshToken)
- [x] Salvar tokens no localStorage via `ApiService.setTokens()`
- [x] Redirecionar para dashboard após registro bem-sucedido
- [x] Implementar mensagens de erro (email duplicado, senha fraca, etc.)

### 1.3. Login de Usuário
- [x] Conectar formulário de login com `POST /auth/login`
- [x] Implementar validação de campos antes do envio
- [x] Salvar tokens após login bem-sucedido
- [x] Atualizar contexto de autenticação com dados do usuário
- [ ] Implementar "Lembrar-me" (opcional)
- [x] Tratar erros (credenciais inválidas, conta não encontrada)

### 1.4. Gestão de Sessão
- [x] Implementar carregamento automático do usuário ao recarregar página (`GET /auth/me`)
- [x] Testar refresh token automático em caso de token expirado (401)
- [x] Implementar logout com limpeza de tokens (`POST /auth/logout`)
- [x] Adicionar redirecionamento para login em rotas protegidas sem autenticação

### 1.5. Recuperação de Senha
- [x] Criar tela "Esqueci minha senha"
- [/] Implementar `POST /auth/forgot-password`
- [/] Criar tela de redefinição com token
- [/] Implementar `POST /auth/verify-reset-token`
- [x] Implementar `POST /auth/reset-password`
- [/] Adicionar feedback visual de sucesso/erro

### 1.6. Verificação de Email
- [ ] Implementar banner de "Email não verificado" no dashboard
- [ ] Adicionar botão "Reenviar email de verificação" (`POST /auth/resend-verification`)
- [ ] Criar página de callback `POST /auth/verify-email`
- [ ] Atualizar estado do usuário após verificação

### 1.7. Gerenciamento de Sessões
- [x] Criar página de sessões ativas em configurações
- [x] Implementar listagem `GET /auth/sessions`
- [x] Adicionar botão "Revogar sessão" (`DELETE /auth/sessions/{id}`)
- [x] Adicionar botão "Revogar todas as sessões" (`DELETE /auth/sessions/revoke-all`)

---

## 👤 Fase 2: Gerenciamento de Usuário

### 2.1. Perfil do Usuário
- [x] Conectar endpoint `GET /users/me` para carregar perfil
- [x] Criar formulário de edição de perfil
- [x] Implementar `PATCH /users/me` para atualizar nome, moeda preferida
- [x] Adicionar validação de campos no frontend

### 2.2. Avatar do Usuário
- [x] Criar componente de upload de avatar
- [x] Implementar `POST /users/me/avatar`
- [x] Validar tamanho (max 5MB) e formatos (jpg, jpeg, png, webp)
- [x] Implementar preview antes do upload
- [x] Adicionar botão "Remover avatar" (`DELETE /users/me/avatar`)
- [x] Atualizar imagem no header após upload

### 2.3. Troca de Senha
- [x] Criar formulário de troca de senha
- [x] Implementar validação de senha atual
- [x] Implementar `PATCH /users/me/password`
- [x] Adicionar indicador de força da nova senha
- [x] Implementar logout automático após troca bem-sucedida

### 2.4. Exclusão de Conta
- [x] Criar modal de confirmação para exclusão
- [x] Implementar `DELETE /users/me`
- [x] Adicionar campo de confirmação (digitar "DELETAR" ou senha)
- [x] Limpar tokens e redirecionar para homepage

---

## 🏦 Fase 3: Contas Bancárias

### 3.1. Listagem de Contas
- [x] Conectar `GET /accounts` para listar contas
- [x] Implementar filtro `activeOnly=true` (Via API Default ou Frontend)
- [x] Criar componente de card de conta com saldo
- [x] Adicionar indicador de conta ativa/inativa
- [x] Implementar skeleton loading durante carregamento

### 3.2. Saldo Total
- [x] Implementar `GET /accounts/balance` (Summary Endpoint)
- [x] Exibir saldo consolidado no dashboard
- [x] Adicionar formatação de moeda
- [x] Implementar atualização automática ao criar transações (Invalidate Query)

### 3.3. Criação de Conta
- [x] Criar modal/tela de nova conta
- [x] Implementar formulário com validação
- [x] Adicionar seletor de tipo (CHECKING, SAVINGS, CREDIT_CARD, INVESTMENT)
- [x] Implementar color picker para personalização
- [x] Conectar com `POST /accounts`
- [x] Adicionar à lista sem recarregar página

### 3.4. Edição de Conta
- [x] Criar modal de edição
- [x] Pré-preencher formulário com dados atuais (`GET /accounts/{id}`)
- [x] Implementar `PATCH /accounts/{id}`
- [x] Atualizar lista otimisticamente

### 3.5. Desativação de Conta
- [x] Adicionar botão "Desativar conta"
- [x] Criar modal de confirmação
- [x] Implementar `DELETE /accounts/{id}`
- [x] Atualizar lista após desativação

---

## 📁 Fase 4: Categorias

### 4.1. Listagem de Categorias
- [x] Conectar `GET /categories`
- [x] Implementar filtro por tipo (INCOME/EXPENSE)
- [x] Criar componente visual de categoria (ícone + cor)
- [x] Separar categorias do sistema vs personalizadas

### 4.2. Criação de Categoria
- [x] Criar formulário de nova categoria
- [x] Adicionar seletor de ícones
- [x] Implementar color picker
- [x] Conectar com `POST /categories`
- [x] Validar nome único

### 4.3. Estatísticas da Categoria
- [x] Implementar `GET /categories/{id}/stats`
- [x] Criar modal/página com gastos por categoria
- [x] Adicionar gráfico de tendência temporal

### 4.4. Edição e Exclusão
- [x] Implementar `PATCH /categories/{id}`
- [x] Implementar `DELETE /categories/{id}`
- [x] Adicionar aviso se categoria tiver transações vinculadas

---

## 💰 Fase 5: Transações

### 5.1. Listagem de Transações
- [/] Conectar `GET /transactions` com paginação
- [/] Implementar filtros (tipo, data, conta, categoria)
- [/] Criar componente de item de transação
- [ ] Adicionar infinite scroll ou paginação tradicional
- [ ] Implementar busca por descrição/merchant

### 5.2. Criação de Transação
- [x] Criar formulário de nova transação
- [x] Adicionar seletor de conta
- [x] Adicionar seletor de categoria
- [x] Implementar seletor de data (Calendar + Popover)
- [ ] Adicionar campo de tags (input com chips)
- [x] Conectar com `POST /transactions`
- [x] Atualizar saldo da conta automaticamente

### 5.3. Tipos de Transação
- [x] Implementar criação de RECEITA (INCOME)
- [x] Implementar criação de DESPESA (EXPENSE)
- [ ] Implementar criação de TRANSFERÊNCIA (TRANSFER)
- [x] Adicionar validação específica por tipo

### 5.4. Anexo de Comprovante
- [ ] Criar componente de upload de comprovante
- [ ] Implementar `POST /transactions/{id}/receipt`
- [ ] Validar formato de imagem/PDF
- [ ] Adicionar preview do comprovante
- [ ] Implementar `DELETE /transactions/{id}/receipt`

### 5.5. Edição e Exclusão
- [x] Criar modal de edição de transação
- [x] Implementar `PATCH /transactions/{id}`
- [x] Implementar `DELETE /transactions/{id}`
- [x] Adicionar modal de confirmação para exclusão
- [x] Atualizar saldo ao editar/deletar

### 5.6. Estatísticas de Transações
- [x] Implementar `GET /transactions/stats/monthly`
- [x] Implementar `GET /transactions/stats/category/{categoryId}`
- [x] Criar gráfico de receitas vs despesas
- [x] Adicionar total por categoria
- [ ] Implementar comparação mês a mês

---

## 💵 Fase 6: Orçamentos

### 6.1. Listagem de Orçamentos
- [ ] Conectar `GET /budgets`
- [ ] Implementar filtro por período (MONTHLY, WEEKLY, YEARLY)
- [ ] Criar card de orçamento com barra de progresso
- [ ] Adicionar indicador de orçamento excedido

### 6.2. Criação de Orçamento
- [ ] Criar formulário de novo orçamento
- [ ] Vincular a categoria
- [ ] Adicionar seletor de período
- [ ] Definir valor e data de início
- [ ] Conectar com `POST /budgets`

### 6.3. Resumo Mensal
- [ ] Implementar `GET /budgets/summary`
- [ ] Criar dashboard de orçamentos do mês
- [ ] Adicionar gráfico de categorias vs orçamento
- [ ] Destacar categorias no vermelho

### 6.4. Status do Orçamento
- [ ] Implementar `GET /budgets/{id}/status`
- [ ] Exibir gasto atual vs limite
- [ ] Calcular porcentagem utilizada
- [ ] Adicionar alertas quando próximo do limite

### 6.5. Edição e Exclusão
- [ ] Implementar `PATCH /budgets/{id}`
- [ ] Implementar `DELETE /budgets/{id}`
- [ ] Adicionar histórico de alterações

---

## 🎯 Fase 7: Objetivos/Metas

### 7.1. Listagem de Objetivos
- [ ] Conectar `GET /goals`
- [ ] Implementar filtro por status (ACTIVE, COMPLETED, CANCELLED)
- [ ] Criar card visual de objetivo com progresso
- [ ] Adicionar barra de progresso animada
- [ ] Calcular dias restantes até meta

### 7.2. Criação de Objetivo
- [ ] Criar formulário de novo objetivo
- [ ] Adicionar campos nome, valor alvo, data alvo
- [ ] Implementar color picker e seletor de ícone
- [ ] Conectar com `POST /goals`

### 7.3. Contribuições
- [ ] Implementar `POST /goals/{id}/contribute`
- [ ] Criar modal de contribuição vinculada a conta
- [ ] Atualizar progresso em tempo real
- [ ] Implementar `POST /goals/{id}/withdraw` para retiradas
- [ ] Adicionar histórico de contribuições

### 7.4. Imagem do Objetivo
- [ ] Criar componente de upload de imagem
- [ ] Implementar `POST /goals/{id}/image`
- [ ] Validar formato e tamanho (max 5MB)
- [ ] Adicionar preview da imagem
- [ ] Implementar `DELETE /goals/{id}/image`

### 7.5. Links de Compra
- [ ] Criar seção de links de produtos/serviços
- [ ] Implementar `POST /goals/{id}/purchase-links`
- [ ] Adicionar formulário (título, URL, preço)
- [ ] Implementar `PATCH /goals/{id}/purchase-links/{linkId}`
- [ ] Implementar `DELETE /goals/{id}/purchase-links/{linkId}`
- [ ] Criar resumo total de links (`GET /goals/{id}/purchase-links/summary`)

### 7.6. Resumo de Objetivos
- [ ] Implementar `GET /goals/summary`
- [ ] Exibir total economizado vs total alvo
- [ ] Adicionar gráfico de progressão geral
- [ ] Destacar objetivos vencidos

### 7.7. Edição e Exclusão
- [ ] Implementar `PATCH /goals/{id}`
- [ ] Implementar `DELETE /goals/{id}`
- [ ] Adicionar confirmação para exclusão

---

## 📊 Fase 8: Relatórios

### 8.1. Dashboard Completo
- [x] Implementar `GET /dashboard/home` (Endpoint unificado)
- [x] Criar widgets de KPIs principais
- [ ] Adicionar gráfico de saldo ao longo do tempo
- [ ] Implementar filtro de período

### 8.2. Análise por Categorias
- [ ] Implementar `GET /reports/category-analysis`
- [ ] Criar gráfico de pizza por categoria
- [ ] Adicionar lista ordenada de gastos
- [ ] Implementar comparação com mês anterior

### 8.3. Tendência Mensal
- [ ] Implementar `GET /reports/monthly-trend`
- [ ] Criar gráfico de linha temporal
- [ ] Adicionar média de gastos
- [ ] Destacar meses com maior/menor gastos

### 8.4. Análise por Conta
- [ ] Implementar `GET /reports/account-analysis`
- [ ] Criar breakdown por conta bancária
- [ ] Adicionar gráfico de distribuição de saldo

### 8.5. Top Transações
- [ ] Implementar `GET /reports/top-transactions`
- [ ] Listar maiores receitas
- [ ] Listar maiores despesas
- [ ] Adicionar filtro por período

### 8.6. Insights Automáticos
- [ ] Implementar `GET /reports/insights`
- [ ] Exibir dicas de economia
- [ ] Alertar sobre gastos incomuns
- [ ] Sugerir ajustes em orçamentos

### 8.7. Relatório Completo
- [ ] Implementar `GET /reports/full-report`
- [ ] Criar página de relatório detalhado
- [ ] Adicionar opção de impressão

---

## 🔔 Fase 9: Notificações

### 9.1. Listagem
- [ ] Conectar `GET /notifications`
- [ ] Implementar filtro `unreadOnly=true`
- [ ] Criar dropdown de notificações no header
- [ ] Adicionar badge com contador

### 9.2. Contador de Não Lidas
- [ ] Implementar `GET /notifications/unread-count`
- [ ] Atualizar badge em tempo real
- [ ] Implementar polling ou WebSocket (futuro)

### 9.3. Marcar como Lida
- [ ] Implementar `POST /notifications/mark-as-read`
- [ ] Marcar ao clicar na notificação
- [ ] Adicionar botão "Marcar todas como lidas" (`POST /notifications/mark-all-as-read`)

### 9.4. Limpeza e Exclusão
- [ ] Implementar `DELETE /notifications/clear-read`
- [ ] Implementar `DELETE /notifications/{id}`
- [ ] Adicionar confirmação

---

## 💱 Fase 10: Moedas

### 10.1. Listagem de Moedas
- [ ] Conectar `GET /currencies`
- [ ] Exibir moedas disponíveis em configurações
- [ ] Implementar filtro `activeOnly=true`

### 10.2. Consulta de Moeda
- [ ] Implementar `GET /currencies/{id}`
- [ ] Implementar `GET /currencies/code/BRL`
- [ ] Adicionar busca por código

---

## 💹 Fase 11: Taxas de Câmbio

### 11.1. Conversão de Moeda
- [ ] Implementar `POST /exchange-rates/convert`
- [ ] Criar componente de conversor
- [ ] Adicionar seletor de moedas origem/destino

### 11.2. Taxa Mais Recente
- [ ] Implementar `GET /exchange-rates/latest`
- [ ] Exibir taxa de conversão em tempo real

### 11.3. Consolidação de Saldos
- [ ] Implementar `GET /exchange-rates/consolidate`
- [ ] Converter todos os saldos para moeda preferida
- [ ] Exibir total consolidado no dashboard

---

## 📤 Fase 12: Exportação de Dados

### 12.1. Exportar CSV
- [ ] Implementar `GET /export/csv`
- [ ] Adicionar botão de download
- [ ] Implementar filtro de período

### 12.2. Exportar Excel
- [ ] Implementar `GET /export/excel`
- [ ] Adicionar opção de exportação

### 12.3. Exportar PDF
- [ ] Implementar `GET /export/pdf`
- [ ] Criar relatório formatado

---

## 🔁 Fase 13: Transações Recorrentes

### 13.1. Listagem
- [ ] Conectar `GET /recurring-transactions`
- [ ] Implementar filtro `activeOnly=true`
- [ ] Criar card de recorrência

### 13.2. Criação
- [ ] Criar formulário de recorrência
- [ ] Adicionar seletor de frequência (DAILY, WEEKLY, MONTHLY, YEARLY)
- [ ] Implementar `POST /recurring-transactions`
- [ ] Adicionar opção de criação automática

### 13.3. Gerenciamento
- [ ] Implementar `PATCH /recurring-transactions/{id}`
- [ ] Implementar `DELETE /recurring-transactions/{id}`
- [ ] Adicionar toggle ativo/inativo (`POST /recurring-transactions/{id}/toggle-active`)
- [ ] Implementar processamento manual (`POST /recurring-transactions/{id}/process-now`)

---

## ✅ Fase 14: Testes e Validação

### 14.1. Testes Unitários
- [ ] Criar testes para ApiService
- [ ] Testar interceptors de token
- [ ] Testar refresh token automático

### 14.2. Testes de Integração
- [ ] Testar fluxo completo de registro → login → dashboard
- [ ] Testar criação de conta → transação → atualização de saldo
- [ ] Testar criação de objetivo → contribuição → conclusão

### 14.3. Testes de UX
- [ ] Validar estados de loading
- [ ] Validar mensagens de erro amigáveis
- [ ] Testar responsividade em mobile
- [ ] Validar acessibilidade (WCAG)

### 14.4. Testes de Performance
- [ ] Avaliar tempo de carregamento de listas grandes
- [ ] Otimizar queries com React Query
- [ ] Implementar cache adequado

---

## 📝 Fase 15: Documentação e Refatoração

### 15.1. Documentação
- [ ] Documentar estrutura de pastas
- [ ] Criar guia de uso dos hooks personalizados
- [ ] Documentar padrões de erro handling

### 15.2. Melhorias de Código
- [ ] Implementar error boundaries
- [ ] Adicionar PropTypes ou validação com Zod
- [ ] Refatorar componentes grandes em componentes menores

### 15.3. Otimizações
- [ ] Implementar code splitting
- [ ] Otimizar bundle size
- [ ] Adicionar PWA support (futuro)
