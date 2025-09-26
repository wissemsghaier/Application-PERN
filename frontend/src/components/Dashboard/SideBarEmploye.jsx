import React from "react";
import { NavLink } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SideBarEmploye = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 text-green-800 h-screen fixed left-0 top-0 w-64 pt-24 shadow-xl z-50 flex flex-col">
      
      {/* Bouton principal */}
      <NavLink
        to="/employee-dashboard"
        className={({ isActive }) =>
          `mx-4 mb-8 px-6 py-3 rounded-2xl bg-green-400 text-white font-extrabold text-lg text-center shadow-neumorphism transform transition-all duration-300 hover:scale-105 hover:shadow-neumorphism-hover active:scale-95`
        }
      >
        Dashboard
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-4 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50">
        <NavLink
          to="/employee-dashboard/ordini"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 rounded-xl text-sm font-medium transition-all duration-300 
            ${
              isActive
                ? "bg-gradient-to-r from-green-200 via-green-100 to-green-50 text-green-900 shadow-lg scale-105"
                : "text-green-700 hover:bg-green-100 hover:text-green-900"
            }`
          }
        >
          <FaClipboardList className="text-lg text-green-600" />
          <span>Ordini</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-green-200 text-center text-sm text-green-600 animate-pulse">
        Employé: {user?.name || "Guest"}
      </div>

      {/* Styles supplémentaires pour effet neumorphism */}
      <style jsx>{`
        .shadow-neumorphism {
          box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15),
                      -6px -6px 12px rgba(255, 255, 255, 0.7);
        }
        .shadow-neumorphism-hover {
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2),
                      -4px -4px 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};

export default SideBarEmploye;
