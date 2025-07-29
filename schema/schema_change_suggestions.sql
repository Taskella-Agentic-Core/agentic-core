-- schema_change_suggestions.sql
create table schema_change_suggestions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  suggested_by_agent_id uuid references agent_definitions(id),
  target_table text, -- e.g. 'leads', 'staff_profiles'
  suggested_field text,
  data_type text, -- 'text', 'boolean', 'enum', etc.
  rationale text,
  usage_pattern_snapshot jsonb, -- stores trend that triggered it
  status text check (status in ('proposed', 'approved', 'rejected')) default 'proposed',
  reviewed_by uuid references users(id),
  created_at timestamp with time zone default now()
);
