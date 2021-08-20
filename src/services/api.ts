import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/',

})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('@InventoryAuth:token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default api;