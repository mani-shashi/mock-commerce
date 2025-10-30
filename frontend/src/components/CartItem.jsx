import React from 'react';
import { X, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-cyan-600 font-bold">₹{item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 bg-white rounded border">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CartItem;