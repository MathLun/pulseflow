

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

## Health Check

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

| **Variavel** | **Padrão** |
|--------------|------------|
| HOST         | 127.0.0.1  |
| PORT         | 3333       |

## Status Atual

- [x] Workspace
- [x] TypeScript
- [x] Scripts Dev
- [x] Scripts Build
- [x] Scripts Start
- [x] Fastify
- [x] Health Check
- [x] Integration Tests
- [x] Configuration Module
- [x] Store Domain
- [x] Store Repository
- [x] Create Store Use Case
- [x] List Stores Use Case
- [x] Store Routes
- [x] Store Route Tests
