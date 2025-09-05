// // src/pages/OrdiniDashboardPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SideBar from "../../components/Dashboard/SideBarAdmin";
// import Navbar from "../../components/Dashboard/Navbar";
// import { Link } from "react-router-dom";

// // ⚠️ Importa OrdiniTable
// import OrdiniTable from "../../components/Ordini/OrdiniTable";

// const backendURL = "http://localhost:3000/api/ordini";

// const OrdiniDashboardPage = () => {
//   const [ordini, setOrdini] = useState([]);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchOrdini();
//   }, []);

//   const fetchOrdini = async () => {
//     try {
//       const res = await axios.get(backendURL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrdini(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Errore durante il caricamento degli ordini"
//       );
//     }
//   };

//   const deleteOrdine = async (id) => {
//     if (!window.confirm("Sei sicuro di voler eliminare questo ordine?")) return;
//     try {
//       await axios.delete(`${backendURL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchOrdini();
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Errore durante l'eliminazione dell'ordine"
//       );
//     }
//   };

//   const filteredOrdini = ordini.filter((o) =>
//     o.numero.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       {/* Sidebar */}
//       <SideBar />

//       {/* Main content */}
//       <div className="flex-1 ml-64">
//         {/* Navbar */}
//         <Navbar />

//         <div className="p-8 pt-24">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestione Ordini</h1>

//           {error && (
//             <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 shadow-sm">
//               {error}
//             </div>
//           )}

//           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//             <input
//               type="text"
//               placeholder="Cerca un ordine..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-green-400 focus:outline-none"
//             />
//             <Link
//               to="/admin-dashboard/ordini/new"
//               className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
//             >
//               Aggiungi Ordine
//             </Link>
//           </div>

//           {/* Tabella Ordini */}
//           <OrdiniTable ordini={filteredOrdini} deleteOrdine={deleteOrdine} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ⚠️ Qui esporti il componente corretto
// export default OrdiniDashboardPage;
