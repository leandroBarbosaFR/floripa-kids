-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── CATEGORIES ────────────────────────────────────────────────────────────────
create table public.categories (
  id         uuid primary key default uuid_generate_v4(),
  name_pt    text not null,
  name_en    text not null,
  icon       text not null,
  color      text not null,
  created_at timestamptz default now()
);

-- ─── EVENTS ────────────────────────────────────────────────────────────────────
create table public.events (
  id                       uuid primary key default uuid_generate_v4(),
  title_pt                 text not null,
  title_en                 text not null,
  description_pt           text not null default '',
  description_en           text not null default '',
  category_id              uuid references public.categories(id) on delete set null,
  date_start               timestamptz,
  date_end                 timestamptz,
  is_recurring             boolean not null default false,
  recurring_description_pt text,
  recurring_description_en text,
  location_name            text not null default '',
  location_address         text not null default '',
  location_lat             double precision,
  location_lng             double precision,
  price_type               text not null default 'free' check (price_type in ('free', 'paid', 'varies')),
  price_description_pt     text,
  price_description_en     text,
  age_min                  integer,
  age_max                  integer,
  website                  text,
  phone                    text,
  is_published             boolean not null default false,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

-- ─── EVENT PHOTOS ──────────────────────────────────────────────────────────────
create table public.event_photos (
  id         uuid primary key default uuid_generate_v4(),
  event_id   uuid not null references public.events(id) on delete cascade,
  url        text not null,
  is_primary boolean not null default false,
  sort_order integer not null default 0
);

-- ─── AUTO-UPDATE updated_at ────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
alter table public.categories   enable row level security;
alter table public.events        enable row level security;
alter table public.event_photos  enable row level security;

-- Public read: published events and all categories/photos
create policy "Public can read categories"
  on public.categories for select using (true);

create policy "Public can read published events"
  on public.events for select using (is_published = true);

create policy "Public can read photos of published events"
  on public.event_photos for select
  using (
    exists (
      select 1 from public.events e
      where e.id = event_id and e.is_published = true
    )
  );

-- Admin write: authenticated users (single admin)
create policy "Admin full access categories"
  on public.categories for all using (auth.role() = 'authenticated');

create policy "Admin full access events"
  on public.events for all using (auth.role() = 'authenticated');

create policy "Admin full access photos"
  on public.event_photos for all using (auth.role() = 'authenticated');

-- ─── STORAGE BUCKET ────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('event-photos', 'event-photos', true);

create policy "Public read event photos"
  on storage.objects for select
  using (bucket_id = 'event-photos');

create policy "Admin upload event photos"
  on storage.objects for insert
  with check (bucket_id = 'event-photos' and auth.role() = 'authenticated');

create policy "Admin delete event photos"
  on storage.objects for delete
  using (bucket_id = 'event-photos' and auth.role() = 'authenticated');

-- ─── SEED CATEGORIES ──────────────────────────────────────────────────────────
insert into public.categories (name_pt, name_en, icon, color) values
  ('Praias',             'Beaches',           '🏖️', '#0EA5E9'),
  ('Parques',            'Parks',             '🌳', '#22C55E'),
  ('Restaurantes',       'Restaurants',       '🍽️', '#F97316'),
  ('Parquinhos',         'Playgrounds',       '🎠', '#A855F7'),
  ('Ambientes Fechados', 'Indoor',            '🏠', '#6366F1'),
  ('Eventos & Festivais','Events & Festivals','🎉', '#EC4899'),
  ('Esportes',           'Sports',            '⚽', '#EAB308'),
  ('Educação',           'Education',         '📚', '#14B8A6');
