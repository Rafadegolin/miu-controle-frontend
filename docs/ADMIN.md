# 🛡️ Administração (Admin) - Documentação Técnica

O módulo de Administração centraliza ferramentas para gestão do sistema, monitoramento técnico e controle de usuários. O acesso é restrito a usuários com `Role.ADMIN`.

**Controller**: `AdminController` (`src/admin`) e `UsersController` (rotas `/users/admin`).
**Security**: Todas as rotas são protegidas por `JwtAuthGuard`, `RolesGuard` e `@Roles(Role.ADMIN)`.

---

## 1. Monitoramento Técnico

Ferramentas para devops e suporte monitorarem a saúde da API.

### 1.1 Cache (Redis)
- **Estatísticas**: `GET /admin/cache-stats`
    - Retorna `hits`, `misses` e `hitRate`. Útil para verificar eficiência.
- **Reset**: `POST /admin/cache-reset`
    - Zera os contadores (não limpa chaves, apenas stats).

### 1.2 Banco de Dados
- **Slow Queries**: `GET /admin/slow-queries`
    - Retorna as últimas 100 queries que demoraram mais de 200ms.
    - Ajuda a identificar gargalos de performance sem acesso direto ao servidor.

### 1.3 Dashboard Geral
- **Stats**: `GET /admin/dashboard/stats`
    - Visão macro do sistema:
        - Total de Usuários / Usuários Ativos.
        - Assinaturas Ativas.
        - Volume de Transações.

---

## 2. Gestão de Usuários

Funcionalidades localizadas no `UsersController`, segregadas pelo prefixo `/users/admin`.

- **Listagem**: `GET /users/admin/list`
    - Paginação e busca por nome/email.
- **Banimento**: `PATCH /users/admin/:id/ban`
    - Body: `{ "isActive": false }`. Bloqueia login imediato.
- **Promover/Rebaixar**: `PATCH /users/admin/:id/role`
    - Body: `{ "role": "ADMIN" }` ou `{ "role": "USER" }`.

---

## 3. Gestão de Conteúdo

O Admin também gerencia módulos de engajamento (documentados separadamente):

- **Release Notes**: Publicar changelogs (`POST /release-notes`).
- **Feedback**: Responder tickets de usuários (`PATCH /feedback/admin/:id`).
- **Gamification**: Criar missões globais (`POST /gamification/admin/missions`).

---

## 4. Segurança

Para se tornar um Admin, é necessário um **Seed** inicial no banco ou acesso direto ao banco de dados para alterar a role do primeiro usuário, já que não existe rota pública de "Sign up as Admin".
