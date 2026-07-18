# 🚀 Plano de Implementação - Integração Backend Miu Controle

**Base URL da API:** `https://api.miucontrole.com.br`  
**Documentação Swagger:** `https://api.miucontrole.com.br/api/docs`

## 📌 Abordagem Incremental

Desenvolvimento em fases: **Implementar → Testar → Atualizar Documentação → Próxima Fase**

---

## 🔐 FASE 1: Autenticação (EM PROGRESSO)

### Configuração de Ambiente

**Arquivo:** `.env.local`
```env
NEXT_PUBLIC_API_URL=https://api.miucontrole.com.br
```

### Endpoints da API Real

- `POST /auth/register` - Criar conta
- `POST /auth/login` - Login
- `GET /auth/me` - Obter usuário logado
- `POST /auth/logout` - Logout
- `POST /auth/forgot-password` - Esqueci senha
- `POST /auth/reset-password` - Redefinir senha
- `POST /auth/verify-email` - Verificar email
- `GET /auth/sessions` - Listar sessões ativas

### Validação de Senha Forte

```typescript
const validatePassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[@$!%*?&]/.test(password);
  return minLength && hasUpper && hasLower && hasNumber && hasSymbol;
};
```

### Tratamento de Erros

```typescript
catch (error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    
    switch (status) {
      case 400: return message || 'Dados inválidos';
      case 401: return 'Email ou senha incorretos';
      case 409: return 'Email já cadastrado';
      default: return 'Erro ao processar solicitação';
    }
  }
}
```

---

## 👤 FASE 2: Gerenciamento de Usuário

### Endpoints

- `GET /users/me` - Obter perfil
- `PATCH /users/me` - Atualizar perfil
- `POST /users/me/avatar` - Upload avatar
- `DELETE /users/me/avatar` - Remover avatar
- `PATCH /users/me/password` - Trocar senha
- `DELETE /users/me` - Deletar conta

---

## 🏦 FASE 3: Contas Bancárias

### React Query Hooks

```typescript
export function useAccounts(activeOnly = true) {
  return useQuery({
    queryKey: ['accounts', activeOnly],
    queryFn: () => api.getAccounts(activeOnly),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}
```

### Endpoints

- `GET /accounts` - Listar contas
- `GET /accounts/balance` - Saldo total
- `POST /accounts` - Criar conta
- `PATCH /accounts/{id}` - Atualizar
- `DELETE /accounts/{id}` - Desativar

---

## 📁 FASE 4: Categorias

### Endpoints

- `GET /categories` - Listar
- `POST /categories` - Criar
- `PATCH /categories/{id}` - Atualizar
- `DELETE /categories/{id}` - Deletar
- `GET /categories/{id}/stats` - Estatísticas

---

## 💰 FASE 5: Transações

### Paginação

```typescript
export function useTransactions(filters?: TransactionFilters) {
  return useInfiniteQuery({
    queryKey: ['transactions', filters],
    queryFn: ({ pageParam = 1 }) =>
      api.getTransactions({ ...filters, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
```

### Endpoints

- `GET /transactions` - Listar (paginado)
- `POST /transactions` - Criar
- `PATCH /transactions/{id}` - Atualizar
- `DELETE /transactions/{id}` - Deletar
- `GET /transactions/stats/monthly` - Estatísticas

---

## 💵 FASE 6: Orçamentos

### Endpoints

- `GET /budgets` - Listar
- `GET /budgets/summary` - Resumo mensal
- `POST /budgets` - Criar
- `GET /budgets/{id}/status` - Status do orçamento

---

## 🎯 FASE 7: Objetivos/Metas

### Recursos Especiais

- Upload de imagem do objetivo
- Links de compra vinculados
- Contribuições e retiradas

### Endpoints

- `GET /goals` - Listar
- `POST /goals` - Criar
- `POST /goals/{id}/contribute` - Contribuir
- `POST /goals/{id}/image` - Upload imagem
- `POST /goals/{id}/purchase-links` - Adicionar link

---

## 📊 FASE 8: Relatórios

### Endpoints

- `GET /reports/dashboard` - Dashboard completo
- `GET /reports/category-analysis` - Análise por categoria
- `GET /reports/monthly-trend` - Tendência mensal
- `GET /reports/insights` - Insights automáticos

---

## 🔔 FASE 9: Notificações

### Endpoints

- `GET /notifications` - Listar
- `GET /notifications/unread-count` - Contador
- `POST /notifications/mark-all-as-read` - Marcar lidas

---

## 💱 FASE 10-13: Moedas, Câmbio, Exportação e Recorrentes

Implementação conforme necessário após fases principais.

---

## 🧪 Testes por Fase

### Teste Manual - Autenticação

1. Registrar novo usuário com senha forte
2. Fazer login
3. Verificar token salvo no localStorage
4. Recarregar página - deve manter sessão
5. Fazer logout - deve limpar tokens

### Teste Manual - Contas e Transações

1. Criar conta bancária
2. Verificar saldo inicial
3. Criar transação de despesa
4. Verificar atualização do saldo

---

## 📝 Progresso Atual

**Status:** Iniciando Fase 1 - Configuração de Ambiente

**Próximos passos:**
1. ✅ Configurar `.env.local` com URL da API
2. ⏳ Validar conexão com backend
3. ⏳ Implementar formulário de registro
4. ⏳ Implementar formulário de login
5. ⏳ Testar autenticação completa
