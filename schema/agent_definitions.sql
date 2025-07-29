-- agent_definitions.sql
create table agent_definitions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  name text not null,
  description text,
  prompt text,
  agent_type text check (agent_type in ('embedded', 'gpt_analysis', 'external')) default 'embedded',
  agent_source text check (agent_source in ('embedded', 'external', 'gpt_analysis')) default 'embedded',
  external_handler_url text,
  sensitivity_rating text check (sensitivity_rating in ('low', 'moderate', 'high')) default 'moderate',
  consent_required boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);
