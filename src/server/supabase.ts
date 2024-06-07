import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

const projectURL = env.NEXT_PUBLIC_PROJECT_URL;
const ANONKey = env.NEXT_PUBLIC_ANON_KEY;

export const supabase = createClient(projectURL, ANONKey);
