import db from '../config/db.js';

// const processCheckout = async (req, res) => {
//   const { user_id, payment_method, shipping_address } = req.body;
//   try {
//     const newOrder = await db.query(
//       'INSERT INTO orders (user_id, payment_method, shipping_address) VALUES ($1, $2, $3) RETURNING *',
//       [user_id, payment_method, shipping_address]
//     );
//     res.status(201).json(newOrder.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to process checkout' });
//   }
// };

const processCheckout = (req, res) => {
  const { cartItems, customerName, customerEmail } = req.body;
  const userId = req.body.userId || 'user_1';

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  if (!customerName || !customerEmail) {
    return res.status(400).json({ error: 'Customer name and email required' });
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const timestamp = new Date().toISOString();

  db.run(
    'INSERT INTO orders (userId, customerName, customerEmail, total, timestamp, items) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, customerName, customerEmail, total, timestamp, JSON.stringify(cartItems)],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const orderId = this.lastID;

      db.run('DELETE FROM cart WHERE userId = ?', [userId], (err) => {
        if (err) {
          console.error('Error clearing cart:', err);
        }

        res.json({
          orderId,
          customerName,
          customerEmail,
          total: parseFloat(total.toFixed(2)),
          timestamp,
          items: cartItems,
          message: 'Order placed successfully!'
        });
      });
    }
  );
};

export {
  processCheckout
};
