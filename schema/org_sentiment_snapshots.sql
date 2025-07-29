-- org_sentiment_snapshots.sql
create table org_sentiment_snapshots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  team_label text, -- e.g. 'sales', 'ops', 'caregivers'
  sentiment_score numeric, -- average of -1 to 1
  morale_flags int,
  missed_shifts int,
  customer_feedback_score numeric,
  compliance_events int,
  override_events int,
  period text, -- 'daily', 'weekly', etc.
  snapshot_date date default current_date,
  summary text, -- GPT-generated summary of org health
  created_at timestamp with time zone default now()
);
