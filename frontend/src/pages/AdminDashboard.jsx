// import React, { useEffect } from "react";
// import { useAuth } from "../context/authContext";
// import { useNavigate, Routes, Route } from "react-router-dom";
// import Navbar from "../components/Dashboard/Navbar";
// import SideBar from "../components/Dashboard/SideBarAdmin";
// import UserTable from "../components/Users/UserTable";

// const AdminDashboard = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [user, loading, navigate]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-xl font-semibold text-teal-400 animate-pulse">
//           Caricamento...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <SideBar />
//       <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-20 pl-64">
//         <Navbar />

//         <div className="p-6">
//           <Routes>
//             {/* Pagina di benvenuto */}
//             <Route
//               index
//               element={
//                 <div className="flex justify-center items-center py-24 px-4">
//                   <div className="bg-white rounded-3xl shadow-lg p-14 w-full max-w-3xl text-center border border-gray-100">
//                     <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
//                       Benvenuto, {user?.name} 👋
//                     </h1>
//                     <p className="text-gray-600 text-lg mb-6">
//                       Sei autenticato come{" "}
//                       <span className="font-semibold text-teal-700">
//                         Amministratore
//                       </span>
//                       .
//                     </p>
//                     <p className="text-gray-500 text-md">
//                       Usa la barra laterale per navigare tra le sezioni del
//                       dashboard.
//                     </p>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Lista utenti */}
//             <Route path="utenti" element={<UserTable />} />
//           </Routes>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;




// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import SideBar from "../components/Dashboard/SideBarAdmin";
import axios from "axios";
import { User, ClipboardList, Database } from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [ordini, setOrdini] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredUsers = usersRes.data.data.filter((u) => u.role !== "admin");
      setUsers(filteredUsers);
      setTotalUsers(filteredUsers.length);

      const ordiniRes = await axios.get("http://localhost:3000/api/ordini", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdini(ordiniRes.data.data);
    } catch (err) {
      console.error("Errore dashboard:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-teal-50">
        <div className="text-xl font-semibold text-teal-500 animate-pulse">
          Caricamento...
        </div>
      </div>
    );
  }

  // Préparer les données pour le graphique
  const chartData = ordini.map((o) => ({
    ordine: o.numero,
    utenti: users.filter((u) =>
      u.assignedOrdini?.some((ao) => ao._id === o._id)
    ).length,
    datasets: o.dataSets?.length || 0,
  }));

  const totalDatasets = ordini.reduce(
    (acc, o) => acc + (o.dataSets?.length || 0),
    0
  );

  return (
    <>
      <SideBar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 pt-20 pl-64">
        <Navbar />
        <div className="p-6 max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-teal-800 mb-10 text-center">
            Benvenuto, {user?.name} 👋
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition">
              <User className="w-14 h-14 text-teal-500" />
              <div>
                <p className="text-gray-500 text-sm">Totale Utenti</p>
                <p className="text-3xl font-bold text-teal-700">{totalUsers}</p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition">
              <ClipboardList className="w-14 h-14 text-green-500" />
              <div>
                <p className="text-gray-500 text-sm">Totale Ordini</p>
                <p className="text-3xl font-bold text-green-700">
                  {ordini.length}
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition">
              <Database className="w-14 h-14 text-emerald-500" />
              <div>
                <p className="text-gray-500 text-sm">Totale Datasets</p>
                <p className="text-3xl font-bold text-emerald-700">
                  {totalDatasets}
                </p>
              </div>
            </div>
          </div>

          {/* Graphique moderne type Excel */}
          <div className="bg-white shadow-xl rounded-3xl p-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
              Utenti & Datasets
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 40, left: 0, bottom: 10 }} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="ordine" tick={{ fontSize: 12, fill: "#374151" }} />
                <YAxis tick={{ fontSize: 12, fill: "#374151" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "1px solid #10b981",
                    color: "#f9fafb",
                  }}
                />
                <Legend />

                {/* Barres Utenti */}
                <Bar
                  dataKey="utenti"
                  fill="url(#utentiGradient)"
                  radius={[8, 8, 0, 0]}
                />
                {/* Barres Datasets */}
                <Bar
                  dataKey="datasets"
                  fill="url(#datasetsGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="utentiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="datasetsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;



