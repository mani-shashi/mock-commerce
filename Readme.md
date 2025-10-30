# Mock Commerce - Full-Stack Shopping Cart

A complete e-commerce shopping cart application with React frontend, Express backend, and SQLite database.

## Features

### Backend (Express + SQLite)
- ✅ GET `/api/products` - Returns 8 mock products
- ✅ POST `/api/cart` - Add items to cart with quantity
- ✅ DELETE `/api/cart/:id` - Remove items from cart
- ✅ PUT `/api/cart/:id` - Update item quantities
- ✅ GET `/api/cart` - Get cart items with calculated total
- ✅ POST `/api/checkout` - Process checkout with customer info
- ✅ GET `/api/orders` - Order history (bonus feature)
- ✅ SQLite database with persistent storage
- ✅ Comprehensive error handling
- ✅ CORS enabled for frontend communication

### Frontend (React)
- ✅ Responsive product grid with 8 items
- ✅ Add to cart functionality
- ✅ Shopping cart sidebar with item management
- ✅ Quantity controls (increment/decrement)
- ✅ Remove items from cart
- ✅ Live cart total calculation
- ✅ Checkout modal with customer form
- ✅ Order confirmation receipt
- ✅ Beautiful gradient UI design
- ✅ Error handling with toast notifications
- ✅ Loading states

## Tech Stack

**Backend:**
- Node.js + Express.js
- SQLite3 database
- RESTful API architecture
- CORS middleware

**Frontend:**
- React 18+ with Hooks
- Tailwind CSS for styling
- Lucide React icons
- Fetch API for HTTP requests

## Installation & Setup

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Backend Setup

1. Create a new directory for the backend:
```bash
git clone https://github.com/mani-shashi/MockCommerce.git
```

2. Initialize npm and install dependencies:
```bash
npm init -y
npm install express cors sqlite3
npm install --save-dev nodemon
```

3. Create `server.js` file with the backend code provided

4. Update `package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

5. Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:3001`

### Frontend Setup

1. Create a new React app:
```bash
npx create-react-app vibe-commerce-frontend
cd vibe-commerce-frontend
```

2. Install Tailwind CSS:
```bash
npm install -D tailwindcss
npx tailwindcss init
```

3. Configure Tailwind in `tailwind.config.js`:
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Add Tailwind directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Install lucide-react for icons:
```bash
npm install lucide-react
```

6. Replace `src/App.js` with the frontend React component code

7. Start the frontend:
```bash
npm start
```

App will run on `http://localhost:3000`

## API Endpoints

### Products
- **GET** `/api/products`
  - Returns all available products
  - Response: `{ products: [...] }`

### Cart
- **GET** `/api/cart?userId=user_1`
  - Get cart items with total
  - Response: `{ cartItems: [...], total: 123.45 }`

- **POST** `/api/cart`
  - Add item to cart
  - Body: `{ productId: 1, quantity: 2 }`
  - Response: `{ message: "Item added", cartId: 1 }`

- **PUT** `/api/cart/:id`
  - Update item quantity
  - Body: `{ quantity: 3 }`
  - Response: `{ message: "Cart updated", quantity: 3 }`

- **DELETE** `/api/cart/:id`
  - Remove item from cart
  - Response: `{ message: "Item removed" }`

### Checkout
- **POST** `/api/checkout`
  - Process order
  - Body: `{ cartItems: [...], customerName: "John", customerEmail: "john@example.com" }`
  - Response: `{ orderId, total, timestamp, items, message }`

### Orders (Bonus)
- **GET** `/api/orders?userId=user_1`
  - Get order history
  - Response: `{ orders: [...] }`

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  description TEXT
)
```

### Cart Table
```sql
CREATE TABLE cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  userId TEXT DEFAULT 'user_1',
  FOREIGN KEY (productId) REFERENCES products(id)
)
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
)
```

## Features Implemented

### Core Requirements
- ✅ 8 mock products with images, names, prices, descriptions
- ✅ Add to cart with quantity management
- ✅ Remove items from cart
- ✅ Update quantities (increment/decrement)
- ✅ Real-time total calculation
- ✅ Checkout form with name and email
- ✅ Order confirmation receipt with all details
- ✅ Fully responsive design
- ✅ Clean, modern UI with gradients

### Bonus Features
- ✅ SQLite database persistence
- ✅ Order history tracking
- ✅ Error handling with user-friendly messages
- ✅ Loading states
- ✅ Cart badge with item count
- ✅ Smooth animations and transitions
- ✅ Product images from Unsplash
- ✅ Update cart quantities directly
- ✅ Empty cart state handling

## Testing the Application

1. **View Products**: Homepage displays 8 products in a grid
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Open Cart**: Click cart icon in header to view cart sidebar
4. **Manage Quantities**: Use +/- buttons to adjust quantities
5. **Remove Items**: Click X button to remove items
6. **Checkout**: Click "Proceed to Checkout" when ready
7. **Complete Order**: Fill in name and email, click "Place Order"
8. **View Receipt**: See order confirmation with order ID and details

## Project Structure

```
Mock-commerce/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
└── frontend/
    ├── src/
    │   ├── services/
    │       ├── api.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── package.json
    ├── tailwind.config.js
    └── node_modules/
```

## Notes

- Database is in-memory (`:memory:`) for demo purposes. For production, use a file-based database: `new sqlite3.Database('./database.db')`
- Mock user ID `user_1` is used. In production, implement proper authentication
- No payment processing - this is a mock checkout flow
- Images are from Unsplash CDN
- CORS is enabled for all origins (restrict in production)

## Future Enhancements

- User authentication & sessions
- Real payment gateway integration (Stripe, PayPal)
- Product search & filtering
- Product categories
- Wishlist functionality
- Order tracking
- Admin dashboard
- Email notifications
- Inventory management
- Product reviews & ratings

---

**Built with ❤️ by @mani-shashi**