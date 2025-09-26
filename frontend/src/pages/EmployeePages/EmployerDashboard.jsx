import React from "react";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarEmploye";
import { FiLayers, FiMessageSquare, FiClipboard } from "react-icons/fi";

const EmployerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex bg-green-50 min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 border-r border-gray-200">
        <SideBar />
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <div className="fixed top-0 left-64 right-0 z-30 bg-white shadow-md border-b border-gray-200">
          <Navbar />
        </div>

        {/* Contenu principal */}
        <main className="p-6 pt-28">
          {/* Message de bienvenue */}
          <div className="mb-6 bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h1 className="text-3xl font-extrabold text-teal-700 mb-2">
              Benvenuto, {user?.name} 👋
            </h1>
            <p className="text-gray-500 text-base">
              Qui puoi vedere i tuoi ordini assegnati e le attività recenti.
            </p>
          </div>

          {/* Encarts statistiques */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ordini in corso */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FiLayers className="text-green-500 w-6 h-6" />
                </div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  Ordini in corso
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Controlla lo stato dei tuoi ordini e rimani aggiornato.
              </p>
            </div>

            {/* Messaggi recenti */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FiMessageSquare className="text-green-500 w-6 h-6" />
                </div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  Messaggi recenti
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Visualizza le notifiche e gli aggiornamenti più recenti.
              </p>
            </div>

            {/* Attività recenti */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FiClipboard className="text-green-500 w-6 h-6" />
                </div>
                <h2 className="font-semibold text-gray-800 text-lg">
                  Attività recenti
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Tieni traccia delle ultime attività assegnate a te.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
