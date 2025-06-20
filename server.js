const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve index.html

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/clothing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  image: String,
});

// Routes
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const { name, price, image } = req.body;
  const newProduct = new Product({ name, price, image });
  await newProduct.save();
  res.json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
