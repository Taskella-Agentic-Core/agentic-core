-- agent_activity_logs.sql
create table agent_activity_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  agent_id uuid references agent_definitions(id),
  triggered_by text, -- 'system', 'user', 'scheduler'
  action_summary text,
  result text, -- 'executed', 'skipped', 'failed'
  created_at timestamp with time zone default now()
);
