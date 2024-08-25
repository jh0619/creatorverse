import { createClient } from "@supabase/supabase-js";
const URL = "https://dbrixcmxdmehkojeyhll.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicml4Y214ZG1laGtvamV5aGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzMyODUsImV4cCI6MjA0MDEwOTI4NX0.7mRk_b7UQZjMH09vtrVNqcKWqHmhdNlzha6XWx9MX6A";

export const supabase = createClient(URL, API_KEY);
