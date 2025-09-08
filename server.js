const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// Productos reales de Taobao (simulados por ahora)
const productosTaobao = [
  {
    title: 'Zapatillas Adidas Originales Taobao',
    price: '¥299',
    thumbnail: 'https://via.placeholder.com/100'
  },
  {
    title: 'Adidas Superstar Edición China',
    price: '¥259',
    thumbnail: 'https://via.placeholder.com/100'
  },
  {
    title: 'Adidas Ultraboost Taobao',
    price: '¥399',
    thumbnail: 'https://via.placeholder.com/100'
  },
  {
    title: 'Adidas Stan Smith Edición Limitada',
    price: '¥199',
    thumbnail: 'https://via.placeholder.com/100'
  },
  {
    title: 'Adidas NMD R1 Taobao',
    price: '¥349',
    thumbnail: 'https://via.placeholder.com/100'
  }
];

app.get('/search', async (req, res) => {
  const query = (req.query.q || '').toLowerCase();

  // Filtrar por palabra clave
  const filtrados = productosTaobao.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  res.json({ shopping_results: filtrados.slice(0, 5) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listo en puerto ${PORT}`));
