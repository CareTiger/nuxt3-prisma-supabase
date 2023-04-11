# Nuxt 3 Prisma Supabase

## Project notes

-   supabase JS docs - https://supabase.com/docs/reference/javascript/
-   supabase/prisma - https://supabase.com/docs/guides/integrations/prisma
-   realtime inspector - https://realtime.supabase.com/inspector
-   fix messed up grants because of Prisma - https://supabase.com/docs/guides/integrations/prisma#missing-grants
-   RLS - https://supabase.com/docs/guides/auth/row-level-security#advanced-policies
-   prisma multiple schemas - https://www.prisma.io/docs/guides/other/multi-schema
-   protecting server routes - https://masteringnuxt.com/blog/protecting-server-routes
-   client side error handling - https://masteringnuxt.com/blog/nuxt-3-client-side-error-handling
-   nuxt/image - https://v1.image.nuxtjs.org/

## Prisma naming convention

-   Use singular/plural for all model names. be consistent.
-   use lower case for all model names. postgres sometimes gets messed up with Capitalized model names.
-   use user_id instead of auth_id in the public schema
-

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
    const { data: todos, error } = await client.from("todos").select("*");
    console.log(todos);

## SQL for RLS policies (IMPORTANT - have to run this script every time schema is reset by Prisma)

    -- enable RLS on all tables
    alter table public.user
    enable row level security;

    alter table public.notifications
    enable row level security;

    alter table public.todos
    enable row level security;

    alter table public.media
    enable row level security;

    -- create policies on the tables
    CREATE POLICY  "user can update their own notfications." ON notifications
    FOR ALL
    USING (text(auth.uid()) = user_id);

    CREATE POLICY  "user can update their own todos." ON todos
    FOR ALL
    USING (text(auth.uid()) = user_id);

    CREATE POLICY  "user can update their own media." ON media
    FOR ALL
    USING (text(auth.uid()) = user_id);

## Connection pooling (PgBouncer)

When a client makes a request, PgBouncer "allocates" an available connection to the client. When the client transaction or session is completed the connection is returned to the pool and is free to be used by another client.

To find the connection pool config, go to the Settings section, click Database, and find your Connection Info and Connection String. Connection pooling is on port 6543.

When migrating, you need to use the non-pooled connection URL (like the one used in step 1). However, when deploying your app, use the pooled connection URL and add the ?pgbouncer=true flag to the PostgreSQL connection URL. It's also recommended to minimize the number of concurrent connections by setting the connection_limit to 1. The .env file should look like:

    DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
    SHADOW_DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres_shadow"

## RPC Functions (IMPORTANT - have to run this script every time schema is reset by Prisma)

IMPORTANT in case schema needs to be reset by Prisma the best option is to create them in SQL instead of using the Supabase functions UI

    create or replace function mark_notifications_as_read(auth_id text)
    returns void
    language plpgsql
    as $$
        begin
        update public.notifications
        set read = true
        where user_id = auth_id and read = false;
        end
    $$;

## TODO

-   Messages/chat
-   Media API
-   pg_cron and pg_net
-   Create indexes on table using Prisma (https://www.prisma.io/blog/improving-query-performance-using-indexes-2-MyoiJNMFTsfq#:~:text=You%20can%20add%20an%20index,index%20created%20in%20the%20database)
-   full text search (https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search)
-   Create a shadow db (not named "postgres" and access through pgAdmin) OR create a new schema. Text out all functionality - realtime, RLS, etc.
-   Reset pwd - is not redirecting to the right page
-   Log errors in error logging table
-   implement gallery as api

## Tutorials & examples

-   supabase - https://github.com/supabase/supabase/tree/master/examples
-   supabase - edge-functions - https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions
-   supabase - database webhooks - https://www.youtube.com/watch?v=dJk2wbdLDpE&t=3s

-   CodewithGuillaume - edge functions - https://www.youtube.com/watch?v=wJtuF6A8uXk
-   CodewithGuillaume - RLS - https://www.youtube.com/watch?v=eplN5oaQ_aA&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=3
-   CodewithGuillaume - Realtime - https://www.youtube.com/watch?v=vUBYq-99TsE&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=10
-   CodewithGuillaume - Realtime 2 - https://www.youtube.com/watch?v=A9hq5d7t-tA&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=18
-   CodewithGuillaume - db functions - https://www.youtube.com/watch?v=n5j_mrSmpyc&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=12
-   CodewithGuillaume - storage - https://www.youtube.com/watch?v=cN2RE6EpExE&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=15
-   CodewithGuillaume - logs - https://www.youtube.com/watch?v=LgoWTIvaslQ&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=16
-   CodewithGuillaume - extensions - https://www.youtube.com/watch?v=IciFWVvDopc&list=PL8HkCX2C5h0W-Fr3NEfOprzTRHICMGyOX&index=17
