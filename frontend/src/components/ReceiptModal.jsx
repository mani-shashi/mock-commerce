import React from 'react';
import { Check } from 'lucide-react';

const ReceiptModal = ({ isOpen, receipt, onClose }) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-semibold">#{receipt.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer:</span>
            <span className="font-semibold">{receipt.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold text-sm">{receipt.customerEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold text-sm">
              {new Date(receipt.timestamp).toLocaleDateString()}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-cyan-600">₹{receipt.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Order Items:</h3>
          {receipt.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-cyan-600">{item.name} x{item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;