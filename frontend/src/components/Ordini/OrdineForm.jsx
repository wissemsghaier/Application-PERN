// src/components/Ordini/OrdineForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL = "http://localhost:3000/api/ordini"; // ⚠️ Assicurati che il backend sia sulla porta corretta

const OrdineForm = ({ existingOrdine }) => {
  const [numero, setNumero] = useState(existingOrdine?.numero || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!token) {
      setError("Utente non autenticato!");
      setLoading(false);
      return;
    }

    try {
      if (existingOrdine?._id) {
        await axios.put(
          `${backendURL}/${existingOrdine._id}`,
          { numero },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          backendURL,
          { numero },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      navigate("/admin-dashboard/ordini");
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Ordine non trovato!");
      } else if (err.response?.status === 400) {
        setError(err.response.data?.error || "Errore durante l'operazione");
      } else {
        setError("Errore server: " + err.message);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-8 ml-64 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg transition-transform transform hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {existingOrdine ? "Modifica Ordine" : "Crea Nuovo Ordine"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4 shadow-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Numero Ordine</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? existingOrdine
              ? "Modifica in corso..."
              : "Creazione in corso..."
            : existingOrdine
            ? "Modifica Ordine"
            : "Crea Ordine"}
        </button>
      </form>
    </div>
  );
};

export default OrdineForm;

