import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TabNavigation from "../../components/Anagrafica/TabNavigation";
import RecapitiTab from "./Tabs/RecapitiTab";
import ContattiTab from "./Tabs/ContattiTab";
import AttivitaTab from "./Tabs/AttivitaTab";
import StudiTab from "./Tabs/StudiTab";
import AlboTab from "./Tabs/AlboTab";
import AbilitazioniTab from "./Tabs/AbilitazioniTab";
import TitoliTab from "./Tabs/TitoliTab";
// import SettoriTab from "./Tabs/SettoriTab";


import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarAdmin";


// Placeholder pour les tabs non implémentés
const Placeholder = ({ name }) => (
  <div className="p-8 text-center text-gray-400 italic border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
    Scheda « {name} » in fase di sviluppo...
  </div>
);

const AnagraficaDetailPage = () => {
  const { ordineId, anagraficaId } = useParams();
  const [activeTab, setActiveTab] = useState("recapiti");
  const [anagrafica, setAnagrafica] = useState(null);

  const token = localStorage.getItem("token");

  // Charger l’anagrafica
  useEffect(() => {
    const fetchAnagrafica = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/ordini/${ordineId}/anagrafica/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const found = res.data.find(item => item.id === parseInt(anagraficaId));
        setAnagrafica(found || null);
      } catch (err) {
        console.error("Errore caricamento anagrafica:", err);
      }
    };
    fetchAnagrafica();
  }, [ordineId, anagraficaId, token]);

  // Définition des tabs
  const tabs = [
    { key: "recapiti", label: "Recapiti", component: <RecapitiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "contatti", label: "Contatti", component: <ContattiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "attivita", label: "Attività", component: <AttivitaTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "studi", label: "Studi",  component: <StudiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "albo", label: "Albo", component: <AlboTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    // { key: "settori", label: "Settori", component: <SettoriTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "abilitazioni", label: "Abilitazioni", component: <AbilitazioniTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "titoli", label: "Titoli",  component: <TitoliTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Contenu principal */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Contenu */}
        <main className="flex-1 pt-24 px-8">
          {/* Card de l’anagrafica */}
          <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {anagrafica ? `${anagrafica.an_nome} ${anagrafica.ancognom}` : `Dettaglio Anagrafica #${anagraficaId}`}
            </h2>
            
          </div>

          {/* Tabs */}
          <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Contenu du tab actif */}
          <div className="mt-6 transition-all duration-300">
            {tabs.find(t => t.key === activeTab)?.component}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnagraficaDetailPage;
