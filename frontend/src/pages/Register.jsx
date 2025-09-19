// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/Dashboard/SideBarAdmin";
import Navbar from "../components/Dashboard/Navbar";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

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
      <SideBar />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-cyan-50 via-green-50 to-teal-100 pt-20 px-6 relative overflow-hidden">
        <Navbar />

        {/* Halo décoratif */}
        <div className="absolute top-24 left-24 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-24 right-24 w-72 h-72 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="flex justify-center items-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-lg bg-white/50 backdrop-blur-xl shadow-2xl 
                       rounded-3xl p-10 border border-white/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 opacity-20 blur-2xl animate-pulse"></div>

            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-emerald-500 to-lime-500 mb-8 text-center drop-shadow-sm">
              📝 Registrazione
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4 text-center shadow-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Mario Rossi"
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border border-gray-200 
                             rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 
                             shadow-sm transition"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="mario@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border border-gray-200 
                             rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 
                             shadow-sm transition"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Almeno 6 caratteri"
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border border-gray-200 
                             rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 
                             shadow-sm transition"
                  onChange={handleChange}
                  required
                />
              </div>

              <input type="hidden" name="role" value="employee" />

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

            <p className="text-center text-sm mt-6 text-gray-700 relative z-10">
              Hai già un account?{" "}
              <Link
                to="/login"
                className="text-cyan-500 hover:underline font-medium"
              >
                Accedi
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
