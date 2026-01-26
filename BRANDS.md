# 🏷️ Sistema de Marcas (Brands) - Documentação Técnica

O sistema de Marcas e Logotipos (`Brands`) serve serve para enriquecer a interface do usuário, substituindo descrições genéricas de transações (ex: "UBER *TRIP 1234") por identidades visuais bonitas e nomes limpos (ex: ícone da Uber e nome "Uber").

**Controller**: `BrandsController` (`/brands`)
**Service**: `BrandsService`
**Entidade**: `Brand` (Prisma)

---

## 1. Funcionamento

Cada Marca (`Brand`) no banco de dados possui:
- **Nome**: Nome de exibição (ex: "Netflix").
- **Slug**: Identificador único (ex: "netflix").
- **Logo URL**: Link para a imagem do ícone (redondo/quadrado).
- **Match Patterns**: Lista de strings usadas para detectar a marca na descrição da transação bancária.
- **Website**: Usado para buscar logos automaticamente via APIs externas (ex: Clearbit) se necessário.

### Detecção Automática
Quando uma transação é criada ou importada (Open Finance/CSV), o sistema varre a descrição original em busca de `matchPatterns`.
- Exemplo: Se a descrição for `"PG *IFOOD AGENCIA DE REST"`, e a marca `iFood` tiver o pattern `"ifood"`, o sistema associa automaticamente o `brandId` e `logoUrl` à transação.

---

## 2. Endpoints (Gestão)

A gestão de marcas é restrita a **Administradores** (`Role.ADMIN`).

### 2.1 CRUD Básico
- **Listar Todas**: `GET /brands` (Público/Autenticado) - Retorna lista ordenada por nome.
- **Criar**: `POST /brands`
    ```json
    {
      "name": "Amazon",
      "slug": "amazon",
      "website": "amazon.com.br",
      "matchPatterns": ["amazon", "amzn", "kindle"]
    }
    ```
- **Atualizar**: `PATCH /brands/:id`
- **Deletar**: `DELETE /brands/:id`

### 2.2 Gestão de Imagens
- **Upload de Logo**: `POST /brands/:id/logo`
    - Form-Data: `file` (Imagem PNG/JPG/WEBP, máx 5MB).
    - Salva no diretório `uploads/logos/brand-logos/`.
    - Atualiza a URL automaticamente no banco.

### 2.3 Ferramentas
- **Testar Padrão**: `POST /brands/check-pattern`
    - Body: `{ "pattern": "uber", "text": "UBER TRIP SAO PAULO" }`
    - Retorna se houve match ou não. Útil para admins testarem novas regras antes de salvar.

---

## 3. Seed e Dados Iniciais

O sistema já vem populado (`prisma/seed.ts`) com as principais marcas do mercado brasileiro e internacional, incluindo:
- **Serviços**: Uber, 99, iFood, Rappi.
- **Streaming**: Netflix, Spotify, Steam.
- **Bancos**: Nubank, Itaú.
- **Varejo**: Amazon, Mercado Livre, Apple, Google.

---

## 4. Integração Frontend

No frontend, ao renderizar uma lista de transações:
1. Verifique se `transaction.brand` existe.
2. Se sim, exiba `transaction.brand.logoUrl` e `transaction.brand.name`.
3. Se não, exiba um ícone genérico baseado na `category.icon`.
