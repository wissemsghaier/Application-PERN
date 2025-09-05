import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-xl border-b border-gray-200 shadow-lg py-4 px-10 flex justify-between items-center">
      {/* Logo / Titre */}
      <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-green-400 to-lime-400 select-none">
        🌐 Albo Cloud
      </h1>

      {/* Actions */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="relative px-6 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-teal-400 via-green-400 to-lime-400 overflow-hidden group shadow-md hover:scale-105 transition-transform duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-xl"></span>
          <span className="relative z-10">Accedi</span>
        </Link>

        {/* Exemple pour un futur bouton Register */}
        {/*
        <Link
          to="/register"
          className="relative px-6 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 overflow-hidden group shadow-md hover:scale-105 transition-transform duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-xl"></span>
          <span className="relative z-10">Registrati</span>
        </Link>
        */}
      </div>
    </nav>
  );
};

export default MainNavbar;


