// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // 🔹 useNavigate ajouté
// import axios from "axios";
// import TabNavigation from "../../components/Anagrafica/TabNavigation";
// import RecapitiTab from "./Tabs/RecapitiTab";
// import ContattiTab from "./Tabs/ContattiTab";
// import AttivitaTab from "./Tabs/AttivitaTab";
// import StudiTab from "./Tabs/StudiTab";
// import AlboTab from "./Tabs/AlboTab";
// import AbilitazioniTab from "./Tabs/AbilitazioniTab";
// import TitoliTab from "./Tabs/TitoliTab";
// import PrincipaleTab from "./Tabs/PrincipaleTab"
// // import SettoriTab from "./Tabs/SettoriTab";

// import Navbar from "../../components/Dashboard/Navbar";
// import SideBar from "../../components/Dashboard/SideBarAdmin";

// // Placeholder pour les tabs non implémentés
// const Placeholder = ({ name }) => (
//   <div className="p-8 text-center text-gray-400 italic border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
//     Scheda « {name} » in fase di sviluppo...
//   </div>
// );

// const AnagraficaDetailPage = () => {
//   const { ordineId, anagraficaId, tab } = useParams(); 
//   const [activeTab, setActiveTab] = useState(tab || "principale");
//   const [anagrafica, setAnagrafica] = useState(null);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate(); // 🔹 Hook navigate pour le bouton retour

//   // Charger l’anagrafica
//   useEffect(() => {
//     const fetchAnagrafica = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/ordini/${ordineId}/anagrafica/`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const found = res.data.find(item => item.id === parseInt(anagraficaId));
//         setAnagrafica(found || null);
//       } catch (err) {
//         console.error("Errore caricamento anagrafica:", err);
//       }
//     };
//     fetchAnagrafica();
//   }, [ordineId, anagraficaId, token]);

//   // Définition des tabs
//   const tabs = [
//     { key: "principale", label: "Principale", component: <PrincipaleTab ordineId={ordineId} /> },
//     { key: "recapiti", label: "Recapiti", component: <RecapitiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//     { key: "contatti", label: "Contatti", component: <ContattiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//     { key: "attivita", label: "Attività", component: <AttivitaTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//     { key: "studi", label: "Studi", component: <StudiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    
//     // { key: "settori", label: "Settori", component: <SettoriTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//     { key: "abilitazioni", label: "Abilitazioni", component: <AbilitazioniTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//     { key: "titoli", label: "Titoli", component: <TitoliTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//     { key: "albo", label: "Albo", component: <AlboTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
//   ];

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <SideBar />

//       {/* Contenu principal */}
//       <div className="flex-1 ml-64 flex flex-col">
//         {/* Navbar */}
//         <Navbar />

//         {/* Contenu */}
//         <main className="flex-1 pt-24 px-8">
//           {/* Bouton Retour */}
//           <button
//             onClick={() => navigate(-1)} // 🔹 retourne à la page précédente
//             className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
//           >
//             ← Indietro
//           </button>

//           {/* Card de l’anagrafica */}
//           <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               {anagrafica ? `${anagrafica.an_nome} ${anagrafica.ancognom}` : `Dettaglio Anagrafica #${anagraficaId}`}
//             </h2>
//           </div>

//           {/* Tabs */}
//           <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

//           {/* Contenu du tab actif */}
//           <div className="mt-6 transition-all duration-300">
//             {tabs.find(t => t.key === activeTab)?.component}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AnagraficaDetailPage;





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Tabs
import PrincipaleTab from "./Tabs/PrincipaleTab";
import RecapitiTab from "./Tabs/RecapitiTab";
import ContattiTab from "./Tabs/ContattiTab";
import AttivitaTab from "./Tabs/AttivitaTab";
import StudiTab from "./Tabs/StudiTab";
import AlboTab from "./Tabs/AlboTab";
import AbilitazioniTab from "./Tabs/AbilitazioniTab";
import TitoliTab from "./Tabs/TitoliTab";

// Dashboard
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarAdmin";

// Tabs helper
import TabNavigation from "../../components/Anagrafica/TabNavigation";

const AnagraficaDetailPage = () => {
  const { ordineId, anagraficaId, tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || "principale");
  const [anagrafica, setAnagrafica] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        console.error("Erreur chargement anagrafica:", err);
      }
    };
    fetchAnagrafica();
  }, [ordineId, anagraficaId, token]);

  const tabs = [
    { key: "principale", label: "Principale", component: <PrincipaleTab ordineId={ordineId} /> },
    { key: "recapiti", label: "Recapiti", component: <RecapitiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "contatti", label: "Contatti", component: <ContattiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "attivita", label: "Attività", component: <AttivitaTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "studi", label: "Studi", component: <StudiTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "abilitazioni", label: "Abilitazioni", component: <AbilitazioniTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "titoli", label: "Titoli", component: <TitoliTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
    { key: "albo", label: "Albo", component: <AlboTab ordineId={ordineId} anagraficaId={anagraficaId} /> },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-8">
          {/* Bouton Retour */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
          >
            ← Indietro
          </button>

          {/* Card Anagrafica avec bouton Logs */}
          <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {anagrafica ? `${anagrafica.an_nome} ${anagrafica.ancognom}` : `Dettaglio Anagrafica #${anagraficaId}`}
            </h2>
            <button
              onClick={() => navigate(`/admin-dashboard/audit/anagrafica/${anagraficaId}`)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
            >
              📜 Logs
            </button>
          </div>

          {/* Tabs */}
          <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-6 transition-all duration-300">
            {tabs.find(t => t.key === activeTab)?.component}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnagraficaDetailPage;

