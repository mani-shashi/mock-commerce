import db, { initializeDatabase } from '../config/db.js';

const getProducts = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ products: rows });
  });
};


const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = await db.query(
      'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
      [name, price, description]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const updatedProduct = await db.query(
      'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
      [name, price, description, id]
    );
    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await db.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    if (deletedProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};