const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, telefono } = req.body;

  if (!nombre || !email || !telefono) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('participantes')
    .insert([{ nombre, email, telefono }]);

  if (error) {
    console.error("Error inserting into Supabase:", error);
    return res.status(500).json({ error: 'Failed to insert data' });
  }

  return res.status(200).json({ success: true });
}
