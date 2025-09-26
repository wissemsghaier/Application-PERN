import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarEmploye";
import axios from "axios";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeOrdini = () => {
  const { user } = useAuth();
  const [ordini, setOrdini] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdini = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/ordini/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrdini(res.data.data);
      } catch (err) {
        console.error("Erreur fetch ordini employee:", err);
      }
    };
    fetchOrdini();
  }, [user, token]);

  return (
    <div className="flex bg-green-50 min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 border-r border-gray-200">
        <SideBar />
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <div className="fixed top-0 left-64 right-0 z-30 bg-white shadow-md border-b border-gray-200">
          <Navbar />
        </div>

        {/* Contenu principal */}
        <main className="p-8 pt-28">
          <h1 className="text-3xl font-extrabold text-teal-700 mb-6">
            I tuoi ordini, {user?.name} 👋
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ordini.length > 0 ? (
              ordini.map((ordine) => (
                <div
                  key={ordine.id}
                  onClick={() =>
                    navigate(`/employee-dashboard/ordini/${ordine.id}/anagrafica`)
                  }
                  className="cursor-pointer bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition hover:bg-green-50"
                >
                  <div className="flex items-center gap-4">
                    <ClipboardList className="w-10 h-10 text-green-500" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Ordine n° {ordine.numero}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Stato:{" "}
                        <span className="font-medium text-teal-600">
                          {ordine.stato || "In corso"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                Nessun ordine assegnato.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeOrdini;
