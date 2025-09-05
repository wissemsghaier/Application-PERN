import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-green-50 to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/20">
        {/* Titre */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          🔑 Accedi
        </h2>

        {/* Message d'erreur */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 shadow-sm"
              placeholder="nome@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 shadow-sm"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-green-300"
              />
              Ricordami
            </label>
            <a href="#" className="text-green-400 hover:underline">
              Password dimenticata?
            </a>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white font-semibold py-3 rounded-2xl shadow-lg hover:opacity-90 transition duration-300"
          >
            Accedi
          </button>
        </form>

        {/* Link inscription */}
        {/* <p className="text-center text-sm mt-6 text-gray-700">
          Non hai un account?{" "}
          <a href="/register" className="text-green-400 hover:underline font-medium">
            Registrati
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;


