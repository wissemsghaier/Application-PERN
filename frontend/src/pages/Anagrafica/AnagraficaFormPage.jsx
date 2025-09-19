// src/pages/AnagraficaFormPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnagraficaForm from "../../components/Anagrafica/AnagraficaForm";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarAdmin";
import { FiUserPlus, FiArrowLeft } from "react-icons/fi";

const AnagraficaFormPage = () => {
  const { ordineId } = useParams();
  const navigate = useNavigate();

  const handleSaved = () => {
    navigate(`/admin-dashboard/ordini/${ordineId}/anagrafica`);
  };



  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 left-64 right-0 z-30">
          <Navbar />
        </div>

        {/* Page content */}
        <div className="flex flex-col mt-24 p-6 gap-6">
          {/* Header avec icône et bouton retour */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FiUserPlus className="text-green-500 text-4xl" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                {`Aggiungi Anagrafica`}
              </h1>
            </div>

            
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-4xl w-full mx-auto transition hover:shadow-2xl">
            <AnagraficaForm ordineId={ordineId} onSaved={handleSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnagraficaFormPage;

