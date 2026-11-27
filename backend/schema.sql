create table restaurant_tables (
  id int primary key,
  seats int not null,
  area text not null
);

insert into restaurant_tables (id, seats, area) values
  (1, 8, 'Private Room'),
  (2, 2, 'Bar'),
  (3, 6, 'Patio'),
  (4, 4, 'Main Hall'),
  (5, 4, 'Main Hall'),
  (6, 2, 'Main Hall'),
  (7, 2, 'Window'),
  (8, 2, 'Window'),
  (9, 2, 'Window');

create table reservations (
  id uuid primary key default gen_random_uuid(),
  table_id int not null references restaurant_tables(id),
  reservation_date date not null,
  reservation_time time not null,
  guests int not null check (guests > 0),
  customer_name text not null,
  phone text not null,
  email text,
  requests text,
  payment_method text not null,
  payment_status text not null default 'Pending',
  status text not null default 'Reserved',
  created_at timestamptz not null default now()
);

create unique index no_double_booking
  on reservations (table_id, reservation_date, reservation_time)
  where status <> 'Cancelled';

alter table restaurant_tables enable row level security;
alter table reservations enable row level security;

create policy "anyone can view tables"
  on restaurant_tables for select to anon using (true);

create policy "anyone can book"
  on reservations for insert to anon
  with check (status = 'Reserved' and payment_status = 'Pending');

create function get_booked_tables(d date, t time)
returns int[]
language sql
security definer
set search_path = public
as $$
  select coalesce(array_agg(table_id), '{}')
  from reservations
  where reservation_date = d
    and reservation_time = t
    and status <> 'Cancelled'
$$;

grant execute on function get_booked_tables(date, time) to anon;

grant usage on schema public to authenticated;
grant select, update on reservations to authenticated;
grant select on restaurant_tables to authenticated;

create policy "staff can view reservations"
  on reservations for select to authenticated using (true);

create policy "staff can update reservations"
  on reservations for update to authenticated
  using (true) with check (true);

  create table staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

alter table staff enable row level security;

grant select, insert, update, delete on staff to authenticated;

create policy "staff can view staff"
  on staff for select to authenticated using (true);

create policy "staff can add staff"
  on staff for insert to authenticated with check (true);

create policy "staff can edit staff"
  on staff for update to authenticated using (true) with check (true);

create policy "staff can delete staff"
  on staff for delete to authenticated using (true);
  
  grant select, insert, update on reservations to service_role;
grant select on restaurant_tables to service_role;