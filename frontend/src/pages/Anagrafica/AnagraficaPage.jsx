// src/pages/AnagraficaPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiArrowLeft,
  FiFileText,
} from "react-icons/fi";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarAdmin";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AnagraficaPage = () => {
  const { ordineId } = useParams();
  const [anagrafiche, setAnagrafiche] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 👉 Récupération des anagrafiche
  const fetchAnagrafiche = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/ordini/${ordineId}/anagrafica`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnagrafiche(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error(err);
      setAnagrafiche([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnagrafiche();
  }, [ordineId]);

  // 👉 Supprimer une anagrafica
  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa anagrafica?")) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAnagrafiche();
    } catch (err) {
      console.error(err);
    }
  };

  // 👉 Export PDF d'une seule anagrafica sous forme de table
  const handleExportPDF = (a) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Scheda Anagrafica", 14, 15);

    const rows = Object.entries(a).map(([key, value]) => [key, value || "-"]);

    autoTable(doc, {
      head: [["Campo", "Valore"]],
      body: rows,
      startY: 25,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94] }, // vert
      styles: { fontSize: 10 },
    });

    doc.save(`Anagrafica_${a.id}.pdf`);
  };

  // 👉 Export PDF de toutes les anagrafiche filtrées
  const handleExportAllPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Lista delle Anagrafiche", 14, 15);

    const rows = filteredAnagrafiche.map((a, index) => [
      index + 1,
      a.an_nome || "-",
      a.ancognom || "-",
      a.ancodfis || "-",
    ]);

    autoTable(doc, {
      head: [["#", "Nome", "Cognome", "Codice Fiscale"]],
      body: rows,
      startY: 25,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94] },
      styles: { fontSize: 10 },
    });

    doc.save("Anagrafiche_All.pdf");
  };

  // 👉 Filtrage
  const filteredAnagrafiche = anagrafiche.filter((a) => {
    const term = search.toLowerCase();
    return (
      a.an_nome?.toLowerCase().includes(term) ||
      a.ancognom?.toLowerCase().includes(term) ||
      a.ancodfis?.toLowerCase().includes(term)
    );
  });

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
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow-md p-4 mb-6">
            <Link
              to="/admin-dashboard/ordini"
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium shadow-sm transition"
            >
              <FiArrowLeft size={18} /> Torna agli Ordini
            </Link>

            <div className="flex items-center w-full md:w-1/2 bg-gray-50 rounded-md px-3 py-2 border">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Cerca per nome, cognome o codice fiscale..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleExportAllPDF}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-900 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
              >
                📄 Stampa Tutto
              </button>

              <Link
                to={`/admin-dashboard/ordini/${ordineId}/anagrafica/new`}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
              >
                <FiPlus size={18} /> Aggiungi
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto bg-white rounded-lg shadow-md">
            {loading ? (
              <div className="text-center py-16 text-gray-400 text-lg animate-pulse">
                Caricamento...
              </div>
            ) : (
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-green-50 text-green-800 font-semibold uppercase">
                  <tr>
                    <th className="p-3">Nome</th>
                    <th className="p-3">Cognome</th>
                    <th className="p-3">Codice Fiscale</th>
                    <th className="p-3 text-center">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnagrafiche.length > 0 ? (
                    filteredAnagrafiche.map((a, index) => (
                      <motion.tr
                        key={a.id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-green-50 transition`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="p-3 font-medium">{a.an_nome}</td>
                        <td className="p-3">{a.ancognom}</td>
                        <td className="p-3">{a.ancodfis}</td>
                        <td className="p-3 flex justify-center gap-4">
                          <Link
                            to={`/admin-dashboard/ordini/${ordineId}/anagrafica/${a.id}/alll`}  
                            className="text-blue-500 hover:text-blue-600"
                            title="Visualizza"
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link
                            to={`/admin-dashboard/ordini/${ordineId}/anagrafica/${a.id}/edit`}
                            className="text-yellow-500 hover:text-yellow-600"
                            title="Modifica"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="text-red-500 hover:text-red-600"
                            title="Elimina"
                          >
                            <FiTrash2 size={18} />
                          </button>
                          <button
                            onClick={() => handleExportPDF(a)}
                            className="text-gray-600 hover:text-gray-900"
                            title="Stampa PDF"
                          >
                            <FiFileText size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-400">
                        Nessuna anagrafica trovata
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnagraficaPage;




















































// // 👉 Export PDF d'une seule anagrafica avec subtable
// const handleExportPDF = async (a) => {
//   try {
//     const doc = new jsPDF();
//     doc.setFontSize(14);
//     doc.text("Scheda Anagrafica", 14, 15);

//     // Tableau principal de l'anagrafica
//     const mainRows = Object.entries(a).map(([key, value]) => [key, value || "-"]);
//     autoTable(doc, {
//       head: [["Campo", "Valore"]],
//       body: mainRows,
//       startY: 25,
//       theme: "grid",
//       headStyles: { fillColor: [34, 197, 94] },
//       styles: { fontSize: 10 },
//     });

//     // Récupérer la subtable via l'API
//     const res = await axios.get(
//       `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${a.id}/subtable`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const subtable = Array.isArray(res.data) ? res.data : res.data.data || [];
//     if (subtable.length > 0) {
//       doc.addPage();
//       doc.setFontSize(14);
//       doc.text("Subtable", 14, 15);

//       // Préparer les colonnes dynamiques
//       const cols = Object.keys(subtable[0]);
//       const rows = subtable.map(row => cols.map(c => row[c] || "-"));

//       autoTable(doc, {
//         head: [cols],
//         body: rows,
//         startY: 25,
//         theme: "grid",
//         headStyles: { fillColor: [34, 197, 94] },
//         styles: { fontSize: 10 },
//       });
//     }

//     doc.save(`Anagrafica_${a.id}.pdf`);
//   } catch (err) {
//     console.error("Errore generazione PDF:", err);
//   }
// };
