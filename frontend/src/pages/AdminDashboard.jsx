import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import SideBar from "../components/Dashboard/SideBarAdmin";
import UserTable from "../components/Users/UserTable";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-teal-400 animate-pulse">
          Caricamento...
        </div>
      </div>
    );
  }

  return (
    <>
      <SideBar />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 pt-20 pl-64">
        <Navbar />
        <div className="p-6">
          <Routes>
  {/* Page d'accueil du dashboard */}
  <Route
    index
    element={
      <div className="flex justify-center items-center py-24 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-14 w-full max-w-3xl text-center border border-gray-200">
          <h1 className="text-4xl font-extrabold text-teal-700 mb-4">
            Benvenuto, {user?.name} 👋
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Sei autenticato come <strong>Amministratore</strong>.
          </p>
        </div>
      </div>
    }
  />

  {/* Liste des utilisateurs */}
  <Route path="utenti" element={<UserTable />} />
</Routes>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;


