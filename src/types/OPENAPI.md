# Tipos gerados do backend (openapi-typescript)

O backend expõe o contrato da API em `docs/handoff/openapi.json` (gerado via
`npm run openapi:export` no repo do backend, com o Postgres no ar). A partir dele
geramos tipos TypeScript automaticamente, para reduzir divergência entre o que o
backend retorna e o que o front espera.

## Como gerar

Pré-requisito: ter o repo do backend como **irmão** deste (mesmo diretório pai) com
o `openapi.json` **atualizado** (com os response schemas preenchidos):

```
Projetos/
  miu-controle-frontend/   ← você está aqui
  miu-controle-backend/docs/handoff/openapi.json
```

Então:

```bash
npm run gen:api-types
```

Isso gera **`src/types/openapi.d.ts`** (arquivo gerado — não editar à mão).
Ajuste o caminho de origem no script `gen:api-types` do `package.json` se o
`openapi.json` vier de outro lugar (cópia versionada, artefato de CI, etc.).

## Por que NÃO sobrescreve `src/types/api.ts`

`src/types/api.ts` são os tipos escritos à mão que **todo o app importa hoje**
(`import { Transaction } from "@/types/api"`). O `openapi-typescript` gera uma
estrutura diferente (`paths`/`components["schemas"][...]`), então sobrescrever
`api.ts` quebraria todos os imports de uma vez.

Por isso geramos para um arquivo **separado** (`openapi.d.ts`) e a migração é
**incremental**: conforme cada domínio for validado, trocamos o tipo manual por um
alias do gerado, por exemplo:

```ts
// em api.ts, futuramente:
import type { components } from "./openapi";
export type Transaction = components["schemas"]["TransactionItemDto"];
```

Assim os imports existentes continuam funcionando enquanto a fonte da verdade passa
a ser o contrato do backend.
