import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/APIService';
import Navbar from '../components/layout/Navbar';
import CheckoutForm from '../components/form/CheckoutForm';

interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    image_url: string;
    subtotal: number;
}

interface Cart {
    items: CartItem[];
    subtotal: number;
    tax: number;
    tax_rate?: number;
    total: number;
}

const CartPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0, tax: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);
    const [checkingOut, setCheckingOut] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/cart' } } });
            return;
        }

        fetchCart();
    }, [isAuthenticated, navigate]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await api.getCart();

            console.log("Cart API response:", response.data);

            let cartData: Cart;

            if (response.data) {
                const safeItems: CartItem[] = response.data.items?.map((item: any) => {
                    const product = item.product || {};

                    return {
                        id: item.id,
                        product_id: item.product_id,
                        product_name: product.name || 'Unknown Product',
                        quantity: item.quantity || 1,
                        price: product.price ? parseFloat(product.price) : 0,
                        image_url: product.main_image_path || 'https://placehold.co/100x100?text=Product',
                        subtotal: (item.quantity || 1) * (product.price ? parseFloat(product.price) : 0)
                    };
                }) || [];

                const subtotal = safeItems.reduce((sum, item) => sum + item.subtotal, 0);
                const tax_rate = 0.1;
                const tax = subtotal * tax_rate;
                const total = response.data.total ? parseFloat(response.data.total) : (subtotal + tax);

                cartData = {
                    items: safeItems,
                    subtotal,
                    tax,
                    tax_rate,
                    total
                };
            } else {
                cartData = { items: [], subtotal: 0, tax: 0, tax_rate: 0.1, total: 0 };
            }

            setCart(cartData);
            setError('');
        } catch (err) {
            setError('Failed to load your cart. Please try again later.');
            console.error('Error fetching cart:', err);
            setCart({ items: [], subtotal: 0, tax: 0, tax_rate: 0.1, total: 0 });
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            setUpdating(true);
            await api.updateCartItem(itemId, newQuantity);

            setCart(prevCart => {
                const updatedItems = prevCart.items.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
                        : item
                );

                const newSubtotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
                const newTax = newSubtotal * 0.1;
                const newTotal = newSubtotal + newTax;

                return {
                    items: updatedItems,
                    subtotal: newSubtotal,
                    tax: newTax,
                    total: newTotal
                };
            });
        } catch (err) {
            setError('Failed to update item quantity. Please try again.');
            console.error('Error updating cart item:', err);
        } finally {
            setUpdating(false);
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            setUpdating(true);
            await api.removeCartItem(itemId);

            setCart(prevCart => {
                const updatedItems = prevCart.items.filter(item => item.id !== itemId);
                const newSubtotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
                const newTax = newSubtotal * 0.1;
                const newTotal = newSubtotal + newTax;

                return {
                    items: updatedItems,
                    subtotal: newSubtotal,
                    tax: newTax,
                    total: newTotal
                };
            });
        } catch (err) {
            setError('Failed to remove item. Please try again.');
            console.error('Error removing cart item:', err);
        } finally {
            setUpdating(false);
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm('Are you sure you want to clear your cart?')) return;

        try {
            setUpdating(true);
            await api.clearCart();
            setCart({ items: [], subtotal: 0, tax: 0, total: 0 });
        } catch (err) {
            setError('Failed to clear cart. Please try again.');
            console.error('Error clearing cart:', err);
        } finally {
            setUpdating(false);
        }
    };

    const handleCheckout = () => {
        setShowCheckoutForm(true);
    };

    const handleSubmitOrder = async (formData: any) => {
        try {
            setCheckingOut(true);

            const response = await api.createOrder(formData);
            setOrderId(response.data.id);

            await api.clearCart();

            setShowCheckoutForm(false);
            setShowSuccessModal(true);

            setCart({ items: [], subtotal: 0, tax: 0, tax_rate: 0.1, total: 0 });
        } catch (err) {
            setError('Failed to process your order. Please try again.');
            console.error('Error creating order:', err);
        } finally {
            setCheckingOut(false);
        }
    };

    const SuccessModal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden transform transition-all animate-fade-in-up">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-white p-3">
                            <svg className="h-8 w-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Order Placed Successfully!</h3>
                    <p className="text-gray-600 mb-4">Your order #{orderId} has been received and is being processed.</p>

                    <div className="flex flex-col space-y-3">
                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                navigate(`/orders/${orderId}`);
                            }}
                            className="text-amber-700 font-medium"
                        >
                            View Order Details
                        </button>
                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                navigate('/');
                            }}
                            className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition duration-200"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar cartItemsCount={cart.items.length} theme="yellow" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar cartItemsCount={cart.items.length} theme="yellow" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border-l-4 border-red-500">
                        {error}
                    </div>
                )}

                {cart.items.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mx-auto text-amber-500 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition duration-200"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                            <div className="hidden md:grid md:grid-cols-6 bg-gray-100 p-4 text-gray-600 text-sm font-semibold">
                                <div className="col-span-2">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-center">Total</div>
                                <div className="text-right">Actions</div>
                            </div>

                            <div className={`divide-y divide-gray-200 ${updating ? 'opacity-70' : ''}`}>
                                {cart.items.map(item => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 p-4 items-center">
                                        <div className="col-span-2 flex items-center mb-4 md:mb-0">
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img
                                                    src={item.image_url || "https://placehold.co/100x100?text=Product"}
                                                    alt={item.product_name}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="font-medium text-gray-800">{item.product_name}</h3>
                                            </div>
                                        </div>

                                        <div className="text-center md:text-center mb-2 md:mb-0">
                                            <span className="md:hidden font-medium text-gray-700">Price: </span>
                                            <span>${(item.price ?? 0).toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center justify-center mb-4 md:mb-0">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                disabled={updating || item.quantity <= 1}
                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                                            >
                                                -
                                            </button>
                                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                disabled={updating}
                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-center md:text-center mb-2 md:mb-0">
                                            <span className="md:hidden font-medium text-gray-700">Total: </span>
                                            <span className="font-semibold text-amber-600">${(item.subtotal ?? 0).toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-center md:justify-end">
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                disabled={updating}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-start flex-wrap md:flex-nowrap">
                            <div className="w-full md:w-96 bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${(cart.subtotal ?? 0).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
                                    <span className="text-gray-600">Tax ({((cart.tax_rate ?? 0.1) * 100).toFixed(0)}%)</span>
                                    <span>${(cart.tax ?? 0).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between mb-6">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-xl font-bold text-amber-600">${(cart.total ?? 0).toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={updating || checkingOut}
                                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition duration-200 disabled:opacity-70"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {showCheckoutForm && (
                <CheckoutForm
                    onSubmit={handleSubmitOrder}
                    onCancel={() => setShowCheckoutForm(false)}
                    cart={cart}
                    isSubmitting={checkingOut}
                />
            )}

            {/* Success modal */}
            {showSuccessModal && <SuccessModal />}
        </div>
    );
};

export default CartPage;