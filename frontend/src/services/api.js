const API_BASE = 'http://localhost:3001/api';

class ApiService {
  async fetchProducts() {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  async fetchCart() {
    const response = await fetch(`${API_BASE}/cart`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  }

  async addToCart(productId, quantity = 1) {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  }

  async updateCartItem(cartId, quantity) {
    const response = await fetch(`${API_BASE}/cart/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  }

  async removeFromCart(cartId) {
    const response = await fetch(`${API_BASE}/cart/${cartId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  }

  async checkout(cartItems, customerName, customerEmail) {
    const response = await fetch(`${API_BASE}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems, customerName, customerEmail })
    });
    if (!response.ok) throw new Error('Checkout failed');
    return response.json();
  }

  async fetchOrders() {
    const response = await fetch(`${API_BASE}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }
}

const apiService = new ApiService();
export default apiService();