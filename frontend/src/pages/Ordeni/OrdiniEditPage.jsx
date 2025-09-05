// src/pages/OrdiniEditPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/Dashboard/SideBarAdmin";
import Navbar from "../../components/Dashboard/Navbar";
import { FiSave } from "react-icons/fi";

const backendURL = "http://localhost:3000/api/ordini";

const OrdiniEditPage = () => {
  const { id } = useParams();
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrdine = async () => {
      try {
        const res = await axios.get(`${backendURL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNumero(res.data.data.numero);
      } catch (err) {
        console.error(err);
        setError("Errore nel caricamento dell'ordine");
      }
    };
    fetchOrdine();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numero.trim()) {
      setError("Inserisci un numero valido!");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `${backendURL}/${id}`,
        { numero },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/admin-dashboard/ordini");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Errore durante l'aggiornamento dell'ordine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex items-center justify-center mt-24 p-6">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-12 animate-fadeIn border border-green-100">
            <h2 className="text-4xl font-extrabold text-green-700 text-center mb-10">
              Modifica Ordine
            </h2>

            {error && (
              <div className="bg-red-100 text-red-700 px-6 py-3 rounded-xl mb-8 shadow text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2 text-lg">
                  Numero Ordine
                </label>
                <input
                  type="text"
                  placeholder="Es. ORD-2025-001"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="border border-green-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg placeholder-gray-400 transition shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 bg-green-400 hover:bg-green-500 text-white px-8 py-4 rounded-2xl shadow-lg font-semibold text-lg transition duration-300 disabled:opacity-50"
              >
                <FiSave size={22} />
                {loading ? "Aggiornamento..." : "Salva Ordine"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdiniEditPage;
