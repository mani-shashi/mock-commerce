import { useState } from 'react';
import fakeStoreApiService from '../services/fakeStoreApi';

const useFakeStoreProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await fakeStoreApiService.getProducts();

      const transformedProducts = data.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        description: product.description
      }));
      setProducts(transformedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products from Fake Store');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, fetchProducts };
};

export default useFakeStoreProducts;