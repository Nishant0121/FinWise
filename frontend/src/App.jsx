import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Home from "./pages/home";
import LandingPage from "./pages/landing";
import Register from "./pages/register";
import Login from "./pages/login";
import axios from "axios";
import { AppContext } from "./context";
import Profile from "./pages/profile";
import { useContext } from "react";
import Budget from "./pages/budget";
import Debt from "./pages/debt";
import Education from "./pages/education";
import Analytics from "./pages/analytics";

// Set Axios defaults
axios.defaults.baseURL = "https://finwise-9owx.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const { authUser } = useContext(AppContext);

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Layout /> : <LandingPage />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/home"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/profile"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Profile />} />
        </Route>
        <Route
          path="/budget"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Budget />} />
        </Route>
        <Route
          path="/debt"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Debt />} />
        </Route>
        <Route
          path="/education"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Education />} />
        </Route>
        <Route
          path="/analytics"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Analytics />} />
        </Route>

        <Route path="/about" element={<Layout />}>
          <Route index element={<h1>About</h1>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/home" /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
