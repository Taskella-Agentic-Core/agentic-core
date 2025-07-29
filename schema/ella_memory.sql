-- ella_memory.sql
create table ella_memory (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  context text,
  source_entity text,
  source_id uuid,
  content text,
  decision text, -- 'executed', 'skipped', 'suggested'
  reasoning text, -- optional GPT summary
  created_at timestamp with time zone default now()
);
