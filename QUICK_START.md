# ⚡ Quick Start - Miu Controle

## 🚀 Servidor já está rodando!

**URL:** http://localhost:3000

---

## 🔑 Login Rápido

> **Nota:** Sistema com autenticação mockada. Qualquer email/senha funciona!

### Teste rápido:

- **Email:** rafael@miu.app
- **Senha:** qualquer coisa

---

## 📍 Links Rápidos

| Página            | URL                                          |
| ----------------- | -------------------------------------------- |
| 🏠 Home (Landing) | http://localhost:3000                        |
| 🔐 Login          | http://localhost:3000/login                  |
| ✍️ Registro       | http://localhost:3000/register               |
| 📊 Dashboard      | http://localhost:3000/dashboard              |
| 💰 Transações     | http://localhost:3000/dashboard/transactions |
| 📈 Relatórios     | http://localhost:3000/dashboard/reports      |
| 🎯 Metas          | http://localhost:3000/dashboard/goals        |
| 💎 Investimentos  | http://localhost:3000/dashboard/investments  |
| 🔗 Conexões       | http://localhost:3000/dashboard/sync         |
| 👤 Perfil         | http://localhost:3000/dashboard/profile      |
| ⚙️ Configurações  | http://localhost:3000/dashboard/settings     |

---

## 🎨 Funcionalidades Implementadas

✅ Landing page completa com animações  
✅ Sistema de login/registro  
✅ Dashboard interativo  
✅ Gráficos e visualizações (Recharts)  
✅ Animações fluidas (Framer Motion)  
✅ Proteção de rotas privadas  
✅ Design responsivo (mobile + desktop)  
✅ Bottom navigation mobile  
✅ Sidebar colapsável  
✅ Context API para autenticação  
✅ TypeScript em todo o projeto  
✅ Tailwind CSS customizado

---

## 📁 Arquivos Importantes

```
src/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── login/page.tsx        ← Login
│   ├── register/page.tsx     ← Registro
│   └── dashboard/            ← Todas as páginas do dashboard
├── components/
│   ├── ui/                   ← Button, Card
│   ├── dashboard/            ← Sidebar, BalanceRing, etc
│   └── landing/              ← HeroAnimation
├── contexts/
│   └── AuthContext.tsx       ← Sistema de autenticação
└── lib/
    └── constants.ts          ← Dados mockados
```

---

## 🛑 Como Parar o Servidor

No terminal onde está rodando, pressione: **Ctrl + C**

## 🔄 Como Reiniciar

```bash
npm run dev
```

---

## 📝 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start

# Verificar erros TypeScript
npm run build
```

---

## 🎯 Fluxo de Uso Recomendado

1. **Abra:** http://localhost:3000
2. **Explore** a landing page (scroll completo)
3. **Clique** em "Começar Grátis" ou "Entrar"
4. **Preencha** qualquer email/senha
5. **Navegue** pelo dashboard usando o menu lateral
6. **Teste** em mobile (responsivo)

---

## 💡 Dicas

- Pressione **F12** para ver console e debug
- Edite arquivos - hot reload automático
- Mobile: reduza janela do navegador para ver bottom nav
- Todos os dados são mockados (localStorage)

---

## ✅ Tudo Pronto!

O projeto está **100% funcional** e pronto para uso!

Próximo passo: Integrar com backend real 🚀
