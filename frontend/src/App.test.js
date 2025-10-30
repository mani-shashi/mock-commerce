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