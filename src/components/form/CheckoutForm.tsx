import React, { useState } from 'react';

interface CheckoutFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  cart: any;
  isSubmitting: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel, cart, isSubmitting }) => {
  const [formData, setFormData] = useState({
    shipping_name: "",
    shipping_address_line1: "",
    shipping_address_line2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_postal_code: "",
    shipping_country: "",
    shipping_phone: "",
    payment_method: "credit_card",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all animate-fade-in-up my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Checkout</h2>
              <p className="text-amber-100 text-sm">Complete your purchase</p>
            </div>
            <button 
              onClick={onCancel}
              className="text-white hover:text-amber-100 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Order Summary - Compact */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${(cart.subtotal ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({((cart.tax_rate ?? 0.1) * 100).toFixed(0)}%):</span>
                  <span>${(cart.tax ?? 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-amber-200 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-amber-600">${(cart.total ?? 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="shipping_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="shipping_name"
                    name="shipping_name"
                    value={formData.shipping_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="shipping_address_line1" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="shipping_address_line1"
                    name="shipping_address_line1"
                    value={formData.shipping_address_line1}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="shipping_address_line2" className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment, suite, etc. (Optional)
                  </label>
                  <input
                    type="text"
                    id="shipping_address_line2"
                    name="shipping_address_line2"
                    value={formData.shipping_address_line2}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Apartment, suite, floor, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="shipping_city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="shipping_city"
                    name="shipping_city"
                    value={formData.shipping_city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="City"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shipping_state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="shipping_state"
                    name="shipping_state"
                    value={formData.shipping_state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="State/Province"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shipping_postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    id="shipping_postal_code"
                    name="shipping_postal_code"
                    value={formData.shipping_postal_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="12345"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shipping_country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="shipping_country"
                    name="shipping_country"
                    value={formData.shipping_country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Country"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="shipping_phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="shipping_phone"
                    name="shipping_phone"
                    value={formData.shipping_phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment & Notes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment & Additional Info
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method *
                  </label>
                  <select
                    id="payment_method"
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
                    required
                  >
                    <option value="credit_card">💳 Credit Card</option>
                    <option value="paypal">🟦 PayPal</option>
                    <option value="bank_transfer">🏦 Bank Transfer</option>
                    <option value="cod">💵 Cash on Delivery</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                    placeholder="Special delivery instructions, gift message, etc."
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Footer Actions */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 disabled:opacity-70 transition-all font-medium flex items-center min-w-[140px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Complete Order
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;