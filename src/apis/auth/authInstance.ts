import axios from 'axios';

const AuthInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    accept: 'application/json',
  },
});

export default AuthInstance;
