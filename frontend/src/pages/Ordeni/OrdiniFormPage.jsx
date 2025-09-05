// src/pages/OrdiniFormPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Dashboard/SideBarAdmin";
import Navbar from "../../components/Dashboard/Navbar";
import { FiSave } from "react-icons/fi";

const backendURL = "http://localhost:3000/api/ordini";

const OrdiniFormPage = () => {
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numero.trim()) {
      setError("Inserisci un numero valido!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        backendURL,
        { numero },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/admin-dashboard/ordini");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Errore durante la creazione dell'ordine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex flex-col items-center justify-center w-full mt-24 p-6">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-12 hover:scale-105 transform transition-transform duration-500">
            
            <h2 className="text-5xl font-extrabold text-center mb-12 text-green-600">
              Aggiungi Nuovo Ordine
            </h2>

            {error && (
              <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl mb-8 shadow text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-3 text-lg">
                  Numero Ordine
                </label>
                <input
                  type="text"
                  placeholder="Es. ORD-2025-001"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="border border-gray-300 rounded-3xl px-6 py-5 focus:ring-4 focus:ring-green-300 text-lg placeholder-gray-400 transition shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-4 bg-gradient-to-r from-green-400 via-teal-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-10 py-5 rounded-3xl shadow-2xl font-bold text-lg transition duration-300 disabled:opacity-50"
              >
                <FiSave size={26} />
                {loading ? "Creazione..." : "Crea Ordine"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdiniFormPage;

