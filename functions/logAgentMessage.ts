// logAgentMessage.ts

import { supabase } from "@/lib/supabaseClient";

export async function logAgentMessage({
  conversation_id,
  sender_agent_id,
  message,
  sentiment = "neutral",
  reference_entity = null,
  reference_id = null,
}: {
  conversation_id: string;
  sender_agent_id: string;
  message: string;
  sentiment?: "supportive" | "concerned" | "critical" | "neutral";
  reference_entity?: string | null;
  reference_id?: string | null;
}) {
  const { error } = await supabase.from("agent_conversation_messages").insert({
    conversation_id,
    sender_agent_id,
    message,
    sentiment,
    reference_entity,
    reference_id,
  });

  if (error) throw new Error("Failed to log agent message: " + error.message);
}
