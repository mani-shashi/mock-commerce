# Vibe Commerce - Frontend

Modern, responsive React frontend for the Vibe Commerce shopping cart application with Tailwind CSS styling.

## 🏗️ Architecture

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # App header with cart button
│   │   ├── ProductCard.jsx  # Individual product display
│   │   ├── ProductGrid.jsx  # Products grid layout
│   │   ├── CartItem.jsx     # Single cart item component
│   │   ├── CartSidebar.jsx  # Cart slide-out panel
│   │   ├── CheckoutModal.jsx# Checkout form modal
│   │   ├── ReceiptModal.jsx # Order confirmation modal
│   │   └── ErrorToast.jsx   # Error notification toast
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useProducts.js   # Products data fetching
│   │   └── useCart.js       # Cart state management
│   │
│   ├── services/            # API integration
│   │   └── api.js           # API service layer
│   │
│   ├── App.js               # Main application component
│   ├── index.js             # React entry point
│   └── index.css            # Global styles & Tailwind
│
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Backend server running on `http://localhost:3001`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mani-shashi/mock-commerce.git
cd mock-commerce/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Application will open at `http://localhost:3000`

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",           // React library
  "react-dom": "^18.2.0",       // React DOM rendering
  "lucide-react": "^0.263.1"    // Icon library
}
```

### Styling
```json
{
  "tailwindcss": "^3.3.0",      // Utility-first CSS
  "autoprefixer": "^10.4.14",   // CSS vendor prefixing
  "postcss": "^8.4.24"          // CSS processing
}
```

### Development Tools
```json
{
  "react-scripts": "5.0.1",     // Create React App scripts
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^5.16.5"
}
```

## 🎨 Components Overview

### Header.jsx
Top navigation bar with cart button and badge.

**Props:**
- `cartItemCount` (number) - Number of items in cart
- `onCartClick` (function) - Handler for cart button click

### ProductCard.jsx
Individual product display card with image, details, and add to cart button.

**Props:**
- `product` (object) - Product data
- `onAddToCart` (function) - Handler for add to cart action

### ProductGrid.jsx
Grid layout for displaying all products.

**Props:**
- `products` (array) - Array of product objects
- `onAddToCart` (function) - Add to cart handler

### CartItem.jsx
Single cart item with quantity controls and remove button.

**Props:**
- `item` (object) - Cart item data
- `onUpdateQuantity` (function) - Quantity update handler
- `onRemove` (function) - Remove item handler

### CartSidebar.jsx
Slide-out sidebar displaying cart contents and checkout button.

**Props:**
- `isOpen` (boolean) - Sidebar visibility
- `onClose` (function) - Close handler
- `cart` (array) - Array of cart items
- `cartTotal` (number) - Total cart value
- `onUpdateQuantity` (function) - Quantity update handler
- `onRemove` (function) - Remove item handler
- `onCheckout` (function) - Checkout handler

### CheckoutModal.jsx
Modal with customer information form for checkout.

**Props:**
- `isOpen` (boolean) - Modal visibility
- `onClose` (function) - Close handler
- `cart` (array) - Cart items
- `cartTotal` (number) - Total amount
- `customerData` (object) - Customer name and email
- `onCustomerDataChange` (function) - Form data handler
- `onSubmit` (function) - Checkout submit handler

### ReceiptModal.jsx
Order confirmation modal showing receipt details.

**Props:**
- `isOpen` (boolean) - Modal visibility
- `receipt` (object) - Order receipt data
- `onClose` (function) - Close handler

### ErrorToast.jsx
Toast notification for error messages.

**Props:**
- `message` (string) - Error message
- `onClose` (function) - Close handler

## 🪝 Custom Hooks

### useProducts
Fetches and manages products data.

**Returns:**
```javascript
{
  products: [],      // Array of products
  loading: false,    // Loading state
  error: null        // Error message
}
```

**Usage:**
```javascript
import useProducts from './hooks/useProducts';

function Component() {
  const { products, loading, error } = useProducts();
  // ...
}
```

### useCart
Manages cart state and operations.

**Returns:**
```javascript
{
  cart: [],              // Array of cart items
  cartTotal: 0,          // Total cart value
  addToCart: (id) => {}, // Add item function
  updateQuantity: (id, qty) => {}, // Update quantity
  removeFromCart: (id) => {},      // Remove item
  refreshCart: () => {}  // Refresh cart data
}
```

**Usage:**
```javascript
import useCart from './hooks/useCart';

function Component() {
  const { cart, cartTotal, addToCart } = useCart();
  // ...
}
```

## 🌐 API Service

### services/api.js

Centralized API calls to backend.

**Methods:**

```javascript
// Fetch all products
await apiService.fetchProducts()

// Fetch cart
await apiService.fetchCart()

// Add to cart
await apiService.addToCart(productId, quantity)

// Update cart item
await apiService.updateCartItem(cartId, quantity)

// Remove from cart
await apiService.removeFromCart(cartId)

// Process checkout
await apiService.checkout(cartItems, name, email)

// Get order history
await apiService.fetchOrders()
```

**Configuration:**
```javascript
// Change API base URL
const API_BASE = 'http://localhost:3001/api';
```

## 🎨 Styling with Tailwind

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add custom colors, spacing, etc.
    },
  },
  plugins: [],
}
```

### Global Styles

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}
```

### Common Tailwind Classes Used

- **Layout**: `flex`, `grid`, `container`, `mx-auto`
- **Spacing**: `p-4`, `m-6`, `gap-4`, `space-y-4`
- **Colors**: `bg-purple-600`, `text-white`, `text-gray-800`
- **Typography**: `font-bold`, `text-2xl`, `font-semibold`
- **Effects**: `shadow-lg`, `rounded-lg`, `hover:shadow-xl`
- **Responsive**: `md:grid-cols-3`, `lg:grid-cols-4`

## 🖥️ Available Scripts

### Development
```bash
npm start           # Start development server (port 3000)
npm test            # Run tests in watch mode
npm run build       # Build for production
npm run eject       # Eject from Create React App (irreversible)
```

### Linting & Formatting
```bash
npm run lint        # Run ESLint
npm run format      # Format with Prettier
```

## ⚙️ Configuration

### Change API Base URL

```javascript
// src/services/api.js
const API_BASE = 'https://your-api-domain.com/api';
```

### Configure Proxy (Development)

Add to `package.json`:
```json
{
  "proxy": "http://localhost:3001"
}
```

Then update API calls:
```javascript
const API_BASE = '/api';
```

## 🎯 Features

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Hamburger menu for mobile (if needed)

### State Management
- Local component state with `useState`
- Custom hooks for shared logic
- No Redux needed for this scope

### Error Handling
- Try-catch blocks in all async operations
- User-friendly error messages
- Toast notifications for errors

### Loading States
- Loading spinner during data fetch
- Skeleton screens (can be added)
- Disabled buttons during operations

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Writing Tests

```javascript
// Example test for ProductCard
import { render, screen } from '@testing-library/react';
import ProductCard from './components/ProductCard';

test('renders product name', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    price: 99.99
  };
  render(<ProductCard product={product} onAddToCart={() => {}} />);
  expect(screen.getByText('Test Product')).toBeInTheDocument();
});
```

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

Creates optimized production build in `build/` folder.

---

For backend documentation, see [../backend/README.md](../backend/README.md)