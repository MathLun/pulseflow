

# PulseFlow API

Backend principal do PulseFlow.

## Requisitos

- Node.js 20+
- PNPM

## Desenvolvimento (Runtime)

Executar em modo watch:

```bash
$ pnpm --filter @pulseflow/api dev
```

Servidor:

```bash
🚀 PulseFlow API Runtime
🌐 Link de Acesso: http://localhost:3333
```

## Build

Gerar build da aplicação:

```bash
$ pnpm --filter @pulseflow/api build
```

## Produção

Executar build gerada:

```bash
pnpm --filter @pulseflow/api start
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
- [ ] Health Check
