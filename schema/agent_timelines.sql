-- agent_timelines.sql
create table agent_timelines (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  agent_id uuid references agent_definitions(id),
  context text, -- e.g. 'lead_escalation', 'compliance_audit'
  entity_type text, -- 'lead', 'user', 'pipeline'
  entity_id uuid,
  summary text,
  triggered_by text, -- 'system', 'user', 'scheduled_trigger'
  outcome text, -- 'executed', 'skipped', 'suggested'
  created_at timestamp with time zone default now()
);
