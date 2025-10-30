import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import FakeStoreProductGrid from './components/FakeStoreProductGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import ErrorToast from './components/ErrorToast';
import useProducts from './hooks/useProducts';
import useFakeStoreProducts from './hooks/useFakeStoreProducts';
import useCart from './hooks/useCart';
import useFakeStoreCart from './hooks/useFakeStoreCart';
import apiService from './services/api';

function App() {
  const [isUsingFakeStore, setIsUsingFakeStore] = useState(false);
  const { products, loading } = useProducts();
  const { products: fakeStoreProducts, loading: fakeStoreLoading, fetchProducts: fetchFakeStoreProducts } = useFakeStoreProducts();
  const { 
    cart: regularCart, 
    cartTotal: regularCartTotal, 
    addToCart: regularAddToCart, 
    updateQuantity: regularUpdateQuantity, 
    removeFromCart: regularRemoveFromCart, 
    refreshCart: regularRefreshCart
  } = useCart();
  const {
    cart: fakeStoreCart,
    cartTotal: fakeStoreCartTotal,
    addToCart: fakeStoreAddToCart,
    updateQuantity: fakeStoreUpdateQuantity,
    removeFromCart: fakeStoreRemoveFromCart,
    refreshCart: fakeStoreRefreshCart,
    checkout: fakeStoreCheckout
  } = useFakeStoreCart();
  
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState({ name: '', email: '' });

  const handleAddToCart = async (productId) => {
    try {
      if (isUsingFakeStore) {
        await fakeStoreAddToCart(productId);
      } else {
        await regularAddToCart(productId);
      }
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await handleRemoveFromCart(itemId);
        return;
      }

      if (isUsingFakeStore) {
        await fakeStoreUpdateQuantity(itemId, newQuantity);
      } else {
        await regularUpdateQuantity(itemId, newQuantity);
      }
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      if (isUsingFakeStore) {
        await fakeStoreRemoveFromCart(itemId);
      } else {
        await regularRemoveFromCart(itemId);
      }
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (!customerData.name || !customerData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      let data;
      if (isUsingFakeStore) {
        data = await fakeStoreCheckout({
          name: customerData.name,
          email: customerData.email
        });
      } else {
        data = await apiService.checkout(regularCart, customerData.name, customerData.email);
        await regularRefreshCart();
      }
      
      const formattedItems = (isUsingFakeStore ? fakeStoreCart : regularCart).map(item => ({
        ...item,
        name: item.name || item.title,
        title: item.title || item.name
      }));

      setReceipt({
        ...data,
        customerName: customerData.name,
        customerEmail: customerData.email,
        items: formattedItems,
        total: isUsingFakeStore ? fakeStoreCartTotal : regularCartTotal
      });
      
      setShowCheckout(false);
      setShowReceipt(true);
      setCustomerData({ name: '', email: '' });
      
      if (isUsingFakeStore) {
        await fakeStoreRefreshCart();
      } else {
        await regularRefreshCart();
      }
    } catch (err) {
      setError('Checkout failed');
    }
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-cyan-600">Loading...</div>
      </div>
    );
  }

  const currentCart = isUsingFakeStore ? fakeStoreCart : regularCart;
  const currentCartTotal = isUsingFakeStore ? fakeStoreCartTotal : regularCartTotal;

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white-50">
        <Header cartItemCount={currentCart.length} onCartClick={() => setShowCart(true)} />
        
        <ErrorToast message={error} onClose={() => setError(null)} />
        
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-block px-4 py-2 mr-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsUsingFakeStore(false)}
          >
            Regular Products
          </Link>
          <Link 
            to="/fakestoreproducts" 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => {
              setIsUsingFakeStore(true);
              fetchFakeStoreProducts();
            }}
          >
            Load Fake Store
          </Link>
        </div>
        
        <Routes>
          <Route path="/" element={<ProductGrid products={products} onAddToCart={handleAddToCart} />} />
          <Route 
            path="/fakestoreproducts" 
            element={
              fakeStoreLoading ? (
                <div className="text-center py-8">Loading Fake Store products...</div>
              ) : (
                <FakeStoreProductGrid products={fakeStoreProducts} onAddToCart={handleAddToCart} />
              )
            } 
          />
        </Routes>
        
        <CartSidebar
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          cart={currentCart}
          cartTotal={currentCartTotal}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleProceedToCheckout}
        />
        
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          cart={currentCart}
          cartTotal={currentCartTotal}
          customerData={customerData}
          onCustomerDataChange={setCustomerData}
          onSubmit={handleCheckout}
        />
        
        <ReceiptModal
          isOpen={showReceipt}
          receipt={receipt}
          onClose={() => setShowReceipt(false)}
        />
      </div>
    </Router>
  );
}

export default App;