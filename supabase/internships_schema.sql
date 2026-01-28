-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- 1. Create the Internship Posts table
create table if not exists internship_posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text unique not null,
  startup_name text not null,
  startup_icon text, -- URL
  banner_image text, -- URL
  description text not null,
  is_paid boolean default false,
  message_from_founder text,
  founder_signature_photo text, -- URL
  promotional_video text, -- URL
  contact_details text
);

-- 2. Create the Internship Roles table (One-to-many relationship)
create table if not exists internship_roles (
  id uuid default uuid_generate_v4() primary key,
  internship_id uuid references internship_posts(id) on delete cascade not null,
  position_title text not null,
  description text,
  hours_required text,
  responsibilities text,
  role_requirements text,
  what_they_will_gain text
);

-- 3. Enable Row Level Security (RLS)
alter table internship_posts enable row level security;
alter table internship_roles enable row level security;

-- 4. Create Policies
-- Allow public read access to posts
create policy "Enable read access for all users" on internship_posts
  for select using (true);

-- Allow public read access to roles
create policy "Enable read access for all users" on internship_roles
  for select using (true);

-- Allow authenticated/service-role insert (for your form)
create policy "Enable insert for service role" on internship_posts
  for insert with check (true);
  
create policy "Enable insert for service role" on internship_roles
  for insert with check (true);

-- 5. Create Storage Buckets for Images (Optional but recommended)
-- insert into storage.buckets (id, name, public) values ('board-assets', 'board-assets', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'board-assets' );
-- create policy "Authenticated Upload" on storage.objects for insert with check ( bucket_id = 'board-assets' );
