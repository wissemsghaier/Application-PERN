// src/components/DataSets/DataSetTable.jsx
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const DataSetTable = ({ dataSets, handleEdit, handleDelete }) => {
  return (
    <motion.div
      className="overflow-x-auto bg-white p-6 rounded-3xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <table className="min-w-full rounded-2xl overflow-hidden">
        <thead className="bg-gradient-to-r from-green-200 to-green-100">
          <tr>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">
              Nome
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">
              Cognome
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">
              Telefono
            </th>
            <th className="py-3 px-6 text-center font-semibold text-gray-700">
              Azioni
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {dataSets?.length > 0 ? (
              dataSets.map((ds, idx) => (
                <motion.tr
                  key={idx}
                  className="border-b hover:bg-green-50 transition-colors"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {ds.anagrafica.AN_NOME}
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {ds.anagrafica.ANCOGNOM}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {ds.recapiti?.[0]?.ANTELEFO || "-"}
                  </td>
                  <td className="py-4 px-6 flex justify-center gap-3">
                    <motion.button
                      onClick={() => handleEdit(ds, idx)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-md flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Modifica"
                    >
                      <FiEdit size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-md flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Elimina"
                    >
                      <FiTrash2 size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500 italic"
                >
                  Nessun DataSet trovato.
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataSetTable;
