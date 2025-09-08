const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  const productos = [
    { title: 'Nike Air Max', price: '$59.99', thumbnail: 'https://via.placeholder.com/100' },
    { title: 'Nike Cortez', price: '$49.99', thumbnail: 'https://via.placeholder.com/100' },
    { title: 'Nike Revolution', price: '$39.99', thumbnail: 'https://via.placeholder.com/100' },
    { title: 'Nike Air Force', price: '$69.99', thumbnail: 'https://via.placeholder.com/100' },
    { title: 'Nike Dunk', price: '$79.99', thumbnail: 'https://via.placeholder.com/100' }
  ];
  res.json({ shopping_results: productos });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listo en puerto ${PORT}`));
