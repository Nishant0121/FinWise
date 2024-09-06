import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/home";
import LandingPage from "./pages/landing";
import Register from "./pages/register";
import Login from "./pages/login";
import axios from "axios";
import { useAppContext } from "./context";
import Profile from "./pages/profile";

// Set Axios defaults
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const { user, isAuthenticated } = useAppContext();

  // Render a loading state while authentication is being checked
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/profile"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Profile />} />
        </Route>

        <Route path="/about" element={<Layout />}>
          <Route index element={<h1>About</h1>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
