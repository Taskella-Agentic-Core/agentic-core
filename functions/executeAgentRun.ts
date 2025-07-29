// executeAgentRun.ts
import { supabase } from "@/lib/supabaseClient";

// Core function to execute an agent based on its definition
export async function executeAgentRun({
  agent,
  tenant_id,
  action_payload
}: {
  agent: any;
  tenant_id: string;
  action_payload: any;
}) {
  const timestamp = new Date().toISOString();

  if (agent.agent_source === "external") {
    const response = await fetch(agent.external_handler_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenant_id,
        agent_id: agent.id,
        action_payload,
      }),
    });

    const result = await response.json();

    await supabase.from("agent_activity_logs").insert({
      tenant_id,
      agent_id: agent.id,
      triggered_by: "system",
      action_summary: result.summary || "External agent executed",
      result: result.status || "executed",
      created_at: timestamp
    });

    return;
  }

  if (agent.agent_type === "gpt_analysis") {
    // This would call GPT (OpenAI or other) and summarize data
    // Placeholder logic:
    const resultText = "GPT agent reviewed data and issued a strategic summary.";

    await supabase.from("agent_activity_logs").insert({
      tenant_id,
      agent_id: agent.id,
      triggered_by: "system",
      action_summary: resultText,
      result: "executed",
      created_at: timestamp
    });

    return;
  }

  if (agent.agent_type === "embedded") {
    // Example embedded logic stub:
    await supabase.from("ella_memory").insert({
      tenant_id,
      context: "agent_trigger",
      source_entity: "agent",
      source_id: agent.id,
      content: `Agent ${agent.name} executed on payload: ${JSON.stringify(action_payload)}`,
      decision: "executed",
      created_at: timestamp
    });

    await supabase.from("agent_activity_logs").insert({
      tenant_id,
      agent_id: agent.id,
      triggered_by: "system",
      action_summary: `Embedded agent ${agent.name} ran successfully.`,
      result: "executed",
      created_at: timestamp
    });

    return;
  }

  throw new Error("Unsupported agent type");
}
