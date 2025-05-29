import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response unwrapping
api.interceptors.response.use(
  response => {
    // If response has a status and data structure, return just the data
    if (response.data && response.data.status === 'success' && response.data.data) {
      response.data = response.data.data;
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const APIService = {
  // Auth endpoints
  login: (loginData: { login: string; password: string }) => 
    api.post('/login', loginData),

  register: (userData: { name: string; email: string; password: string; phone_number: string; password_confirmation: string }) =>
    api.post('/register', userData),

  logout: () =>
    api.post('/logout'),
    
  getUser: () =>
    api.get('/user'),

  updateProfile: (profileData: { name: string; email: string }) =>
    api.put('/profile', profileData),

  updatePassword: (passwordData: { current_password: string; new_password: string; new_password_confirmation: string }) =>
    api.put('/user/password', passwordData),
    
  // Product endpoints
  getProducts: (page = 1, perPage = 12) =>
    api.get('/products', { params: { page, per_page: perPage }}),

  getProduct: (id: number | string) =>
    api.get(`/products/${id}`),
    
  searchProducts: (params: {
    q?: string;
    min_price?: number;
    max_price?: number;
    vendor_id?: number;
    featured?: boolean;
    in_stock?: boolean;
    sort_by?: string;
    sort_direction?: string;
    page?: number;
    per_page?: number;
  } = {}) => 
    api.get('/products/search', { params }),

  getFeaturedProducts: () =>
    api.get('/products/featured'),
    
  getRelatedProducts: (productId: number | string) =>
    api.get(`/products/${productId}/related`),
    
  // Cart endpoints
  getCart: () =>
    api.get('/cart'),

  addToCart: (productId: number, quantity: number = 1) =>
    api.post('/cart/add', { product_id: productId, quantity }),
    
  updateCartItem: (itemId: number, quantity: number) =>
    api.put(`/cart/items/${itemId}`, { quantity }),
    
  removeCartItem: (itemId: number) =>
    api.delete(`/cart/items/${itemId}`),
    
  clearCart: () =>
    api.delete('/cart/clear'),
    
  getCartCount: () =>
    api.get('/cart/count'),

  // Category endpoints  
  getCategories: () => 
    api.get('/categories'),

  getProductsByCategory: (categoryId: number) =>
    api.get(`/categories/${categoryId}/products`),
    
  // Wishlist endpoints
  getWishlist: () =>
    api.get('/wishlist'),
    
  addToWishlist: (productId: number) =>
    api.post('/wishlist/add', { product_id: productId }),
    
  removeFromWishlist: (itemId: number) =>
    api.delete(`/wishlist/items/${itemId}`),
    
  clearWishlist: () =>
    api.delete('/wishlist/clear'),
    
  checkWishlistItem: (productId: number) =>
    api.get(`/wishlist/check/${productId}`),
    
  getWishlistCount: () =>
    api.get('/wishlist/count'),

  // Order endpoints
  getOrders: (page = 1, perPage = 10) => 
    api.get('/orders', { params: { page, per_page: perPage }}),

  createOrder: (orderData: {
    shipping_name?: string;
    shipping_address_line1?: string;
    shipping_address_line2?: string;
    shipping_city?: string;
    shipping_state?: string;
    shipping_postal_code?: string;
    shipping_country?: string;
    shipping_phone?: string;
    payment_method?: string;
    notes?: string;
    shipping_address_id?: number;
  }) => 
    api.post('/orders', orderData),

  getOrder: (id: number) =>
    api.get(`/orders/${id}`),

  cancelOrder: (id: number, reason?: string) =>
    api.post(`/orders/${id}/cancel`, { reason }),

  getRecentOrders: (limit = 5) =>
    api.get('/orders/recent', { params: { limit }}),

  getOrderStats: () =>
    api.get('/orders/stats'),
};

export default APIService;