import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;
const currencySymbol = import.meta.env.VITE_CURRENCY;

if (!baseURL) {
  console.warn("⚠️ VITE_BASE_URL is not defined in your .env file!");
}
axios.defaults.baseURL = baseURL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cars, setCars] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data');
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      } else {
        logout();
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "User fetch failed");
      logout();
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get('/api/cars');
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        toast.error("No car data available");
      }
    } catch (error) {
      toast.error("Failed to fetch cars: " + (error.message || 'Unknown error'));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('You have been logged out');
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    fetchCars();
  }, []);

  const value = {
    navigate,
    currency: currencySymbol,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
