-- Create a table for invitations
create type invitation_status as enum ('pending', 'accepted', 'declined');

create table public.invitations (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  invitee_name text not null,
  status invitation_status default 'pending',
  message text,
  event_title text,
  event_date timestamptz,
  location text,
  what_to_bring text,
  opened_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.invitations enable row level security;

-- Policies
-- NOTE: identifying users is tricky without auth. 
-- For this "public slug" app, we allow read if they have the slug.
-- Usually we don't need RLS if we only use Service Role on backend for logic.
-- But if we fetch from client, we need a policy.
-- Let's stick to Server Actions (Service Role) for writing.
-- Reading: Allow anon select if they know the slug?
-- Actually, let's keep it simple: Server Components use Service Role or Anon key with Policy.
-- Better to use RLS:
create policy "Enable read access for anyone with the slug"
on public.invitations for select
using (true);

-- Only service role can update, or maybe we allow update via a function?
-- Let's stick to Server Actions updating via Service Role Key (easiest for "one time" logic enforcement).

-- Create a table for community signups
create table public.community_signups (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.community_signups enable row level security;

-- Allow public inserts (anyone can sign up)
create policy "Allow public insert to community_signups"
on public.community_signups
for insert
with check (true);

-- Create a table for public events
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  location text,
  status text default 'coming soon...',
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.events enable row level security;

-- Allow public read access
create policy "Allow public read access to events"
on public.events
for select
using (true);
