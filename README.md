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

## SQL for enabling realtime on a table (IMPORTANT - have to enable every time schema is recreated by Prisma)

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

## SQL for RLS policies

CREATE POLICY user_notifications ON notifications
FOR ALL
USING (text(auth.uid()) = auth_id);

## Connection pooling (PgBouncer)

When a client makes a request, PgBouncer "allocates" an available connection to the client. When the client transaction or session is completed the connection is returned to the pool and is free to be used by another client.

To find the connection pool config, go to the Settings section, click Database, and find your Connection Info and Connection String. Connection pooling is on port 6543.

When migrating, you need to use the non-pooled connection URL (like the one used in step 1). However, when deploying your app, use the pooled connection URL and add the ?pgbouncer=true flag to the PostgreSQL connection URL. It's also recommended to minimize the number of concurrent connections by setting the connection_limit to 1. The .env file should look like:

DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
SHADOW_DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres_shadow"

## RPC Functions (IMPORTANT in case schema needs to be reset by Prisma the best option is to create them in SQL instead of using the Supabase functions UI)

    create or replace function mark_notifications_as_read(user_id text)
    returns void
    language plpgsql
    as $$
    begin
    update public.notifications
    set read = true
    where auth_id = user_id and read = false;
    end
    $$;
