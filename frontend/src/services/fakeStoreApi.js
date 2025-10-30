const FAKE_STORE_API_URL = 'https://fakestoreapi.com';

const fakeStoreApiService = {
  getProducts: async () => {
    try {
      const response = await fetch(`${FAKE_STORE_API_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch products from Fake Store API');
    }
  }
};

export default fakeStoreApiService;