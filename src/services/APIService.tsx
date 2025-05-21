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

const APIService = {
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
    
  getProducts: () =>
    api.get('/products'),

  getProduct: (id: number | string) =>
    api.get(`/products/${id}`),
    
  getCart: () =>
    api.get('/cart'),

  addToCart: (productId: number, quantity: number = 1) =>
    api.post('/cart/add', { product_id: productId, quantity })
};

export default APIService;