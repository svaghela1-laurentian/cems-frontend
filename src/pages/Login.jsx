import React, { useState } from "react";  
import { useNavigate, Link } from "react-router-dom";  
import { useDispatch } from "react-redux";  
import { setUser } from "../store/authSlice"; 
import { login } from "../services/authService"; 

const Login = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);  
      const { token, user } = res;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch user data to the store
      dispatch(setUser({ user, token }));

      // Navigate to the home page
      navigate("/");  
    } catch (error) {
      console.error("Login failed:", error);
      
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <form className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl space-y-5" onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-center text-blue-700">Login</h2>
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
