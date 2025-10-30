import React, { useState } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import ErrorToast from './components/ErrorToast';
import useProducts from './hooks/useProducts';
import useCart from './hooks/useCart';
import apiService from './services/api';

function App() {
  const { products, loading } = useProducts();
  const { cart, cartTotal, addToCart, updateQuantity, removeFromCart, refreshCart } = useCart();
  
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState({ name: '', email: '' });

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      await updateQuantity(cartId, newQuantity);
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      await removeFromCart(cartId);
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
      const data = await apiService.checkout(cart, customerData.name, customerData.email);
      setReceipt(data);
      setShowCheckout(false);
      setShowReceipt(true);
      setCustomerData({ name: '', email: '' });
      await refreshCart();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white-50">
      <Header cartItemCount={cart.length} onCartClick={() => setShowCart(true)} />
      
      <ErrorToast message={error} onClose={() => setError(null)} />
      
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />
      
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        cartTotal={cartTotal}
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
  );
}

export default App;