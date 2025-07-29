// explainDecision.ts

import { supabase } from "@/lib/supabaseClient";
import OpenAI from "openai";

// Load your OpenAI key from env or config
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function explainDecision(decision_id: string): Promise<string> {
  const { data, error } = await supabase
    .from("ella_memory")
    .select("context, source_entity, content, reasoning")
    .eq("id", decision_id)
    .single();

  if (error || !data) {
    throw new Error("Could not retrieve decision memory.");
  }

  const prompt = `
You are an AI ethics narrator.

Explain the following autonomous agent decision in plain language:

Context: ${data.context}
Entity: ${data.source_entity}
Content: ${data.content}
Reasoning: ${data.reasoning || "No reasoning logged"}

Output should be understandable to a manager or compliance officer.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const explanation = response.choices?.[0]?.message?.content || "No explanation generated.";
  return explanation.trim();
}
