// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kdefvlarvcknxtpsnhwk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZWZ2bGFydmNrbnh0cHNuaHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDE1ODgsImV4cCI6MjA1Nzk3NzU4OH0.Hy1IYn9Z8ew3QfB34TXc2Ur-SJwKv1yfuakjcT78MfI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);