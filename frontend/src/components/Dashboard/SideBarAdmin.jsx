import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { FaUserPlus, FaUsers, FaClipboardList } from "react-icons/fa";

const SideBar = () => {
  const { user } = useAuth();

  const linkBase =
    "flex items-center gap-4 py-3 px-5 rounded-xl text-sm font-medium transition-colors duration-300";

  const activeClass =
    "bg-gradient-to-r from-green-200 via-green-100 to-green-50 text-green-800 shadow-md";

  const hoverClass = "hover:bg-green-100 hover:text-green-900";

  return (
    <div className="bg-green-50 text-green-800 h-screen fixed left-0 top-0 w-64 pt-16 shadow-lg z-40 flex flex-col">
      {/* Header cliquable */}
      <NavLink
        to="/admin-dashboard"
        className="h-16 flex items-center justify-center border-b border-green-200 font-extrabold text-xl tracking-wide select-none cursor-pointer hover:bg-green-100"
      >
        Gestione Utente
      </NavLink>

      {/* Navigation */}
<nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50">
  <NavLink
    to="/register"
    className={({ isActive }) =>
      `${linkBase} ${isActive ? activeClass : hoverClass}`
    }
  >
    <FaUserPlus className="text-green-600 text-lg" />
    <span>Crea utente</span>
  </NavLink>

  <NavLink
    to="/admin-dashboard/utenti"
    className={({ isActive }) =>
      `${linkBase} ${isActive ? activeClass : hoverClass}`
    }
  >
    <FaUsers className="text-green-600 text-lg" />
    <span>Utenti</span>
  </NavLink>

  <NavLink
    to="/admin-dashboard/ordini"
    className={({ isActive }) =>
      `${linkBase} ${isActive ? activeClass : hoverClass}`
    }
  >
    <FaClipboardList className="text-green-600 text-lg" />
    <span>Ordini</span>
  </NavLink>
</nav>
    </div>
  );
};

export default SideBar;
