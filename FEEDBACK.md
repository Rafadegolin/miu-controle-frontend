# 🗣️ Feedback & Suporte - Documentação Técnica

O módulo de Feedback permite que usuários enviem reportes de bugs, sugestões ou elogios diretamente pelo aplicativo. Administradores podem visualizar, responder e alterar o status desses tickets.

**Controller**: `FeedbackController` (`/feedback`)
**Service**: `FeedbackService`
**Entidade**: `Feedback`

---

## 1. Fluxo de Vida

1.  **Criação**: Usuário envia feedback (`PENDING`).
2.  **Triagem**: Admin lê e altera status:
    - `IN_PROGRESS`: Estamos analisando/corrigindo.
    - `RESOLVED`: Resolvido ou implementado.
    - `REJECTED`: Não será feito ou não é um bug.
3.  **Resposta**: Admin pode adicionar uma `adminResponse` explicativa.

---

## 2. Endpoints

### 2.1 Usuário
- **Enviar Feedback**: `POST /feedback`
    ```json
    {
      "type": "BUG", // ou SUGGESTION, OTHER
      "title": "Erro ao salvar transação",
      "description": "Ao clicar em salvar...",
      "attachments": ["url-imagem-1", "url-imagem-2"]
    }
    ```
- **Meus Feedbacks**: `GET /feedback/me`
    - Retorna histórico de tickets do usuário para acompanhamento.

### 2.2 Admin
- **Listar Todos**: `GET /feedback/admin/all`
    - Filtros: `?status=PENDING&type=BUG`
- **Atualizar/Responder**: `PATCH /feedback/admin/:id`
    ```json
    {
      "status": "RESOLVED",
      "adminResponse": "Corrigido na versão 1.5.2. Obrigado!"
    }
    ```

---

## 3. Integração com Frontend

Recomenda-se permitir attach de screenshots (URLs via módulo de Upload) e seleção clara do tipo de feedback para facilitar a triagem.
