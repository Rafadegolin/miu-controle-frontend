# 📝 Notas de Atualização (Release Notes) - Documentação Técnica

O módulo `Release Notes` permite que administradores publiquem novidades sobre o sistema (changelog) e que os usuários as visualizem e marquem como lidas. O sistema rastreia quais usuários já leram quais notas para exibir contadores de "novidades não lidas".

**Controller**: `ReleaseNotesController` (`/release-notes`)
**Service**: `ReleaseNotesService`
**Entidade**: `ReleaseNote` e `UserReleaseRead`

---

## 1. Funcionamento

- **Admin**: Cria notas com versão, título e conteúdo (Markdown/HTML).
- **Usuário**: Recebe apenas notas ativas. O sistema calcula a diferença entre todas as notas ativas e as que o usuário já marcou como lida (`UserReleaseRead`).

---

## 2. Endpoints

### 2.1 Administrativo (Admin)
- **Criar Nota**: `POST /release-notes`
    ```json
    {
      "version": "1.5.0",
      "title": "Novos Gráficos de IA",
      "content": "Agora você pode ver projeções...",
      "isActive": true
    }
    ```
- **Listar Todas**: `GET /release-notes/all` (Retorna tudo, inclusive inativas).

### 2.2 Usuário
- **Listar Pendentes**: `GET /release-notes/pending`
    - Retorna apenas as notas que o usuário **ainda não leu**.
    - Útil para exibir um modal "O que há de novo?" logo após o login.
- **Marcar como Lida**: `POST /release-notes/:id/read`
    - Cria um registro na tabela pivot `UserReleaseRead`, impedindo que essa nota apareça novamente na lista de pendentes.

---

## 3. Modelo de Dados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `version` | String | Ex: "1.0.0" |
| `title` | String | Título curto. |
| `content` | String | Texto longo (suporta formatação). |
| `publishedAt` | DateTime | Data de exibição. |
| `isActive` | Boolean | Se deve ser mostrada aos usuários. |

A tabela `UserReleaseRead` armazena apenas `userId` e `releaseNoteId`, servindo como recibo de leitura.
