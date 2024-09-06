import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global user state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default is false

  // Check if the user is authenticated by checking the token in cookies
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user"))); // Replace with real user data
    } else {
      setIsAuthenticated(false); // Ensure it's explicitly set to false if no token
    }
  }, []);

  // Function to log in a user and set the token in cookies
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    Cookies.set("token", token, { expires: 1 / 24 }); // Store the token (expires in 1 hour)
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
  };

  // Function to log out a user and remove the token from cookies
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("token");
    localStorage.removeItem("user"); // Clear localStorage
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
