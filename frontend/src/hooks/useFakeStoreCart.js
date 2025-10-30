import { useState, useEffect } from 'react';
import fakeStoreCartApi from '../services/fakeStoreCartApi';
import fakeStoreApiService from '../services/fakeStoreApi';

const useFakeStoreCart = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const fetchCartWithProducts = async () => {
    setLoading(true);
    try {
      const cartData = await fakeStoreCartApi.getCart();
      const products = await fakeStoreApiService.getProducts();
      
      const cartWithProducts = cartData.products.map(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        return {
          ...cartItem,
          ...product,
          name: product.title,
          title: product.title,
          quantity: cartItem.quantity
        };
      });

      setCart(cartWithProducts);
      setCartTotal(calculateTotal(cartWithProducts));
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    setLoading(true);
    try {
      await fakeStoreCartApi.addToCart(productId);
      await fetchCartWithProducts();
      setError(null);
    } catch (err) {
      setError('Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    setLoading(true);
    try {
      if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const currentItem = cart.find(item => item.id === productId);
      if (!currentItem) throw new Error('Item not found in cart');

      await fakeStoreCartApi.updateCartItem(1, productId, newQuantity);
      
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      setCartTotal(calculateTotal(updatedCart));
      
      await fetchCartWithProducts();
      setError(null);
    } catch (err) {
      setError('Failed to update quantity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      await fakeStoreCartApi.deleteCartItem(1);

      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      setCartTotal(calculateTotal(updatedCart));
      
      await fetchCartWithProducts();
      setError(null);
    } catch (err) {
      setError('Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (customerData) => {
    setLoading(true);
    try {
      const result = await fakeStoreCartApi.checkout(cart, customerData);
      setCart([]);
      setCartTotal(0);
      setError(null);
      return result;
    } catch (err) {
      setError('Checkout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = () => fetchCartWithProducts();

  useEffect(() => {
    fetchCartWithProducts();
  }, []);

  return {
    cart,
    cartTotal,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout,
    refreshCart
  };
};

export default useFakeStoreCart;