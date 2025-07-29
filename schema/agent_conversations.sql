-- agent_conversations.sql
create table agent_conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  topic text, -- e.g. "July Forecast & Hiring Plan"
  created_by_agent_id uuid references agent_definitions(id),
  created_at timestamp with time zone default now()
);

create table agent_conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references agent_conversations(id),
  sender_agent_id uuid references agent_definitions(id),
  message text,
  sentiment text, -- 'supportive', 'concerned', 'critical', 'neutral'
  reference_entity text, -- e.g. 'forecast_report', 'lead', etc.
  reference_id uuid,
  created_at timestamp with time zone default now()
);
