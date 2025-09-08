const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
app.use(cors());

async function traducir(texto) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(texto)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0][0][0];
}

app.get('/search', async (req, res) => {
  try {
    const query = req.query.q || 'nike';
    const url = `https://s.taobao.com/search?q=${encodeURIComponent(query)}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    };
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const productos = [];

    $('.item').slice(0, 5).each((i, el) => {
      const titulo = $(el).find('.title').text().trim();
      const precio = $(el).find('.price').text().trim();
      const img = $(el).find('img').attr('src');

      if (titulo && precio) {
        productos.push({
          title: titulo,
          price: precio,
          thumbnail: img ? `https:${img}` : 'https://via.placeholder.com/100'
        });
      }
    });

    // Traducir títulos
    for (const p of productos) {
      p.title = await traducir(p.title);
    }

    res.json({ shopping_results: productos });

  } catch (err) {
    res.json({ shopping_results: [] });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listo en puerto ${PORT}`));
