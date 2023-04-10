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
-   fix messed up grants because of Prisma - https://supabase.com/docs/guides/integrations/prisma#missing-grants

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

## SQL for enabling realtime on a table

begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;
-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;
-- add a table to the publication
alter publication supabase_realtime add table notifications;

## SQL for fixing the grants on a database

grant usage on schema public to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

## SQL for policies

CREATE POLICY user_notifications ON notifications
FOR ALL
USING (text(auth.uid()) = auth_id);
