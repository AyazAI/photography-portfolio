import { supabase } from '../../../supabaseClient';

async function onBeforePrerenderStart() {
  const { data } = await supabase.from('work').select('id');
  const urls = data ? data.map(item => `/work/${item.id}`) : [];
  return urls;
}

export { onBeforePrerenderStart };
