# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Project notes

-   nuxt/image - https://v1.image.nuxtjs.org/
-   supabase/prisma - https://supabase.com/docs/guides/integrations/prisma
-   realtime inspector - https://realtime.supabase.com/inspector

## Enabling relatime on table

To enable realtime for database tables, you can use the following code snippet:

begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;
-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;
-- add a table to the publication
alter publication supabase_realtime add table products;
-- add other tables to the publication
alter publication supabase_realtime add table posts;
