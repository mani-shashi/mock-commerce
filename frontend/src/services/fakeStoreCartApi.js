const FAKE_STORE_API_URL = 'https://fakestoreapi.com';

const fakeStoreCartApi = {
  getCart: async (userId = 1) => {
    try {
      const response = await fetch(`${FAKE_STORE_API_URL}/carts/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch cart from Fake Store API');
    }
  },

  addToCart: async (productId, quantity = 1, userId = 1) => {
    try {
      const response = await fetch(`${FAKE_STORE_API_URL}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString(),
          products: [{ productId, quantity }]
        })
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to add item to Fake Store cart');
    }
  },

  updateCartItem: async (productId, quantity, userId = 1) => {
    try {
      const response = await fetch(`${FAKE_STORE_API_URL}/carts/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString(),
          products: [{ productId, quantity }]
        })
      });
      if (!response.ok) throw new Error('Failed to update cart');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to update item in Fake Store cart');
    }
  },

  deleteCartItem: async (productId, userId = 1) => {
    try {

      const response = await fetch(`${FAKE_STORE_API_URL}/carts/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          date: new Date().toISOString(),
          products: []
        })
      });
      if (!response.ok) throw new Error('Failed to delete cart item');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to delete item from Fake Store cart');
    }
  },

  checkout: async (cartItems, customerInfo) => {
    try {
      const orderData = {
        orderId: `FSO-${Date.now()}`,
        orderDate: new Date().toISOString(),
        status: 'completed',
        products: cartItems.map(item => ({
          id: item.id,
          name: item.title || item.name,
          price: item.price,
          quantity: item.quantity,
          title: item.title || item.name
        }))
      };

      return orderData;
    } catch (error) {
      throw new Error('Checkout failed');
    }
  }
};

export default fakeStoreCartApi;