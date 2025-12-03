# Miu Controle - Sistema de Controle Financeiro Inteligente

Sistema completo de controle financeiro pessoal com IA, desenvolvido com Next.js 16, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Funcionalidades

### Landing Page (Pública)

- Hero section com animação interativa
- Demonstração do produto em tempo real
- Seções de recursos, preços e FAQ
- Design responsivo e moderno

### Sistema de Autenticação

- **Rotas Públicas:** `/`, `/login`, `/register`
- **Rotas Privadas:** `/dashboard/*` (requer autenticação)

### Dashboard Completo

- **Visão Geral:** Gráficos, KPIs, orçamento mensal
- **Transações:** Listagem com filtros e busca
- **Relatórios:** Gráficos avançados e insights
- **Investimentos:** Portfólio e sugestões IA
- **Metas:** Objetivos financeiros gamificados
- **Conexões:** Open Finance e automações
- **Perfil & Configurações**

## 🛠️ Tecnologias

- Next.js 16 + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Context API

## 📦 Estrutura

```
src/
├── app/
│   ├── page.tsx                # Landing page
│   ├── login/                  # Autenticação
│   ├── register/
│   └── dashboard/              # Área privada
├── components/
│   ├── ui/                     # Componentes base
│   ├── dashboard/              # Componentes do dashboard
│   └── landing/                # Componentes da landing
├── contexts/                   # State management
├── lib/                        # Utilitários e constantes
└── types/                      # TypeScript types
```

## 🚦 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build produção
npm run build
npm start
```

Acesse: http://localhost:3000

## 🎨 Design Tokens

```typescript
{
  primary: '#00404f',    // Dark Teal
  secondary: '#3c88a0',  // Teal Médio
  accent: '#7cddb1',     // Mint
  success: '#007459',    // Verde
  expense: '#ff6b6b',    // Vermelho
  warning: '#ffd166'     // Amarelo
}
```

## 🔐 Autenticação

Sistema mockado (qualquer email/senha funciona). Para produção, integrar com API real editando `src/contexts/AuthContext.tsx`.

## 📱 Responsividade

- Desktop: Sidebar fixa
- Mobile: Bottom navigation

## 🎯 Próximos Passos

- Integração backend
- Open Finance real
- Notificações push
- Modo escuro
- Exportação relatórios
