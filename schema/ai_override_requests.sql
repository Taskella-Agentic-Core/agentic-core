-- ai_override_requests.sql
create table ai_override_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  related_entity text, -- e.g. 'lead', 'staff', 'compliance_event'
  related_entity_id uuid,
  agent_id uuid references agent_definitions(id),
  reason text,
  requested_by uuid references users(id),
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  action_taken text,
  created_at timestamp with time zone default now()
);
