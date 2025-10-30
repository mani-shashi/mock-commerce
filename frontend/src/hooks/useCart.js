import { useState, useEffect } from 'react';
import apiService from '../services/api';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const data = await apiService.fetchCart();
      setCart(data.cartItems);
      setCartTotal(data.total);
    } catch (err) {
      console.error('Failed to load cart', err);
      throw err;
    }
  };

  const addToCart = async (productId) => {
    await apiService.addToCart(productId);
    await fetchCart();
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    await apiService.updateCartItem(cartId, newQuantity);
    await fetchCart();
  };

  const removeFromCart = async (cartId) => {
    await apiService.removeFromCart(cartId);
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cart,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    refreshCart: fetchCart
  };
};

export default useCart;