import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./User/Register";
import LoginPage from "./User/Login";
import Products from "./User/Products";
import Productid from "./User/Productid";
import Home from "./Home";
import ProtectedRoute from "./Productrote";
import { useEffect } from "react";
import { SetAuthToken } from "./Api";
import UserProfile from "./User/UserProfile";


function App() {
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      SetAuthToken(token);
    }
  }, []);
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Productid />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

  );
}

export default App;