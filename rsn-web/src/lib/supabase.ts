import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwfttgdqfglvzttyghdp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_idEs7kAuKjwzZ3bv-k6WJQ_Suu3_hYs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
