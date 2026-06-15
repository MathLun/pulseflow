

# PulseFlow API

Backend principal do PulseFlow.

## Requisitos

- Node.js 20+
- PNPM

## Desenvolvimento

Executar em modo watch:

```bash
$ pnpm --filter @pulseflow/api dev
```

## Build

Gerar build da aplicação:

```bash
$ pnpm --filter @pulseflow/api build
```

## Produção

Executar build gerada:

```bash
$ pnpm --filter @pulseflow/api start
```

## Testes

Executar todos os testes:

```bash
$ pnpm --filter @pulseflow/api test
```

Executar em modo watch:

```bash
$ pnpm --filter @pulseflow/api test:watch
```

## Runtime

Servidor Local:

```text
🚀 PulseFlow API Runtime
🌐 Link de Acesso: http://localhost:3333
```

## Endpoints

### Health Check

Verificar status da API

```text
GET /health
```

Exemplo:

```bash
$ curl http://localhost:3333
```

Resposta:

```json
{
  "status": "ok"
}
```

### Store Module

**Create Store**

```text
POST /stores
```

Request:

```json
{
  "name": "Store 1"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "Store 1",
  "createdAt": "2026-06-12T:00:00:00Z"
}
```
---

**List Stores**

```text
GET /stores
```

Response:

```json
[
 {
   "id": "uuid",
   "name": "Store 1",
   "createdAt": "2026-06-12T00:00:00Z"
 }
]
```

---

**Find Store By Id**

```text
GET /stores/:id
```

Response:

```json
{
  "id": "uuid",
  "name": "Store 1",
  "createdAt": "2026-06-12T00:00:00Z"
}
```

## Error Handling

- The API uses a global exception handler to provide consistent HTTP responses.

### Validation Error

Request:

```text
POST /stores
```

```json
{
  "name": ""
}
```

Response:

```json
{
  "message": "Store name is required"
}
```

Status Code

```text
400 Bad Request
```

### Resource Not Found

Request:

```text
GET /stores/invalid-id
```

Response:

```json
{
  "message": "Store not found"
}
```

Status Code

```text
404 Not Found
```

## Deployment

### Render

Build Command:

```bash
$ pnpm install --frozen-lockfile && pnpm run build:api
```

Start Command:

```bash
$ pnpm run start:api
```

Environment Variables:

| **Variavel** | **Descrição** |
|---‐----------|---------------|
| HOST         | Server host   |
| PORT         | Provided automatically by render |

## Estrutura

```
src/
├── index.ts
```

## Configuração

A aplicação utiliza uma camada centralizada para gerenciamento de configurações.

Arquivo:

```text
src/config/env.ts
```

Configurações atuais:

| **Variavel** | **Descrição** | **Padrão** |
|--------------|---------------|------------|
| HOST         | Server Host   | 127.0.0.1  |
| PORT         | Server Port   | 3333       |

Para deploy, crie o arquivo:

```text
.env
```

## Status Atual

- [x] Workspace
- [x] TypeScript
- [x] Scripts Dev
- [x] Scripts Build
- [x] Scripts Start
- [x] Fastify
- [x] Health Check
- [x] Unit Tests
- [x] Integration Tests
- [x] Configuration Module
- [x] Store Domain
- [x] Store Repository
- [x] Create Store Use Case
- [x] List Stores Use Case
- [x] Find Store By Id Use Case
- [x] Store HTTP Routes
- [x] Store Route Tests
- [x] Global Exception Handling
- [x] GitHub Actions CI
- [x] Environment Variables
- [x] Render Deploy
