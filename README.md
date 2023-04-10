# Nuxt 3 Prisma Supabase

## Project notes

-   nuxt/image - https://v1.image.nuxtjs.org/
-   supabase/prisma - https://supabase.com/docs/guides/integrations/prisma
-   realtime inspector - https://realtime.supabase.com/inspector
-   fix messed up grants because of Prisma - https://supabase.com/docs/guides/integrations/prisma#missing-grants
-   RLS - https://supabase.com/docs/guides/auth/row-level-security#advanced-policies

## Prisma naming convention

-   Use plural for all model names
-   use lower case for all model names
-   use user_id instead of auth_id

## SQL for enabling realtime on table "notifications" (IMPORTANT - have to run this script every time schema is reset by Prisma)

    begin;
    -- remove the realtime publication
    drop publication if exists supabase_realtime;
    -- re-create the publication but don't enable it for any tables
    create publication supabase_realtime;
    commit;
    -- add a table to the publication
    alter publication supabase_realtime add table notifications;

## SQL for fixing the grants on a database (IMPORTANT - have to run this script every time schema is reset by Prisma)

    grant usage on schema public to postgres, anon, authenticated, service_role;

    grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
    grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
    grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

    alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
    alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

### How to check if your grants are messed up

    const client = useSupabaseClient();
    const todos = await client.from("todos").select("\*");
    console.log(todos.status);

## SQL for RLS policies (IMPORTANT - have to run this script every time schema is reset by Prisma)

    -- enable RLS on all tables
    alter table public.user
    enable row level security;

    alter table public.notifications
    enable row level security;

    alter table public.todos
    enable row level security;

    -- create policies on the tables
    CREATE POLICY  "user can update their own notfications." ON notifications
    FOR ALL
    USING (text(auth.uid()) = auth_id);

    CREATE POLICY  "user can update their own todos." ON todos
    FOR ALL
    USING (text(auth.uid()) = auth_id);

## Connection pooling (PgBouncer)

When a client makes a request, PgBouncer "allocates" an available connection to the client. When the client transaction or session is completed the connection is returned to the pool and is free to be used by another client.

To find the connection pool config, go to the Settings section, click Database, and find your Connection Info and Connection String. Connection pooling is on port 6543.

When migrating, you need to use the non-pooled connection URL (like the one used in step 1). However, when deploying your app, use the pooled connection URL and add the ?pgbouncer=true flag to the PostgreSQL connection URL. It's also recommended to minimize the number of concurrent connections by setting the connection_limit to 1. The .env file should look like:

    DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
    SHADOW_DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres_shadow"

## RPC Functions (IMPORTANT - have to run this script every time schema is reset by Prisma)

IMPORTANT in case schema needs to be reset by Prisma the best option is to create them in SQL instead of using the Supabase functions UI

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

## TODO

-   Messages/chat
-   Todos
-   pg_cron and pg_net
-   Create indexes on table using Prisma (https://www.prisma.io/blog/improving-query-performance-using-indexes-2-MyoiJNMFTsfq#:~:text=You%20can%20add%20an%20index,index%20created%20in%20the%20database)
-   full text search (https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search)
-   Create a shadow db (not named "postgres") and access through pgAdmin. Text out all functionality - realtime, RLS, etc.
-   Reset pwd - is not redirecting to the right page
