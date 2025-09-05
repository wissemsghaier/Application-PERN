// src/components/Dashboard/OrdiniTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
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

  return (
    <div className="flex flex-col gap-6 p-6">
      {ordini.map((ordine, index) => (
        <motion.div
          key={ordine._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between 
                     bg-white/30 backdrop-blur-xl 
                     rounded-2xl shadow-lg 
                     border border-white/20
                     p-6 transition-all cursor-pointer"
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
            <Link
              to={`/admin-dashboard/ordini/${ordine._id}/edit`}
              className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
              title="Modifica"
            >
              <FiEdit size={18} />
            </Link>

            <button
              onClick={() => deleteOrdine(ordine._id)}
              className="p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
              title="Elimina"
            >
              <FiTrash2 size={18} />
            </button>

            <Link
              to={`/admin-dashboard/ordini/${ordine._id}`}
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center"
              title="Dettagli"
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
