// useAgentMemory.ts

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export function useAgentMemory(tenant_id: string, context?: string) {
  return useQuery({
    queryKey: ["ella_memory", tenant_id, context],
    queryFn: async () => {
      let query = supabase
        .from("ella_memory")
        .select("*")
        .eq("tenant_id", tenant_id)
        .order("created_at", { ascending: false });

      if (context) {
        query = query.eq("context", context);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error("Error fetching Ella memory: " + error.message);
      }

      return data;
    },
  });
}
