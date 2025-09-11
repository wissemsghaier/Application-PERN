import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.success === false) {
        setError(error.response.data.error);
      } else {
        setError("Errore del server.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-gray-900 to-black px-4 relative overflow-hidden">
      {/* Halo décoratif */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/20 relative z-10"
      >
        {/* Titre */}
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          🔐 Connessione
        </h2>

        {/* Message d'erreur */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm transition"
              placeholder="nome@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm transition"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-emerald-400" />
              Ricordami
            </label>
            <a href="#" className="text-emerald-400 hover:underline">
              Password dimenticata?
            </a>
          </div>

          {/* Bouton */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #34d399" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 text-white font-semibold py-3 rounded-2xl shadow-lg transition duration-300"
          >
            Accedi
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
