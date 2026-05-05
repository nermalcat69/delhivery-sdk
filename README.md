# Delhivery SDK Monorepo

TypeScript SDK + documentation website for the [Delhivery B2C API](https://one.delhivery.com/developer-portal).

**Docs → [delhivery-sdk.github.io](https://delhivery-sdk.github.io)**

## Packages

| Package | Description |
|---|---|
| [`packages/sdk`](./packages/sdk) | `@delhivery-sdk/client` — TypeScript SDK |
| [`apps/docs`](./apps/docs) | Docusaurus documentation site |

## Development

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9 (`npm i -g pnpm`)

### Setup

```bash
pnpm install
```

### Develop docs locally

```bash
pnpm dev
# → http://localhost:3000
```

### Build SDK

```bash
pnpm --filter @delhivery-sdk/client build
```

### Build docs

```bash
pnpm --filter docs build
```

### Typecheck everything

```bash
pnpm typecheck
```

## Deployment

Docs are automatically deployed to [delhivery-sdk.github.io](https://delhivery-sdk.github.io) via GitHub Actions on every push to `main` that touches `apps/docs/` or `packages/sdk/src/`.

### GitHub Pages setup (one-time)

1. Go to repo **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. The next push to `main` will trigger a deploy

## License

MIT
