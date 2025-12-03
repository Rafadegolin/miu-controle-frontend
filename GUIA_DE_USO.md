# 🎉 Guia de Uso - Miu Controle

## ✅ Projeto Instalado e Funcionando!

O servidor está rodando em: **http://localhost:3000**

---

## 🗺️ Navegação do Sistema

### 1️⃣ Landing Page (/)

- **URL:** http://localhost:3000
- **Descrição:** Página inicial pública com animações, recursos e preços
- **Ações disponíveis:**
  - Clicar em "Começar Grátis" → Vai para `/register`
  - Clicar em "Entrar" → Vai para `/login`
  - Scroll para ver todas as seções

### 2️⃣ Registro (/register)

- **URL:** http://localhost:3000/register
- **Descrição:** Crie uma nova conta
- **Como usar:**
  - Preencha: Nome, Email, Senha
  - Clique em "Começar Agora"
  - Será redirecionado para o Dashboard

### 3️⃣ Login (/login)

- **URL:** http://localhost:3000/login
- **Descrição:** Entre com sua conta existente
- **Como usar:**
  - Preencha: Email, Senha
  - Clique em "Entrar"
  - Será redirecionado para o Dashboard

> **📝 Nota:** A autenticação é mockada. Qualquer email/senha funciona!

---

## 🏠 Dashboard (Área Privada)

### Visão Geral (/dashboard)

- **URL:** http://localhost:3000/dashboard
- **Recursos:**
  - Gráfico de fluxo de caixa (receitas vs despesas)
  - Anel animado de orçamento mensal
  - KPIs: Saldo total, Receitas, Despesas
  - Últimas transações
  - Distribuição por categorias

### Transações (/dashboard/transactions)

- **URL:** http://localhost:3000/dashboard/transactions
- **Recursos:**
  - Listagem completa de transações
  - Busca por descrição
  - Filtros por categoria
  - Tabela responsiva

### Relatórios (/dashboard/reports)

- **URL:** http://localhost:3000/dashboard/reports
- **Recursos:**
  - Gráfico de pizza (gastos por categoria)
  - Heatmap de gastos semanais
  - Insights automáticos

### Metas (/dashboard/goals)

- **URL:** http://localhost:3000/dashboard/goals
- **Recursos:**
  - Visualização de metas financeiras
  - Barra de progresso animada
  - Prazo e valores

### Investimentos (/dashboard/investments)

- **URL:** http://localhost:3000/dashboard/investments
- **Recursos:**
  - Portfólio de investimentos
  - Card com sugestões da IA Miu
  - Gráficos de rentabilidade

### Conexões (/dashboard/sync)

- **URL:** http://localhost:3000/dashboard/sync
- **Recursos:**
  - Status de conexão com bancos (Open Finance)
  - Toggle do leitor de notificações
  - Scanner OCR de notas fiscais

### Perfil (/dashboard/profile)

- **URL:** http://localhost:3000/dashboard/profile
- **Recursos:**
  - Informações pessoais
  - Nível e streak
  - Conquistas desbloqueadas

### Configurações (/dashboard/settings)

- **URL:** http://localhost:3000/dashboard/settings
- **Recursos:**
  - Aparência
  - Notificações
  - Segurança
  - Botão de logout

---

## 📱 Navegação Mobile

No celular/tablet, o menu aparece como:

- **Bottom Navigation** (barra inferior)
- **Botão flutuante** (+) no centro para adicionar transação
- **Menu lateral** acessível pelo botão hamburger (☰)

---

## 🎨 Recursos Visuais

### Animações

- ✅ Fade in/out nas transições de página
- ✅ Hover effects em cards e botões
- ✅ Anel de orçamento com animação circular
- ✅ Hero animation na landing page (sequência completa)

### Gráficos

- 📊 Área chart (fluxo de caixa)
- 🥧 Pie chart (categorias)
- 📈 Line charts (investimentos)
- 🟩 Heatmap (gastos semanais)

### Temas de Cores

- 🌊 **Primary:** #00404f (Dark Teal)
- 💎 **Accent:** #7cddb1 (Mint)
- ✅ **Success:** #007459 (Green)
- ❌ **Expense:** #ff6b6b (Red)

---

## 🔐 Sistema de Autenticação

### Como funciona:

1. Usuário faz login/registro
2. Dados são salvos no `localStorage`
3. Context API gerencia o estado global
4. `ProtectedRoute` verifica autenticação
5. Se não autenticado → redireciona para `/login`

### Logout:

- Clique no ícone de logout na sidebar (🚪)
- Ou vá em Configurações → "Sair da Conta"

---

## 🛠️ Estrutura de Dados Mockados

Todos os dados exibidos são mockados em `src/lib/constants.ts`:

- `MOCK_USER` - Dados do usuário
- `MOCK_TRANSACTIONS` - Transações
- `MOCK_ACCOUNTS` - Contas bancárias
- `MOCK_INVESTMENTS` - Investimentos
- `MOCK_GOALS` - Metas
- `CATEGORY_DATA` - Categorias
- `REPORT_DATA` - Dados de relatórios

---

## 🚀 Próximas Etapas (Desenvolvimento)

Para conectar com backend real:

1. **Criar API REST/GraphQL** para:

   - Autenticação (JWT)
   - CRUD de transações
   - Relatórios
   - Metas e investimentos

2. **Substituir mocks** por chamadas de API em:

   - `src/contexts/AuthContext.tsx`
   - Páginas do dashboard

3. **Implementar:**
   - Refresh tokens
   - Validação de formulários (Zod/Yup)
   - Loading states
   - Error handling
   - Toast notifications

---

## 📞 Suporte

Caso encontre algum problema:

1. Verifique se o servidor está rodando (`npm run dev`)
2. Limpe o cache do navegador
3. Verifique o console do navegador (F12)
4. Veja os logs do terminal

---

## 🎯 Dicas de Uso

### Desenvolvimento:

- Use o hot reload - edite os arquivos e veja as mudanças instantaneamente
- Tailwind IntelliSense está ativo (auto-complete de classes)
- TypeScript vai alertar sobre erros em tempo real

### Explorar o código:

- **Componentes UI:** `src/components/ui/`
- **Páginas:** `src/app/`
- **Tipos:** `src/types/`
- **Constantes:** `src/lib/constants.ts`

---

## ✨ Aproveite o Miu Controle!

Qualquer dúvida, consulte o código ou a documentação do Next.js.
