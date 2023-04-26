--
-- RESET RLS POLICIES ON RELEVANT TABLES
-- ENABLE RLS ON ALL TABLES AND CREATE RLS POLICIES FOR EACH TABLE
--
-- table realtime.account
alter table realtime.account
enable row level security;

-- table realtime.user
alter table realtime.user
enable row level security;

-- CREATE POLICY "Enable CRUD on realtime.note for users based on user_uid"
-- ON realtime.todo
-- FOR ALL USING (
--   auth.uid()::text = user_uid
-- );

-- table realtime.todo
alter table realtime.todo
enable row level security;

-- CREATE POLICY "Enable CRUD on realtime.profile for users based on user_uid"
-- ON realtime.profile
-- FOR ALL USING (
--   auth.uid()::text = user_uid
-- );

-- table realtime.media
alter table realtime.media
enable row level security;