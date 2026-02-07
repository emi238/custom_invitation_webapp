# Supabase Setup Instructions for Community Polaroids

Follow these steps to set up the backend for your Community Polaroids gallery.

## Step 1: Create Table and Storage Bucket

1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Open your project.
3.  Go to the **SQL Editor** (icon on the left sidebar).
4.  Copy and paste the following SQL code into a new query window and run it. This will create the table and the storage bucket with the necessary permissions.

```sql
-- 1. Create the Storage Bucket for Polaroids
insert into storage.buckets (id, name, public)
values ('polaroids', 'polaroids', true);

-- 2. Allow public access to view files in the 'polaroids' bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'polaroids' );

-- 3. Allow authenticated users (or anyone if you prefer) to upload
-- For simplicity in development, we'll allow public uploads here, 
-- BUT for production, you should restrict this.
-- If you are uploading via the Dashboard manually, you don't need an upload policy for the App.
-- We only need a Select policy for the App to display images.

-- 4. Create the Table to track the polaroids
create table public.community_polaroids (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  storage_path text not null, -- The path/filename in the bucket
  caption text
);

-- 5. Enable Row Level Security (RLS)
alter table public.community_polaroids enable row level security;

-- 6. Create Policy to allow everyone to VIEW the polaroid data
create policy "Allow public read access"
  on public.community_polaroids
  for select
  using (true);
```

## Step 2: Uploading Photos (Locally from Computer)

You requested to upload photos locally from your computer. Since we haven't built an admin upload page in the app yet, you will use the **Supabase Dashboard** to do this.

1.  **Navigate to Storage**:
    *   Click on the **Storage** icon in the left sidebar (folder icon).
    *   Click on the `polaroids` bucket you just created.

2.  **Upload Image**:
    *   Click the **"Upload File"** button.
    *   Select a photo from your computer (e.g., `member1.jpg`).
    *   Upload it.

3.  **Get the File Path**:
    *   Once uploaded, looking at the file list, copy the **File Name** (e.g., `member1.jpg`).

## Step 3: Link Photo to the Gallery

Now we need to tell the database to show this photo.

1.  **Navigate to Table Editor**:
    *   Click on the **Table Editor** icon (table grid icon).
    *   Select the `community_polaroids` table.

2.  **Insert Record**:
    *   Click **"Insert New Row"**.
    *   **storage_path**: Paste the file name you copied (e.g., `member1.jpg`).
    *   **caption**: Enter a name or short caption (e.g., "Sarah & Team").
    *   Click **Save**.

The photo will now automatically appear in the Polaroid Gallery on your website! Repeat Steps 2 and 3 for as many photos as you want.
