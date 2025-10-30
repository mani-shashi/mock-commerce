# Vibe Commerce - Backend API

RESTful API backend for Vibe Commerce shopping cart application built with Node.js, Express, and SQLite.

## 🏗️ Architecture

```
backend/
├── config/
│   ├── database.js          # Database initialization & connection
│   └── seedData.js          # Mock product data seeding
├── controllers/
│   ├── productController.js # Product CRUD operations
│   ├── cartController.js    # Cart management logic
│   └── checkoutController.js# Checkout & order processing
├── middleware/
│   └── errorHandler.js      # Global error handling
├── routes/
│   └── index.js            # API route definitions
├── server.js               # Main server entry point
└── package.json            # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mani-shashi/mock-commerce.git
cd mock-commerce/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Server will start on `http://localhost:3001`

## 📦 Dependencies

```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // CORS middleware
  "sqlite3": "^5.1.6"        // SQLite database
}
```

### Dev Dependencies
```json
{
  "nodemon": "^3.0.1"        // Auto-reload during development
}
```

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  description TEXT
);
```

### Cart Table
```sql
CREATE TABLE cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  userId TEXT DEFAULT 'user_1',
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT NOT NULL,
  customerName TEXT NOT NULL,
  customerEmail TEXT NOT NULL,
  total REAL NOT NULL,
  timestamp TEXT NOT NULL,
  items TEXT NOT NULL
);
```

## 🛣️ API Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 79.99,
      "image": "https://...",
      "description": "Premium noise-canceling headphones"
    }
  ]
}
```

### Cart

#### Get Cart
```http
GET /api/cart?userId=user_1
```

**Response:**
```json
{
  "cartItems": [
    {
      "id": 1,
      "productId": 2,
      "quantity": 2,
      "name": "Smart Watch",
      "price": 199.99,
      "image": "https://..."
    }
  ],
  "total": 399.98
}
```

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2,
  "userId": "user_1"
}
```

**Response:**
```json
{
  "message": "Item added to cart",
  "cartId": 1
}
```

**Notes:**
- If item already exists, quantity will be incremented
- Returns updated quantity if item exists
- userId defaults to "user_1" if not provided

#### Update Cart Item
```http
PUT /api/cart/:id
Content-Type: application/json

{
  "quantity": 3
}
```

**Response:**
```json
{
  "message": "Cart updated",
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/:id
```

**Response:**
```json
{
  "message": "Item removed from cart"
}
```

### Checkout

#### Process Checkout
```http
POST /api/checkout
Content-Type: application/json

{
  "cartItems": [...],
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "userId": "user_1"
}
```

**Response:**
```json
{
  "orderId": 1,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "total": 399.98,
  "timestamp": "2025-01-15T10:30:00.000Z",
  "items": [...],
  "message": "Order placed successfully!"
}
```

**Notes:**
- Clears cart after successful checkout
- Stores order in orders table
- Returns complete order receipt

#### Get Order History
```http
GET /api/orders?userId=user_1
```

**Response:**
```json
{
  "orders": [
    {
      "id": 1,
      "userId": "user_1",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "total": 399.98,
      "timestamp": "2025-01-15T10:30:00.000Z",
      "items": [...]
    }
  ]
}
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
```

### Database Configuration

**In-Memory Database (Default):**
```javascript
// config/database.js
const db = new sqlite3.Database(':memory:');
```

**File-Based Database (Persistent):**
```javascript
// config/database.js
const db = new sqlite3.Database('./database.db');
```

### CORS Configuration

**Development (Allow all origins):**
```javascript
// server.js
app.use(cors());
```

**Production (Restrict origins):**
```javascript
// server.js
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## 🧪 Testing with cURL

### Get Products
```bash
curl http://localhost:3001/api/products
```

### Add to Cart
```bash
curl -X POST http://localhost:3001/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

### Get Cart
```bash
curl http://localhost:3001/api/cart
```

### Update Cart
```bash
curl -X PUT http://localhost:3001/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

### Remove from Cart
```bash
curl -X DELETE http://localhost:3001/api/cart/1
```

### Checkout
```bash
curl -X POST http://localhost:3001/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [{"id": 1, "name": "Product", "price": 99.99, "quantity": 1}],
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }'
```

## 🔒 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created (new cart item)
- `400` - Bad Request (validation error)
- `404` - Not Found (product/cart item not found)
- `500` - Internal Server Error

## 🛠️ Development

### Adding New Endpoints

1. Create controller function in `controllers/`
2. Add route in `routes/index.js`
3. Test with cURL or Postman

Example:
```javascript
// controllers/productController.js
const getProductById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: row });
  });
};

// routes/index.js
router.get('/products/:id', getProductById);
```

### Modifying Database Schema

1. Update schema in `config/database.js`
2. Clear database (delete database.db if file-based)
3. Restart server to recreate tables

### Adding Mock Products

Edit `config/seedData.js`:
```javascript
const products = [
  {
    id: 9,
    name: 'New Product',
    price: 149.99,
    image: 'https://...',
    description: 'Product description'
  }
];
```

## 📝 Scripts

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
```

## 🔍 Debugging

Enable detailed error logging:
```javascript
// server.js
const errorHandler = (err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
```

## 📊 Performance Considerations

- **In-memory database** is fast but data is lost on restart
- **File-based database** persists data but slightly slower
- Consider indexing for large datasets:
```sql
CREATE INDEX idx_cart_userId ON cart(userId);
CREATE INDEX idx_orders_userId ON orders(userId);
```

## 🚀 Deployment

### Heroku
```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Deploy
heroku create
git push heroku main
```

### DigitalOcean/AWS
1. Set up Node.js environment
2. Install dependencies: `npm install --production`
3. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

## 🤝 Contributing

See main [README.md](../README.md) for contribution guidelines.

## 📄 License

MIT License

---

For frontend documentation, see [../frontend/README.md](../frontend/README.md)