import db from '../config/db.js';

const getCartItems = (req, res) => {
  const userId = req.query.userId || 'user_1';
  
  db.all(
    `SELECT c.id, c.quantity, p.id as productId, p.name, p.price, p.image
     FROM cart c
     JOIN products p ON c.productId = p.id
     WHERE c.userId = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const total = rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      res.json({
        cartItems: rows,
        total: parseFloat(total.toFixed(2))
      });
    }
  );
};

const addCartItem = (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.body.userId || 'user_1';

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.get(
      'SELECT * FROM cart WHERE productId = ? AND userId = ?',
      [productId, userId],
      (err, existingItem) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (existingItem) {
          const newQty = existingItem.quantity + quantity;
          db.run(
            'UPDATE cart SET quantity = ? WHERE id = ?',
            [newQty, existingItem.id],
            function(err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.json({ 
                message: 'Cart updated',
                cartId: existingItem.id,
                quantity: newQty
              });
            }
          );
        } else {
          db.run(
            'INSERT INTO cart (productId, quantity, userId) VALUES (?, ?, ?)',
            [productId, quantity, userId],
            function(err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.status(201).json({
                message: 'Item added to cart',
                cartId: this.lastID
              });
            }
          );
        }
      }
    );
  });
};

const updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Valid quantity required' });
  }

  db.run(
    'UPDATE cart SET quantity = ? WHERE id = ?',
    [quantity, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.json({ message: 'Cart updated', quantity });
    }
  );
};

const deleteCartItem = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM cart WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  });
};

export {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};