import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell } from "lucide-react";
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 
                 bg-white/30 backdrop-blur-3xl border-b border-white/30 
                 shadow-md px-10 py-4 flex items-center justify-between"
    >
      {/* Logo animé avec gradient et hover glow */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        className="text-3xl font-extrabold tracking-wider select-none 
                   bg-clip-text text-transparent 
                   bg-gradient-to-r from-teal-400 via-green-400 to-lime-400 
                   animate-gradient-x drop-shadow-lg cursor-pointer"
      >
        🚀 Albo Cloud
      </motion.div>

      {/* Section utilisateur + boutons */}
      <div className="flex items-center gap-6">
        {/* Notification icon futuriste */}
        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-transform duration-300"
          title="Notifiche"
        >
          <Bell size={22} className="text-teal-500" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        </motion.button>

        {/* Greeting utilisateur */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-800 font-medium select-none text-lg"
        >
          👋 Ciao,{" "}
          <span className="font-semibold text-gray-900">{user?.name}</span>
        </motion.span>

        {/* Bouton logout moderne */}
        <motion.button
          onClick={handleLogout}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-3 rounded-2xl 
                     bg-gradient-to-br from-teal-400 via-green-400 to-lime-400 
                     text-white shadow-xl overflow-hidden group"
          aria-label="Logout"
          title="Esci"
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition duration-500 rounded-2xl"></span>
          <LogOut size={22} className="relative z-10" />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;

