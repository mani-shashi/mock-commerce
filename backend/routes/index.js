import express from 'express';
const router = express.Router();

import { getProducts, getProductById } from '../controllers/productController.js';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from '../controllers/cartController.js';
import { processCheckout } from '../controllers/checkoutController.js';

router.get('/products', getProducts);
router.get('/products/:id', getProductById);

router.get('/orders', getOrders);

router.get('/cart', getCartItems);
router.post('/cart', addCartItem);
router.put('/cart/:id', updateCartItem);
router.delete('/cart/:id', deleteCartItem);

router.post('/checkout', processCheckout);

export default router;