import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Dashboard/SideBarAdmin";
import Navbar from "../../components/Dashboard/Navbar";
import { FiSave, FiClipboard, FiCheckCircle } from "react-icons/fi";

const backendURL = "http://localhost:3000/api/ordini";

const OrdiniFormPage = () => {
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
    setError(null);
    try {
      await axios.post(
        backendURL,
        { numero },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Ordine creato con successo!");
      setTimeout(() => navigate("/admin-dashboard/ordini"), 1500);
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

        {/* Main Content Vertical */}
        <div className="flex flex-col items-center w-full py-24 px-6 md:px-12 space-y-12">
          
          {/* Section Info */}
          <div className="w-full max-w-4xl bg-gradient-to-br from-green-400 via-teal-400 to-green-500 text-white rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-4 transform transition-all hover:scale-[1.02] duration-500">
            <div className="flex items-center gap-3">
              <FiClipboard size={36} />
              <h1 className="text-4xl font-extrabold">Nuovo Ordine</h1>
            </div>
            <p className="text-lg text-center opacity-90 leading-relaxed">
              Compila il modulo per creare un nuovo ordine. 
              Ogni ordine deve avere un numero unico nel formato 
              <span className="font-semibold"> ORD-YYYY-XXX</span>.
            </p>
            <div className="h-[2px] w-20 bg-white rounded-full mt-4"></div>
            <p className="text-sm opacity-80 text-center">
              Segui le istruzioni per completare la creazione dell'ordine in modo rapido e sicuro.
            </p>
          </div>

          {/* Section Form */}
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col space-y-8 transform transition-all hover:scale-[1.01] duration-500">
            
            {error && (
              <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow text-center font-medium animate-pulse">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-700 px-6 py-4 rounded-xl shadow text-center font-medium flex items-center justify-center gap-2 animate-bounce">
                <FiCheckCircle size={20} />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Numero Ordine */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2 text-lg">
                  Numero Ordine
                </label>
                <input
                  type="text"
                  placeholder="Es. ORD-2025-001"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="border border-gray-300 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-green-300 text-lg placeholder-gray-400 transition shadow-inner focus:shadow-lg focus:scale-[1.02] duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 via-teal-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg transition duration-300 disabled:opacity-50"
              >
                <FiSave size={24} />
                {loading ? "Creazione in corso..." : "Crea Ordine"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdiniFormPage;
