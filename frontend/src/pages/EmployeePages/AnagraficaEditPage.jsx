// src/pages/AnagraficaEditPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnagraficaForm from "../../components/Anagrafica/AnagraficaFormEmployee";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarEmploye";
import { FiEdit } from "react-icons/fi";

const AnagraficaEditPage = () => {
  const { ordineId, anagraficaId } = useParams();
  const navigate = useNavigate();

 const handleSaved = () => {
  if (ordineId && anagraficaId) 

    // Naviguer vers la bonne page
    navigate(`/employee-dashboard/ordini/${ordineId}/anagrafica/${anagraficaId}`);
  
};


  return (
   <div className="flex bg-green-50 min-h-screen">
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
        <SideBar />
      </div>
      <div className="flex-1 ml-64">
        <div className="fixed top-0 left-64 right-0 z-30">
          <Navbar />
        </div>
   
           <div className="p-8 pt-24">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow-md p-4 mb-6">
            <FiEdit className="text-yellow-500 text-3xl" />
            <h2 className="text-3xl font-bold text-gray-800">Modifica Anagrafica</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl w-full mx-auto transition hover:shadow-2xl">
            <AnagraficaForm
              ordineId={ordineId}
              anagraficaId={anagraficaId}
              onSaved={handleSaved}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnagraficaEditPage;
