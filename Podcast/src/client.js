import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ifzisyopppplafkmwjmu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmemlzeW9wcHBwbGFma213am11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNjI1NjUsImV4cCI6MjAxNjczODU2NX0.B-eJekz_dHHX1pfKpIz0Qm24L2krX3yuvrbktA4cb5g';
export const supabase = createClient(supabaseUrl, supabaseKey)