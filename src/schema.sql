-- THE YUVA SAMRAT: initial public-submission schema
-- Run this in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.public_issues (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  district text not null,
  category text not null,
  location text not null,
  description text not null,
  consent boolean not null default false,
  language text not null default 'en',
  status text not null default 'pending' check (status in ('pending','reviewing','verified','published','rejected'))
);

create table if not exists public.community_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  mobile text not null,
  district text not null,
  interest text not null,
  consent boolean not null default false,
  language text not null default 'en',
  status text not null default 'new' check (status in ('new','contacted','approved','archived'))
);

alter table public.public_issues enable row level security;
alter table public.community_signups enable row level security;

drop policy if exists "Anyone can submit a public issue" on public.public_issues;
create policy "Anyone can submit a public issue"
  on public.public_issues for insert to anon, authenticated
  with check (consent = true);

drop policy if exists "Anyone can register community interest" on public.community_signups;
create policy "Anyone can register community interest"
  on public.community_signups for insert to anon, authenticated
  with check (consent = true);

-- No public SELECT, UPDATE or DELETE policies are created intentionally.
-- Review submissions only through the Supabase dashboard or a protected admin tool.
