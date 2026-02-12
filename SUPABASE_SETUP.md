# Supabase Setup for Community Events

Follow these instructions to set up your Supabase database and storage for Community Events.

## 1. Create the Database Table

Run the following SQL query in your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) to create the `upcoming_events` table.

```sql
-- Create the upcoming_events table
create table public.upcoming_events (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  event_title text not null,
  date date not null,
  time text,
  address text,
  link text, -- RSVP Link
  photo_url text -- URL to the image in Storage
);

-- Enable Row Level Security (RLS)
alter table public.upcoming_events enable row level security;

-- Create Policy: Allow Public Read Access (Anyone can view events)
create policy "Allow Public Read Access"
on public.upcoming_events
for select
to public
using (true);

-- Create Policy: Allow Authenticated/Service Role Insert/Update (For admins/server actions)
create policy "Allow Authenticated Insert"
on public.upcoming_events
for insert
to public -- Changing to public for now so you can easily test, or restrict to authenticated
with check (true);

create policy "Allow Authenticated Update"
on public.upcoming_events
for update
to public
using (true);
```

## 2. Set Up Storage for Photos

Run the following SQL to create the storage bucket for event thumbnails and set public access policies.

```sql
-- 1. Create the Storage Bucket for Event Thumbnails
insert into storage.buckets (id, name, public)
values ('event_thumbnails', 'event_thumbnails', true)
on conflict (id) do nothing;

-- 2. Allow public access to view files in the 'event_thumbnails' bucket
create policy "Public Read Event Thumbnails"
  on storage.objects for select
  using ( bucket_id = 'event_thumbnails' );

-- 3. Allow public uploads (for development/admin usage)
create policy "Public Upload Event Thumbnails"
  on storage.objects for insert
  with check ( bucket_id = 'event_thumbnails' );
```

## 3. Usage Instructions

We have updated `src/app/actions.ts` with two new functions:

1.  `uploadEventImage(formData)`: Uploads an image to the `event-uploads` bucket and returns the public URL.
2.  `createEvent(eventData)`: Inserts a new event into the `upcoming_events` table.

### Example: Creating an Event

You can use a form similar to the Internship form. Here is the logic you would use:

```typescript
import { uploadEventImage, createEvent } from '@/app/actions'

// Inside your form submission handler:
async function handleSubmit(formData: FormData) {
  // 1. Upload the image first
  const imageFile = formData.get('image') as File
  let photoUrl = ''
  
  if (imageFile) {
    const uploadForm = new FormData()
    uploadForm.append('file', imageFile)
    const { success, url } = await uploadEventImage(uploadForm)
    if (success && url) photoUrl = url
  }

  // 2. Create the event record
  const eventData = {
    event_title: formData.get('title'),
    date: formData.get('date'), // YYYY-MM-DD
    time: formData.get('time'),
    address: formData.get('address'),
    link: formData.get('link'),
    photo_url: photoUrl
  }

  const result = await createEvent(eventData)
  if (result.success) {
    alert('Event Created!')
  }
}
```
