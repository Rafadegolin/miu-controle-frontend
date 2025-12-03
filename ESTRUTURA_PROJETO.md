# 📋 Estrutura Completa do Projeto - Miu Controle

## 📁 Árvore de Diretórios

```
miu-controle-frontend/
│
├── 📄 package.json                     # Dependências do projeto
├── 📄 tsconfig.json                    # Configuração TypeScript
├── 📄 next.config.ts                   # Configuração Next.js
├── 📄 postcss.config.mjs               # Configuração PostCSS
├── 📄 components.json                  # Configuração shadcn/ui
├── 📄 README.md                        # Documentação principal
├── 📄 GUIA_DE_USO.md                  # Guia detalhado de uso
└── 📄 QUICK_START.md                  # Guia rápido

src/
├── 📂 app/                            # Rotas do Next.js (App Router)
│   │
│   ├── 📄 layout.tsx                  # Layout raiz + AuthProvider
│   ├── 📄 page.tsx                    # Landing Page (Pública)
│   ├── 📄 globals.css                 # Estilos globais + animações
│   │
│   ├── 📂 login/
│   │   └── 📄 page.tsx                # Página de Login (Pública)
│   │
│   ├── 📂 register/
│   │   └── 📄 page.tsx                # Página de Registro (Pública)
│   │
│   └── 📂 dashboard/                  # Área Privada (Protegida)
│       ├── 📄 layout.tsx              # Layout do Dashboard + ProtectedRoute
│       ├── 📄 page.tsx                # Overview/Visão Geral
│       │
│       ├── 📂 transactions/
│       │   └── 📄 page.tsx            # Página de Transações
│       │
│       ├── 📂 reports/
│       │   └── 📄 page.tsx            # Página de Relatórios
│       │
│       ├── 📂 goals/
│       │   └── 📄 page.tsx            # Página de Metas
│       │
│       ├── 📂 investments/
│       │   └── 📄 page.tsx            # Página de Investimentos
│       │
│       ├── 📂 sync/
│       │   └── 📄 page.tsx            # Página de Conexões
│       │
│       ├── 📂 profile/
│       │   └── 📄 page.tsx            # Página de Perfil
│       │
│       └── 📂 settings/
│           └── 📄 page.tsx            # Página de Configurações
│
├── 📂 components/                     # Componentes React
│   │
│   ├── 📂 ui/                         # Componentes Base (shadcn-style)
│   │   ├── 📄 Button.tsx              # Botão customizado
│   │   └── 📄 Card.tsx                # Card customizado
│   │
│   ├── 📂 auth/
│   │   └── 📄 ProtectedRoute.tsx      # HOC para proteger rotas privadas
│   │
│   ├── 📂 dashboard/
│   │   ├── 📄 Sidebar.tsx             # Menu lateral do dashboard
│   │   ├── 📄 BalanceRing.tsx         # Anel de orçamento animado
│   │   └── 📄 TransactionItem.tsx     # Item de transação
│   │
│   └── 📂 landing/
│       └── 📄 HeroAnimation.tsx       # Animação do hero da landing
│
├── 📂 contexts/                       # Gerenciamento de Estado Global
│   └── 📄 AuthContext.tsx             # Context API para autenticação
│
├── 📂 lib/                            # Bibliotecas e Utilitários
│   ├── 📄 constants.ts                # Constantes e dados mockados
│   └── 📄 utils.ts                    # Funções utilitárias (cn, etc)
│
└── 📂 types/                          # Definições TypeScript
    └── 📄 index.ts                    # Interfaces e tipos

```

---

## 🗂️ Descrição dos Arquivos Principais

### 📱 App (Rotas)

| Arquivo                               | Tipo        | Descrição                             |
| ------------------------------------- | ----------- | ------------------------------------- |
| `app/layout.tsx`                      | Layout Root | AuthProvider + Configuração global    |
| `app/page.tsx`                        | Landing     | Hero, features, preços, footer        |
| `app/login/page.tsx`                  | Auth        | Formulário de login                   |
| `app/register/page.tsx`               | Auth        | Formulário de registro                |
| `app/dashboard/layout.tsx`            | Layout      | Sidebar + ProtectedRoute + Bottom Nav |
| `app/dashboard/page.tsx`              | Dashboard   | Overview com gráficos e KPIs          |
| `app/dashboard/transactions/page.tsx` | Dashboard   | Tabela de transações                  |
| `app/dashboard/reports/page.tsx`      | Dashboard   | Gráficos avançados                    |
| `app/dashboard/goals/page.tsx`        | Dashboard   | Metas com progresso                   |
| `app/dashboard/investments/page.tsx`  | Dashboard   | Portfólio + IA insights               |
| `app/dashboard/sync/page.tsx`         | Dashboard   | Conexões bancárias                    |
| `app/dashboard/profile/page.tsx`      | Dashboard   | Dados do usuário                      |
| `app/dashboard/settings/page.tsx`     | Dashboard   | Configurações + logout                |

### 🧩 Components

| Componente            | Função                                                |
| --------------------- | ----------------------------------------------------- |
| `Button.tsx`          | Botão com variantes (primary, secondary, mint, ghost) |
| `Card.tsx`            | Card com hover effects                                |
| `ProtectedRoute.tsx`  | Verifica autenticação antes de renderizar             |
| `Sidebar.tsx`         | Menu lateral com navegação                            |
| `BalanceRing.tsx`     | Anel SVG animado com Framer Motion                    |
| `TransactionItem.tsx` | Item de transação com ícone                           |
| `HeroAnimation.tsx`   | Sequência animada do hero                             |

### 🎯 Contexts

| Context           | Função                                     |
| ----------------- | ------------------------------------------ |
| `AuthContext.tsx` | Login, register, logout, estado do usuário |

### 📚 Lib

| Arquivo        | Função                                       |
| -------------- | -------------------------------------------- |
| `constants.ts` | MOCK_USER, MOCK_TRANSACTIONS, cores, etc     |
| `utils.ts`     | Função `cn()` para merge de classes Tailwind |

### 📝 Types

| Arquivo    | Função                                       |
| ---------- | -------------------------------------------- |
| `index.ts` | User, Transaction, Account, Investment, Goal |

---

## 🔄 Fluxo de Dados

```
1. Usuário acessa landing (/)
   ↓
2. Clica em "Começar Grátis" → /register
   ↓
3. Preenche formulário
   ↓
4. AuthContext.register() → Salva no localStorage
   ↓
5. Redireciona para /dashboard
   ↓
6. ProtectedRoute verifica isAuthenticated
   ↓
7. Se autenticado → Renderiza Dashboard
   ↓
8. Dashboard carrega dados de constants.ts (mocks)
   ↓
9. Usuário navega pelo sistema
   ↓
10. Logout → Limpa localStorage → Volta para /
```

---

## 🎨 Sistema de Design

### Cores (constants.ts)

```typescript
primary: "#00404f"; // Dark Teal
secondary: "#3c88a0"; // Teal Médio
accent: "#7cddb1"; // Mint (CTAs)
success: "#007459"; // Verde (Receitas)
expense: "#ff6b6b"; // Vermelho (Despesas)
warning: "#ffd166"; // Amarelo (Avisos)
bgLight: "#F8FAFC"; // Fundo App
```

### Componentes Base

- **Button:** 6 variantes, 3 tamanhos
- **Card:** Hover effects, backdrop blur
- **Animações:** Framer Motion + CSS custom

---

## 📦 Dependências Principais

```json
{
  "next": "16.0.6",
  "react": "19.2.0",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "latest",
  "recharts": "latest",
  "lucide-react": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

---

## 🚀 Rotas do Sistema

### Públicas (Sem Autenticação)

- `/` - Landing Page
- `/login` - Login
- `/register` - Registro

### Privadas (Requer Autenticação)

- `/dashboard` - Overview
- `/dashboard/transactions` - Transações
- `/dashboard/reports` - Relatórios
- `/dashboard/goals` - Metas
- `/dashboard/investments` - Investimentos
- `/dashboard/sync` - Conexões
- `/dashboard/profile` - Perfil
- `/dashboard/settings` - Configurações

---

## 🔐 Sistema de Autenticação

### LocalStorage

```javascript
// Salvo após login/registro
{
  miu_user: {
    name: "Rafael",
    email: "rafael@miu.app",
    avatar: "...",
    level: 4,
    xp: 3250,
    streak: 15,
    balance: {...}
  }
}
```

### Context API

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email, password) => Promise<void>;
  register: (name, email, password) => Promise<void>;
  logout: () => void;
}
```

---

## 📊 Dados Mockados (constants.ts)

- **MOCK_USER:** Usuário logado
- **MOCK_TRANSACTIONS:** 5 transações de exemplo
- **MOCK_ACCOUNTS:** 3 contas bancárias
- **MOCK_INVESTMENTS:** 3 investimentos
- **MOCK_GOALS:** 2 metas financeiras
- **REPORT_DATA:** 6 meses de dados
- **CATEGORY_DATA:** 5 categorias de gastos

---

## ✅ Status do Projeto

**COMPLETO E FUNCIONAL**

✅ Landing page  
✅ Autenticação  
✅ Dashboard completo  
✅ 8 páginas funcionais  
✅ Gráficos e visualizações  
✅ Animações  
✅ Responsivo  
✅ TypeScript  
✅ Proteção de rotas

**Próximo passo:** Integrar com backend real! 🚀
