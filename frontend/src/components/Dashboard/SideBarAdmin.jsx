// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { useAuth } from "../../context/authContext";
// import { FaUserPlus, FaUsers, FaClipboardList } from "react-icons/fa";

// const SideBar = () => {
//   const { user } = useAuth();

//   const linkBase =
//     "flex items-center gap-4 py-3 px-5 rounded-xl text-sm font-medium transition-colors duration-300";

//   const activeClass =
//     "bg-gradient-to-r from-green-200 via-green-100 to-green-50 text-green-800 shadow-md";

//   const hoverClass = "hover:bg-green-100 hover:text-green-900";

//   return (
//     <div className="bg-green-50 text-green-800 h-screen fixed left-0 top-0 w-64 pt-16 shadow-lg z-40 flex flex-col">
//       {/* Header cliquable */}
//       <NavLink
//         to="/admin-dashboard"
//         className="h-16 flex items-center justify-center border-b border-green-200 font-extrabold text-xl tracking-wide select-none cursor-pointer hover:bg-green-100"
//       >
//         Gestione Utente
//       </NavLink>

//       {/* Navigation */}
// <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50">
//   <NavLink
//     to="/register"
//     className={({ isActive }) =>
//       `${linkBase} ${isActive ? activeClass : hoverClass}`
//     }
//   >
//     <FaUserPlus className="text-green-600 text-lg" />
//     <span>Crea utente</span>
//   </NavLink>

//   <NavLink
//     to="/admin-dashboard/utenti"
//     className={({ isActive }) =>
//       `${linkBase} ${isActive ? activeClass : hoverClass}`
//     }
//   >
//     <FaUsers className="text-green-600 text-lg" />
//     <span>Utenti</span>
//   </NavLink>

//   <NavLink
//     to="/admin-dashboard/ordini"
//     className={({ isActive }) =>
//       `${linkBase} ${isActive ? activeClass : hoverClass}`
//     }
//   >
//     <FaClipboardList className="text-green-600 text-lg" />
//     <span>Ordini</span>
//   </NavLink>
// </nav>
//     </div>
//   );
// };

// export default SideBar;


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserPlus, FaUsers, FaClipboardList } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SideBar = () => {
  const { user } = useAuth();
  const [hovered, setHovered] = useState(null);

  const links = [
    { name: "Crea utente", icon: <FaUserPlus />, path: "/register" },
    { name: "Utenti", icon: <FaUsers />, path: "/admin-dashboard/utenti" },
    { name: "Ordini", icon: <FaClipboardList />, path: "/admin-dashboard/ordini" },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 text-green-800 h-screen fixed left-0 top-0 w-64 pt-24 shadow-xl z-50 flex flex-col">
      
      {/* Bouton Gestione Utente avec effet neumorphism */}
      <NavLink
        to="/admin-dashboard"
        className="mx-4 mb-8 px-6 py-3 rounded-2xl bg-green-400 text-white font-extrabold text-lg text-center shadow-neumorphism transform transition-all duration-300 hover:scale-105 hover:shadow-neumorphism-hover active:scale-95"
      >
        Gestione Utente
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-4 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className={({ isActive }) =>
              `relative flex items-center gap-4 py-3 px-5 rounded-xl text-sm font-medium transition-all duration-300 
              ${isActive ? "bg-gradient-to-r from-green-200 via-green-100 to-green-50 text-green-900 shadow-lg scale-105" : ""}
              ${hovered === idx && !isActive ? "bg-green-100 text-green-900 scale-105 shadow-md" : "text-green-700"}`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="overflow-hidden whitespace-nowrap">{link.name}</span>
            {/* Highlight bar on active */}
            {hovered === idx && (
              <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-tr-lg rounded-br-lg transition-all duration-300"></span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer animé */}
      <div className="p-4 border-t border-green-200 text-center text-sm text-green-600 animate-pulse">
        Admin: {user?.name || "Guest"}
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

export default SideBar;


