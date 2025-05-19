// src/services/APIService.tsx
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Helper function for handling fetch requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Important for cookies
    });

    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return null;
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// API methods
const api = {
  // Authentication
  login: (credentials: { email: string; password: string }) => 
    fetchWithAuth('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
  
  register: (userData: { name: string; email: string; password: string; password_confirmation: string }) => 
    fetchWithAuth('/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
  
  logout: () => 
    fetchWithAuth('/logout', { method: 'POST' }),
  
  // User profile
  getUser: () => 
    fetchWithAuth('/user'),
  
  // Products
  getProducts: () => 
    fetchWithAuth('/products'),
  
  getProduct: (id: number | string) => 
    fetchWithAuth(`/products/${id}`),
  
  // Cart
  getCart: () => 
    fetchWithAuth('/cart'),
  
  addToCart: (productId: number, quantity: number = 1) => 
    fetchWithAuth('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity })
    })
};

export default api;