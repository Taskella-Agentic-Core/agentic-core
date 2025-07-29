-- ai_data_access_logs.sql
create table ai_data_access_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  agent_id uuid references agent_definitions(id),
  data_type text, -- 'lead', 'staff', 'compliance', etc.
  data_reference_id uuid,
  access_purpose text,
  user_data_sensitive boolean default false,
  consent_status text check (consent_status in ('granted', 'unknown', 'revoked')) default 'unknown',
  access_time timestamp with time zone default now()
);
