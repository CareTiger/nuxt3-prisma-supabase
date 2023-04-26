-- schema public
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

-- schema realtime
grant usage on schema realtime to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema realtime to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema realtime to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema realtime to postgres, anon, authenticated, service_role;

alter default privileges in schema realtime grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema realtime grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema realtime grant all on sequences to postgres, anon, authenticated, service_role;