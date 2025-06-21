import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cyuexavxllsdmltujaqy.supabase.co'; // GANTI
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5dWV4YXZ4bGxzZG1sdHVqYXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTgyNTcsImV4cCI6MjA2NjA3NDI1N30.0qpTVthz_iS8EkTYbF7rqmabtqIomcxjHD3PIrb1Wco'; // GANTI

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
