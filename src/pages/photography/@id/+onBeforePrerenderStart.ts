import { supabase } from '../../../supabaseClient';

async function onBeforePrerenderStart() {
  const { data } = await supabase.from('photography').select('id');
  const urls = data ? data.map(item => `/photography/${item.id}`) : [];
  return urls;
}

export { onBeforePrerenderStart };
