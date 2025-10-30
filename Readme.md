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


you can also setup site in a single go, run following command

```bash
git clone https://github.com/mani-shashi/mock-commerce.git
cd mock-commerce
npm install
npm start
```

Site will run on `http://localhost:3000`



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


---

**Built with ❤️ by @mani-shashi**