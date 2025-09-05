// src/components/Dashboard/Navbar.jsx
import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirection vers Home
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 
                 bg-white/20 backdrop-blur-2xl border-b border-white/20 
                 shadow-lg px-10 py-5 flex items-center justify-between"
    >
      {/* Logo avec gradient animé */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        className="text-3xl font-extrabold tracking-wider select-none 
                   bg-clip-text text-transparent 
                   bg-gradient-to-r from-teal-400 via-green-400 to-lime-400 
                   animate-gradient-x drop-shadow-md"
      >
        🚀 Albo Cloud
      </motion.div>

      {/* Utilisateur + Bouton */}
      <div className="flex items-center gap-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-800 font-medium select-none text-lg"
        >
          👋 Ciao,{" "}
          <span className="font-semibold text-gray-900">{user?.name}</span>
        </motion.span>

        {/* Bouton logout futuriste */}
        <motion.button
          onClick={handleLogout}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-3 rounded-2xl 
                     bg-gradient-to-br from-teal-400 via-green-400 to-lime-400 
                     text-white shadow-xl overflow-hidden group"
          aria-label="Logout"
          title="Esci"
        >
          {/* Effet pulse au hover */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500 rounded-2xl"></span>
          <LogOut size={22} className="relative z-10" />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
