# Mock Commerce - Full-Stack Shopping Cart Application

A modern, full-stack e-commerce shopping cart application built with React, Node.js/Express, and SQLite. This project demonstrates complete CRUD operations, RESTful API design, and responsive UI/UX for e-commerce flows.

![Mock Commerce](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4+-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat&logo=sqlite&logoColor=white)

## 🚀 Features

### Core Functionality
- ✅ Browse products with detailed information
- ✅ Add items to cart with quantity management
- ✅ Update cart quantities (increment/decrement)
- ✅ Remove items from cart
- ✅ Real-time cart total calculation
- ✅ Customer checkout with form validation
- ✅ Order confirmation with receipt
- ✅ Responsive design for all devices

### Technical Highlights
- **Backend**: RESTful API with Express.js
- **Database**: SQLite with proper schema and relationships
- **Frontend**: React with hooks and modular component architecture
- **Styling**: Tailwind CSS with modern gradient design
- **State Management**: Custom hooks for data management
- **Error Handling**: Comprehensive error handling on both ends
- **Modular Architecture**: Clean separation of concerns

## 📁 Project Structure

```
mock-commerce/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Error handling middleware
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js 4.18+
- **Database**: SQLite3
- **Middleware**: CORS, express.json()

### Frontend
- **Framework**: React 18+
- **Styling**: Tailwind CSS 3+
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **Build Tool**: Create React App

## ⚡ Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Git

### Clone the Repository

```bash
git clone https://github.com/mani-shashi/mock-commerce.git
cd mock-commerce
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend will run on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

The backend API will be available at:
```
http://localhost:3001/api
```

## 📚 API Documentation

### Products
- `GET /api/products` - Get all products

### Cart
- `GET /api/cart` - Get cart items with total
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout and create order
- `GET /api/orders` - Get order history (bonus)

For detailed API documentation, see [backend/README.md](backend/README.md)

## 🧪 Testing the Application

1. **View Products**: Browse the product grid on the homepage
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Manage Cart**: Click the cart icon to view and manage items
4. **Update Quantities**: Use +/- buttons to adjust quantities
5. **Remove Items**: Click the X button to remove items
6. **Checkout**: Click "Proceed to Checkout"
7. **Complete Order**: Fill in name and email, submit order
8. **View Receipt**: See order confirmation with details

## 📦 Available Scripts

### Backend
```bash
npm start       # Start the server
npm run dev     # Start with nodemon (development)
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## 🔧 Configuration

### Backend Configuration
- **Port**: Default `3001` (configurable via `PORT` environment variable)
- **Database**: In-memory SQLite (change in `config/database.js` for persistence)
- **CORS**: Enabled for all origins (restrict in production)

### Frontend Configuration
- **API Base URL**: `http://localhost:3001/api` (configurable in `services/api.js`)
- **Port**: Default `3000`

## 🌟 Features Breakdown

### Implemented Requirements
- ✅ GET /api/products - Returns 8 mock products
- ✅ POST /api/cart - Add items with quantity
- ✅ DELETE /api/cart/:id - Remove items
- ✅ GET /api/cart - Get cart with total
- ✅ POST /api/checkout - Process checkout with customer info
- ✅ Product grid with "Add to Cart"
- ✅ Cart view with quantity controls
- ✅ Checkout form with validation
- ✅ Receipt modal with order details
- ✅ Responsive design

### Bonus Features
- ✅ SQLite database persistence
- ✅ Order history tracking
- ✅ Modular component architecture
- ✅ Custom React hooks
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Modern gradient UI design
- ✅ Cart badge with item count

## 🚧 Development

### Adding New Products
Edit `backend/config/seedData.js` and add products to the array.

### Changing Database
Modify `backend/config/database.js`:
```javascript
// From in-memory
const db = new sqlite3.Database(':memory:');

// To file-based
const db = new sqlite3.Database('./database.db');
```


## 🎯 Future Enhancements

- [ ] User authentication & authorization
- [ ] Real payment gateway integration (Stripe/PayPal)
- [ ] Product search & filtering
- [ ] Product categories
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Inventory management
- [ ] Product reviews & ratings
- [ ] Multi-currency support

## 📸 Screenshots

### Homepage
Modern product grid with gradient design and hover effects.

### Shopping Cart
Slide-out cart sidebar with quantity controls and live total calculation.

### Checkout
Clean checkout form with order summary.

### Order Confirmation
Beautiful receipt modal with order details.

---

Built with ❤️ for Vibe Commerce screening