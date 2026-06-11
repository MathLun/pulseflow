

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

## Status Atual

- [x] Workspace
- [x] TypeScript
- [x] Scripts Dev
- [x] Scripts Build
- [x] Scripts Start
- [x] Fastify
- [x] Health Check
- [x] Integration Tests
