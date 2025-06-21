import React, { useState } from "react";  
import { Link, useLocation, useNavigate } from "react-router-dom";  
import { FaUserCircle } from "react-icons/fa";  
import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");  
    dispatch(setUser({ user: {}, token: null }));
    navigate("/login");  
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (userData && !id) {
      try {
        const user = userData;
        dispatch(setUser({ user, token }));        
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white relative">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="CEMS Logo" className="h-8 w-8 rounded-full" />
          <h1 className="text-2xl font-bold">CEMS</h1>
        </Link>
      </div>

      <div className="flex items-center space-x-4">

        <div className="relative"  ref={menuRef}>
          <FaUserCircle 
            className="text-2xl cursor-pointer" 
            onClick={() => setMenuOpen(!menuOpen)}
            title="Profile"
          />
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-10">
              {/* <Link
                to="/profile"
                className="block text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link> */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
