import db, { initializeDatabase } from './db.js';

const products = [
  {
    id: 1,
    name: '4K Monitor',
    price: 29868,
    image: 'https://plus.unsplash.com/premium_photo-1664699099341-b7c4229a8d97?w=400',
    description: '27-inch 4K UHD computer monitor'
  },
  {
    id: 2,
    name: 'Fitness Tracker',
    price: 1543,
    image: 'https://images.unsplash.com/photo-1665860455423-166cab57c383?w=400',
    description: 'Activity and sleep tracking wristband'    
  },
  {
    id: 3,
    name: 'Gaming Chair',
    price: 11768,
    image: 'https://images.unsplash.com/photo-1670946839270-cc4febd43b09?w=400',
    description: 'Ergonomic gaming chair with lumbar support'
  },
  {
    id: 4,
    name: 'Action Camera',
    price: 36928,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    description: 'Waterproof 4K action camera'
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 695,
    image: 'https://images.unsplash.com/photo-1619029584128-18c848f48e3d?w=400',
    description: 'Ergonomic wireless mouse'
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 849,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
    description: '7-in-1 USB-C multiport adapter'
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 4765,
    image: 'https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?w=400',
    description: 'Portable waterproof Bluetooth speaker'    
  },
  {
    id: 8,
    name: 'Desk Lamp',
    price: 829,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    description: 'LED desk lamp with touch control'
  },
  {
    id: 9,
    name: 'External Hard Drive',
    price: 7432,
    image: 'https://images.unsplash.com/photo-1624895608078-e9f564cbe3fa?w=400',
    description: '2TB portable external hard drive'
  },
  {
    id: 10,
    name: 'Phone Stand',
    price: 346,
    image: 'https://images.unsplash.com/photo-1707651385176-8c7492596164?w=400',
    description: 'Adjustable aluminum phone stand'
  },
  {
    id: 11,
    name: 'Smart Watch',
    price: 3196,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Fitness tracking smartwatch'
  },
  {
    id: 12,
    name: 'Wireless Headphones',
    price: 957,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium noise-canceling headphones'
  },
  {
    id: 13,
    name: 'Laptop Backpack',
    price: 1163,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'Durable laptop backpack with USB charging'    
  },
  {
    id: 14,
    name: 'Mechanical Keyboard',
    price: 2599,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    description: 'RGB mechanical gaming keyboard'
  },
  {
    id: 15,
    name: 'E-Reader',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    description: '6-inch glare-free e-reader'
  }
];

const loadInitialData = () => {
  const insertProduct = db.prepare('INSERT INTO products VALUES (?, ?, ?, ?, ?)');

  products.forEach(product => {
    insertProduct.run(product.id, product.name, product.price, product.image, product.description);
  });

  insertProduct.finalize(err => {
    if (err) {
      console.error('Error inserting initial data:', err);
    } else {
      console.log('Initial product data loaded successfully');
    }
  });
};

export default loadInitialData;