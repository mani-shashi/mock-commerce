import db from "../config/db.js";

// const getOrders = async (req, res) => {
//   try {
//     const orders = await db.query("SELECT * FROM orders");
//     res.status(200).json(orders.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch orders" });
//   }
// };

const createOrder = async (req, res) => {
  const { user_id, payment_method, shipping_address } = req.body;
  try {
    const newOrder = await db.query(
      "INSERT INTO orders (user_id, payment_method, shipping_address) VALUES ($1, $2, $3) RETURNING *",
      [user_id, payment_method, shipping_address]
    );
    res.status(201).json(newOrder.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (order.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

const getOrders = (req, res) => {
  const userId = req.query.userId || 'user_1';
  
  db.all(
    'SELECT * FROM orders WHERE userId = ? ORDER BY timestamp DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const orders = rows.map(order => ({
        ...order,
        items: JSON.parse(order.items)
      }));
      
      res.json({ orders });
    }
  );
};

export { getOrders, createOrder, getOrderById };