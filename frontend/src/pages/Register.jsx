// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/Dashboard/SideBarAdmin";
import Navbar from "../components/Dashboard/Navbar";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3000/api/auth/register", formData);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Errore durante la registrazione."
      );
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Contenu principal */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-cyan-50 via-green-50 to-teal-100 pt-20 px-4">
        {/* Navbar */}
        <Navbar />

        {/* Formulaire centré */}
        <div className="flex justify-center items-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md bg-white/30 backdrop-blur-xl shadow-2xl 
                       rounded-3xl p-10 border border-white/40 relative overflow-hidden"
          >
            {/* Effet neon animé */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 opacity-20 blur-2xl animate-pulse"></div>

            {/* Titre */}
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-emerald-500 to-lime-500 mb-8 text-center drop-shadow-sm">
              📝 Registrazione
            </h2>

            {/* Message erreur */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4 text-center shadow-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Nome */}
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-gray-700 text-sm mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Mario Rossi"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-cyan-400 
                             shadow-sm transition"
                  onChange={handleChange}
                  required
                />
              </motion.div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="mario@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-cyan-400 
                             shadow-sm transition"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Almeno 6 caratteri"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-cyan-400 
                             shadow-sm transition"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Ruolo nascosto */}
              <input type="hidden" name="role" value="employee" />

              {/* Bottone */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 
                           text-white font-semibold py-3 rounded-xl shadow-lg 
                           hover:shadow-xl transition relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-500"></span>
                Registrati
              </motion.button>
            </form>

            {/* Lien login */}
            <p className="text-center text-sm mt-6 text-gray-700 relative z-10">
              Hai già un account?{" "}
              <a
                href="/login"
                className="text-cyan-500 hover:underline font-medium"
              >
                Accedi
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
