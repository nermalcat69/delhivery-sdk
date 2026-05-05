# Contributing

## Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9 (`npm i -g pnpm`)

## Setup

```bash
pnpm install
```

## Development

```bash
# Run docs locally
pnpm dev
# → http://localhost:3000

# Build SDK
pnpm --filter delhivery-sdk build

# Build docs
pnpm --filter docs build

# Typecheck everything
pnpm typecheck
```

## Deployment

Docs deploy automatically to [delhivery-sdk.pages.dev](https://delhivery-sdk.pages.dev) via GitHub Actions on every push to `main` that touches `apps/docs/` or `packages/sdk/src/`.

### Cloudflare Pages setup (one-time)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project** → **Connect to Git**
2. Select this repository, then set:
   - **Build command**: `pnpm --filter docs build`
   - **Build output directory**: `apps/docs/build`
   - **Root directory**: `/`
3. Add these **Environment variables** (Settings → Environment Variables):
   - `DOCS_URL` = `https://delhivery-sdk.pages.dev` (or your custom domain)
4. Add these **GitHub Actions secrets** (repo Settings → Secrets → Actions):
   - `CLOUDFLARE_API_TOKEN` — create at Cloudflare → My Profile → API Tokens → "Edit Cloudflare Workers" template
   - `CLOUDFLARE_ACCOUNT_ID` — visible in the right sidebar of your Cloudflare dashboard
