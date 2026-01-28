-- 1. Create the Co-founder Posts table
create table if not exists cofounder_posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text unique not null,
  startup_name text not null,
  position_title text not null,
  description text not null, -- Short description for card
  extended_description text not null, -- Long description for popup
  industry_tags text[], -- Array of strings
  founder_email text not null,
  banner_image text, -- URL
  logo_image text -- URL
);

-- 2. Enable Row Level Security (RLS)
alter table cofounder_posts enable row level security;

-- 3. Create Policies
-- Allow public read access to posts
create policy "Enable read access for all users" on cofounder_posts
  for select using (true);

-- Allow authenticated/service-role insert
create policy "Enable insert for service role" on cofounder_posts
  for insert with check (true);
