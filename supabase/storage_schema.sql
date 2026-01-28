-- Create the 'board-uploads' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('board-uploads', 'board-uploads', true)
on conflict (id) do nothing;

-- Set up security policies for the bucket
-- 1. Allow public access to view files (needed for images to load on the site)
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'board-uploads' );

-- 2. Allow upload access (adjust as needed, currently allowing anon/service role to upload for this demo flow)
-- ideally this should be authenticated only, but for an open submission board we might need generic upload
create policy "Allow Public Uploads"
on storage.objects for insert
with check ( bucket_id = 'board-uploads' );
