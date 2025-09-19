import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiPrinter } from "react-icons/fi";
import { motion } from "framer-motion";

const OrdiniTable = ({ ordini, deleteOrdine }) => {
  if (!ordini || ordini.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-400 py-16 text-xl font-medium"
      >
        Nessun ordine trovato.
      </motion.div>
    );
  }

  const handleStampa = async (ordineId, ordineNumero) => {
    try {
      const token = localStorage.getItem("token"); // si JWT
      const response = await fetch(`http://localhost:3000/api/ordini/${ordineId}/stampa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Erreur PDF: ${response.status}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ordine_${ordineNumero}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur PDF:", error);
      alert("Impossible de télécharger le PDF");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {ordini.map((ordine, index) => (
        <motion.div
          key={ordine.id} // ✅ utiliser id de PostgreSQL
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 transition-all cursor-pointer"
        >
          {/* Infos Ordine */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 tracking-wide">
              Ordine #{ordine.numero}
            </h3>
            <span className="mt-2 inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Attivo
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {/* Edit */}
            <Link
              to={`/admin-dashboard/ordini/${ordine.id}/edit`}
              className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
              title="Modifica"
            >
              <FiEdit size={18} />
            </Link>

            {/* Stampa */}
            <button
              onClick={() => handleStampa(ordine.id, ordine.numero)}
              className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
              title="Stampa Ordine"
            >
              <FiPrinter size={18} />
            </button>

            {/* Delete */}
            <button
              onClick={() => deleteOrdine(ordine.id)}
              className="p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
              title="Elimina"
            >
              <FiTrash2 size={18} />
            </button>

            {/* View */}
            <Link
  to={`/admin-dashboard/ordini/${ordine.id}/anagrafica`}
  className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
  title="Anagrafiche"
>
  <FiEye size={18} />
</Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OrdiniTable;

