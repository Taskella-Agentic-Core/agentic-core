// generateDataUseReport.ts

import { supabase } from "@/lib/supabaseClient";

export async function generateDataUseReport(tenant_id: string) {
  const accessLogs = await supabase
    .from("ai_data_access_logs")
    .select("*")
    .eq("tenant_id", tenant_id);

  const overrideRequests = await supabase
    .from("ai_override_requests")
    .select("*")
    .eq("tenant_id", tenant_id);

  const leads = await supabase
    .from("leads")
    .select("id, full_name, data_consent")
    .eq("tenant_id", tenant_id);

  const staff = await supabase
    .from("staff_profiles")
    .select("id, full_name, data_consent")
    .eq("tenant_id", tenant_id);

  return {
    generated_at: new Date().toISOString(),
    tenant_id,
    access_logs: accessLogs.data || [],
    override_requests: overrideRequests.data || [],
    consent_summary: {
      leads: leads.data || [],
      staff: staff.data || [],
    },
  };
}
