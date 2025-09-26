import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AnagraficaLogs from "./AnagraficaLogs";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarAdmin";

const AuditAnagraficaPage = () => {
  const { anagraficaId } = useParams();
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/audit/anagrafica/${anagraficaId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLogs(res.data.data || []);
      } catch (err) {
        console.error("Errore caricamento log:", err);
      }
    };
    fetchLogs();
  }, [anagraficaId, token]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
          >
            ← Indietro
          </button>
          <AnagraficaLogs logs={logs} />
        </main>
      </div>
    </div>
  );
};

export default AuditAnagraficaPage;
