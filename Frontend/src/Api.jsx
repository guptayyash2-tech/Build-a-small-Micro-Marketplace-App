import axios from 'axios';

export const Api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Automatically attach token to every request
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export const SetAuthToken = (token) => {
  if (token) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Api.defaults.headers.common["Authorization"];
  }
};

export const Register = async (userData) => {
  try {
    const response = await Api.post('/register', userData);    
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};

export const Login = async (credentials) => {
  try {
    const response = await Api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetUserProfile = async () => {
  try {
    const response = await Api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};

export const GetProducts = async () => {
  try {
    const response = await Api.get('/products/get');
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};
 export const GetProductById = async (id) => {
  try {
    const response = await Api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


