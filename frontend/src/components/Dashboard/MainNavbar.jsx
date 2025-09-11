import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MainNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg py-4 px-10 flex justify-between items-center rounded-b-2xl"
    >
      {/* Logo animé */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-400 relative group"
        >
          🌐 Albo Cloud
          {/* underline animé */}
          <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-400 group-hover:w-full transition-all duration-500"></span>
        </Link>
      </motion.div>

      {/* Boutons */}
      <div className="flex space-x-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="relative px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-400 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 animate-pulse transition duration-500"></span>
            <span className="relative z-10">Accedi</span>
          </Link>
        </motion.div>

        {/* Exemple futur bouton register */}
        {/*
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="relative px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover:opacity-100 animate-pulse transition duration-500"></span>
            <span className="relative z-10">Registrati</span>
          </Link>
        </motion.div>
        */}
      </div>
    </motion.nav>
  );
};

export default MainNavbar;




