# Example Product Listing App

This is an example app built with Nuxt 3 and tanstack query to show product listings and detail pages with intelligent data fetching and caching.

To run locally, clone the repo and then, in the same folder:

```
npm install
npm run dev
```

A demo Nuxthub deployment is also available at [https://nuxt-example-project.nuxt.dev/](https://nuxt-example-project.nuxt.dev/).

The product listing page is at `https://nuxt-example-project.nuxt.dev/`. Use `https://nuxt-example-project.nuxt.dev/?serverPrefetch=true` to prerender the listing page on the server before display. Otherwise, a skeleton loading state will be shown while the data is fetched client-side.

- Hovering over pagination controls prefetches data in advance and preloads thumbnail images
- Hovering over a product listing preloads the main detail image
- Product detail cache is updated from the listing data to enable instant display when selecting item from the list
- Product detail data is refetched in the background on detail page load to update any changed data (e.g. stock levels)
- Product detail pages are served prerendered when accessed directly

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
