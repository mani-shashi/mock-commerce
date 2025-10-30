import React from 'react';
import ProductCard from './ProductCard';

const FakeStoreProductGrid = ({ products, onAddToCart }) => {
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  const processedProducts = products.map(product => ({
    ...product,
    description: truncateDescription(product.description)
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {processedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FakeStoreProductGrid;