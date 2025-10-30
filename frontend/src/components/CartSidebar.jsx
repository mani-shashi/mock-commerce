import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import CartItem from './CartItem';

const CartSidebar = ({ isOpen, onClose, cart, cartTotal, onUpdateQuantity, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>

            <div className="p-6 border-t sticky bottom-0 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-cyan-600">₹{cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;