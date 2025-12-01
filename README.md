# 🎨 Miu Controle - Frontend

<div align="center">

![Miu Controle](https://img.shields.io/badge/Miu%20Controle-Frontend-6366F1?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Interface moderna e performática para controle financeiro pessoal com design responsivo, dark mode e experiência otimizada.**

[🚀 Demo](#-instalação-e-setup) · [📚 Documentação](#-estrutura-do-projeto) · [🐛 Reportar Bug](https://github.com/Rafadegolin/miu-controle-frontend/issues) · [✨ Solicitar Feature](https://github.com/Rafadegolin/miu-controle-frontend/issues)

</div>

---

## 🎯 Sobre o Miu Controle Frontend

Interface web moderna e intuitiva do **Miu Controle**, construída com as tecnologias mais recentes do ecossistema React para proporcionar a melhor experiência do usuário.

### 💡 Filosofia de Design

**Simplicidade e velocidade.** Registrar uma transação deve ser mais rápido do que abrir uma planilha. A interface foi projetada para **minimizar cliques** e **maximizar clareza visual**.

### ✨ Diferenciais

- ⚡ **Performance brutal** - Server Components, lazy loading e otimizações agressivas
- 🎨 **Design moderno** - shadcn/ui + Tailwind v4 com componentes reutilizáveis
- 🌙 **Dark mode nativo** - Tema escuro suave para os olhos
- 📱 **Mobile-first** - Totalmente responsivo do smartphone ao desktop
- 🔄 **Atualizações em tempo real** - React Query com cache inteligente
- 🎭 **Animações fluidas** - Framer Motion para transições suaves
- ♿ **Acessível** - WCAG 2.1 AA compliant

---

## 🚀 Features

### ✅ Implementadas (Milestone 1)

- 🔐 **Autenticação completa** - Login, registro, recuperação de senha
- 📊 **Dashboard visual** - Cards de KPIs, gráficos interativos com Recharts
- 💸 **CRUD de Transações** - Criar, editar, deletar com validação em tempo real
- 🏦 **Gestão de Contas** - Visualizar, criar e editar contas bancárias
- 🔔 **Notificações In-App** - Dropdown com alertas de orçamento e metas
- 🌙 **Dark Mode** - Tema claro/escuro com transição suave
- 🎨 **Design System** - Componentes consistentes com shadcn/ui
- ⚡ **Performance otimizada** - Lighthouse score >90

### 🔜 Roadmap (Milestone 2+)

- [ ] **Orçamentos visuais** - Barras de progresso, alertas coloridos
- [ ] **Metas colaborativas** - Economizar junto com família
- [ ] **Relatórios avançados** - PDFs exportáveis, gráficos customizados
- [ ] **Filtros inteligentes** - Busca avançada com múltiplos critérios
- [ ] **Categorização por IA** - Sugestões automáticas de categoria
- [ ] **PWA completo** - Instalar como app nativo
- [ ] **Atalhos de teclado** - Cmd+K para criar transação rapidamente
- [ ] **WebSockets** - Sincronização em tempo real multi-dispositivo

---

## 🛠️ Stack Tecnológica

| Tecnologia           | Versão | Descrição                                 |
| -------------------- | ------ | ----------------------------------------- |
| **Next.js**          | 15.x   | Framework React com App Router            |
| **React**            | 19.x   | Biblioteca UI                             |
| **TypeScript**       | 5.3+   | JavaScript tipado                         |
| **Tailwind CSS**     | v4     | Framework CSS utility-first               |
| **shadcn/ui**        | latest | Componentes UI com Radix                  |
| **TanStack Query**   | v5     | Data fetching e cache                     |
| **Zustand**          | latest | Estado global leve                        |
| **React Hook Form**  | latest | Forms performáticos                       |
| **Zod**              | latest | Validação de schemas                      |
| **Framer Motion**    | latest | Animações declarativas                    |
| **Recharts**         | latest | Gráficos responsivos                      |
| **Axios**            | latest | Cliente HTTP                              |
| **date-fns**         | latest | Manipulação de datas                      |
| **Lucide React**     | latest | Ícones modernos                           |
| **Sonner**           | latest | Toasts elegantes                          |

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) 20 ou superior
- npm, yarn ou pnpm
- Backend do Miu Controle rodando (ver [miu-controle-backend](https://github.com/Rafadegolin/miu-controle-backend))

---

## 🚀 Instalação e Setup

### 1. Clone o repositório

git clone https://github.com/Rafadegolin/miu-controle-frontend.git
cd miu-controle-frontend

### 2. Instale as dependências

npm install

ou
yarn install

ou
pnpm install


### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

cp .env.example .env.local

Edite o `.env.local` com suas configurações:

API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001

App URL (para SEO e compartilhamento)
NEXT_PUBLIC_APP_URL=http://localhost:3000

Analytics (opcional)
NEXT_PUBLIC_GA_ID=

Sentry (opcional)
NEXT_PUBLIC_SENTRY_DSN=


### 4. Instale os componentes shadcn/ui (primeira vez)

npx shadcn-ui@latest init

Responda as perguntas:
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes

Instale componentes essenciais:

npx shadcn-ui@latest add button input label card
npx shadcn-ui@latest add dropdown-menu avatar badge
npx shadcn-ui@latest add dialog sheet toast
npx shadcn-ui@latest add select checkbox textarea

### 5. Inicie o servidor de desenvolvimento

npm run dev

ou
yarn dev

ou
pnpm dev

✅ A aplicação estará rodando em `http://localhost:3000`

### 6. Build para produção

Build
npm run build

Servir build localmente
npm run start

---

## 📁 Estrutura do Projeto

src/
├── app/ # Next.js 15 App Router
│ ├── (auth)/ # Grupo de rotas de autenticação
│ │ ├── login/ # Página de login
│ │ ├── register/ # Página de registro
│ │ ├── forgot-password/ # Recuperação de senha
│ │ └── layout.tsx # Layout de auth
│ ├── (dashboard)/ # Grupo de rotas autenticadas
│ │ ├── dashboard/ # Dashboard principal
│ │ ├── transactions/ # Gestão de transações
│ │ ├── accounts/ # Gestão de contas
│ │ ├── budgets/ # Orçamentos
│ │ ├── goals/ # Metas financeiras
│ │ ├── reports/ # Relatórios
│ │ ├── notifications/ # Central de notificações
│ │ ├── settings/ # Configurações
│ │ └── layout.tsx # Layout dashboard (sidebar, header)
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Landing page
│ ├── providers.tsx # React Query, Theme providers
│ └── globals.css # Estilos globais + Tailwind
│
├── components/ # Componentes React
│ ├── ui/ # shadcn/ui components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ └── ...
│ ├── forms/ # Componentes de formulário
│ │ ├── transaction-form.tsx
│ │ ├── account-form.tsx
│ │ └── ...
│ ├── charts/ # Componentes de gráficos
│ │ ├── balance-chart.tsx
│ │ ├── category-pie-chart.tsx
│ │ └── ...
│ ├── layouts/ # Componentes de layout
│ │ ├── sidebar.tsx
│ │ ├── header.tsx
│ │ ├── mobile-nav.tsx
│ │ └── ...
│ └── shared/ # Componentes compartilhados
│ ├── kpi-card.tsx
│ ├── empty-state.tsx
│ ├── loading-skeleton.tsx
│ └── ...
│
├── lib/ # Bibliotecas e utilidades
│ ├── api/ # Cliente API
│ │ ├── client.ts # Axios configurado
│ │ ├── endpoints.ts # Mapa de endpoints
│ │ └── queries.ts # Query keys do React Query
│ ├── hooks/ # Custom React Hooks
│ │ ├── useAuth.ts
│ │ ├── useTransactions.ts
│ │ ├── useAccounts.ts
│ │ ├── useReports.ts
│ │ └── ...
│ ├── utils/ # Funções utilitárias
│ │ ├── format.ts # Formatação (moeda, data)
│ │ ├── cn.ts # clsx + tailwind-merge
│ │ └── constants.ts # Constantes da app
│ └── validations/ # Schemas Zod
│ ├── auth.ts
│ ├── transaction.ts
│ └── ...
│
├── store/ # Zustand stores
│ ├── auth-store.ts
│ ├── ui-store.ts
│ └── ...
│
├── types/ # TypeScript types
│ ├── api.ts # Tipos da API
│ ├── entities.ts # Entidades do domínio
│ └── index.ts
│
└── styles/ # Estilos adicionais
└── globals.css

---

## 🎨 Design System

### Paleta de Cores
/* Light Mode /
--primary: #6366F1 / Índigo /
--secondary: #8B5CF6 / Violeta /
--success: #10B981 / Verde /
--warning: #F59E0B / Âmbar /
--danger: #EF4444 / Vermelho /
--muted: #64748B / Slate */

/* Dark Mode /
--primary: #818CF8
--secondary: #A78BFA
/ ... ajustes para dark */

### Tipografia

- **Headings:** Inter (font-sans)
- **Body:** Inter
- **Mono:** JetBrains Mono (números, códigos)

### Componentes Principais

| Componente           | Descrição                             |
| -------------------- | ------------------------------------- |
| `KpiCard`            | Card de métricas com ícone e trend    |
| `TransactionItem`    | Item de lista de transação            |
| `CategoryBadge`      | Badge colorido de categoria           |
| `BalanceChart`       | Gráfico de área de receitas/despesas  |
| `CategoryPieChart`   | Pizza chart de distribuição           |
| `AccountCard`        | Card visual de conta bancária         |
| `NotificationItem`   | Item de notificação com ícone         |
| `EmptyState`         | Estado vazio com ilustração           |
| `LoadingSkeleton`    | Skeleton loader para estados loading  |

---

## 🔌 Integração com Backend

### Configuração da API

O cliente API está em `lib/api/client.ts`:

import axios from 'axios';

export const api = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_URL,
headers: {
'Content-Type': 'application/json',
},
});

// Interceptor de autenticação
api.interceptors.request.use((config) => {
const token = localStorage.getItem('accessToken');
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
});

// Interceptor de refresh token
api.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;
if (error.response?.status === 401 && !originalRequest._retry) {
  originalRequest._retry = true;
  
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        { refreshToken }
      );
      
      localStorage.setItem('accessToken', data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      
      return api.request(originalRequest);
    } catch (refreshError) {
      localStorage.clear();
      window.location.href = '/login';
    }
  }
}

return Promise.reject(error);

### Hooks de API

Exemplo de hook customizado (`lib/hooks/useTransactions.ts`):

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { queryKeys } from '@/lib/api/queries';
import { toast } from 'sonner';

export function useTransactions(filters?: TransactionFilters) {
return useQuery({
queryKey: queryKeys.transactions.list(filters),
queryFn: async () => {
const { data } = await api.get('/transactions', { params: filters });
return data;
},
});
}

export function useCreateTransaction() {
const queryClient = useQueryClient();

return useMutation({
mutationFn: async (transaction: CreateTransactionDto) => {
const { data } = await api.post('/transactions', transaction);
return data;
},
onSuccess: () => {
queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
queryClient.invalidateQueries({ queryKey: queryKeys.reports.dashboard() });
toast.success('Transação criada com sucesso!');
},
onError: (error: any) => {
toast.error(error.response?.data?.message || 'Erro ao criar transação');
},
});
}

---

## 🧪 Testes

Testes unitários (componentes)
npm run test

Testes E2E com Playwright
npm run test:e2e

Coverage
npm run test:coverage

---

## 🚀 Build e Deploy

### Build Local

Build otimizado para produção
npm run build

Analisar bundle size
npm run analyze

Servir build localmente
npm run start

### Deploy na Vercel (Recomendado)

O Next.js 15 tem integração nativa com Vercel:

1. **Push para GitHub**

git add .
git commit -m "feat: Initial commit"
git push origin main

2. **Importar no Vercel**
- Acesse [vercel.com/new](https://vercel.com/new)
- Importe seu repositório
- Configure variáveis de ambiente:
  - `NEXT_PUBLIC_API_URL`
- Deploy automático! 🚀

3. **Domain customizado (opcional)**
- Vá em Settings → Domains
- Adicione `app.miucontrole.com`

### Deploy em VPS (Docker)

**Dockerfile:**

FROM node:20-alpine AS base

Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

**docker-compose.yml:**

version: '3.8'

services:
frontend:
build: .
ports:
- "3000:3000"
environment:
- NEXT_PUBLIC_API_URL=https://api.miucontrole.com
restart: unless-stopped

**Executar:**

docker-compose up -d

### Deploy estático (Netlify, Cloudflare Pages)

Build estático (se configurado output: 'export')
npm run build

Pasta 'out/' será gerada
Upload para Netlify/Cloudflare

---

## ⚡ Performance

### Métricas Alvo (Lighthouse)

- ✅ Performance: **>90**
- ✅ Accessibility: **>95**
- ✅ Best Practices: **>95**
- ✅ SEO: **>95**

### Otimizações Implementadas

1. **Server Components** - Renderização no servidor por padrão
2. **Lazy Loading** - Componentes pesados carregados sob demanda
3. **Image Optimization** - next/image com blur placeholder
4. **Code Splitting** - Bundle dividido automaticamente por rota
5. **React Query Cache** - Dados em cache para reduzir requisições
6. **Memoization** - React.memo em componentes custosos
7. **Virtual Scrolling** - Para listas longas (>500 itens)
8. **Web Vitals** - Monitoramento de LCP, FID, CLS

### Bundle Size

Route (app) Size First Load JS
┌ ○ / 137 B 87.2 kB
├ ○ /_not-found 871 B 87.9 kB
├ ƒ /dashboard 15.4 kB 102.6 kB
├ ƒ /transactions 18.2 kB 105.4 kB
└ ƒ /accounts 12.1 kB 99.3 kB

○ (Static) automatically rendered as static HTML
ƒ (Dynamic) server-rendered on demand

---

## 🎨 Customização

### Temas

Edite `tailwind.config.ts` para customizar cores:

export default {
theme: {
extend: {
colors: {
primary: {
DEFAULT: '#6366F1',
foreground: '#FFFFFF',
},
// ... suas cores
},
},
},
};

### Componentes shadcn/ui

Adicione novos componentes:

npx shadcn-ui@latest add calendar date-picker

Customize em `components/ui/`.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Padrão de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

feat: Nova funcionalidade
fix: Correção de bug
docs: Documentação
style: Formatação (não afeta código)
refactor: Refatoração
perf: Melhoria de performance
test: Testes
chore: Tarefas gerais

### Code Style

Lint
npm run lint

Format
npm run format

Type check
npm run type-check

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🐛 Troubleshooting

### Erro: "Module not found"

Limpar cache e reinstalar
rm -rf node_modules .next
npm install

### Erro: "Hydration failed"

Provavelmente você está usando `localStorage` em Server Component. Use `'use client'` no topo do arquivo.

### Build falha no Vercel

Verifique variáveis de ambiente em Settings → Environment Variables.

### CORS error

Verifique se `FRONTEND_URL` está configurado no backend (`backend/.env`):

FRONTEND_URL=http://localhost:3000,https://app.miucontrole.com


---

## 📚 Recursos

### Documentação

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/)

### Tutoriais

- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [React Query Essentials](https://ui.dev/c/react-query)
- [Tailwind CSS for Beginners](https://tailwindcss.com/docs/utility-first)

---

## 👨‍💻 Autor

<div align="center">

**Rafael Degolin**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rafadegolin)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafaeldegolin/)

</div>

---

## 🙏 Agradecimentos

- **Vercel** pelo Next.js incrível
- **shadcn** pelos componentes lindos
- **TanStack** pela melhor lib de data fetching
- **Comunidade React** pelo suporte

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão?

👉 [Abra uma issue](https://github.com/Rafadegolin/miu-controle-frontend/issues)

---

## 🗺️ Roadmap

### Milestone 1 - MVP (✅ Completo)
- [x] Setup Next.js 15 + Tailwind v4
- [x] Autenticação (login, registro)
- [x] Dashboard com KPIs
- [x] CRUD de Transações
- [x] Gestão de Contas
- [x] Notificações In-App
- [x] Dark Mode

### Milestone 2 - Features Avançadas (🚧 Em andamento)
- [ ] Orçamentos com alertas visuais
- [ ] Metas financeiras com progresso
- [ ] Relatórios avançados (gráficos customizados)
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Filtros avançados de transações
- [ ] PWA completo

### Milestone 3 - Otimizações (📋 Planejado)
- [ ] Categorização por IA
- [ ] WebSockets para sync em tempo real
- [ ] Testes E2E completos
- [ ] Análise preditiva de gastos
- [ ] Atalhos de teclado (Cmd+K)
- [ ] Onboarding interativo

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Feito com ❤️ e ☕ por [Rafael Degolin](https://github.com/Rafadegolin)

![Views](https://komarev.com/ghpvc/?username=rafadegolin-miu-controle&color=6366F1)

</div>
