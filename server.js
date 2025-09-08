const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  try {
    const { q, api_key } = req.query;
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&api_key=${api_key}&hl=es`;
    const resp = await axios.get(url);
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend CORS listo en puerto ${PORT}`));
