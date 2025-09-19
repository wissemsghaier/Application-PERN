// src/components/UserTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  ListChecks,
  Trash2,
  Edit2,
  Save,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import SideBar from "../Dashboard/SideBarAdmin";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [ordini, setOrdini] = useState([]);
  const [selectedOrdini, setSelectedOrdini] = useState({});
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data.filter((u) => u.role !== "admin"));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrdini = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/ordini", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdini(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrdini();
  }, []);

  const updateUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Utente aggiornato");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("❌ Errore durante l'aggiornamento");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Confermi la cancellazione di questo utente?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Utente cancellato");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("❌ Errore durante la cancellazione");
    }
  };

  const assignOrdini = async (userId) => {
    const ordineIds = selectedOrdini[userId] ? [selectedOrdini[userId]] : [];
    if (!ordineIds.length) return;
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userId}/assign`,
        { ordineIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Ordine assegnato");
      setSelectedOrdini((prev) => ({ ...prev, [userId]: "" }));
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("❌ Errore durante l'assegnazione");
    }
  };

  const removeOrdini = async (userId, ordineId) => {
    if (!window.confirm("Confermi la rimozione di questo ordine?")) return;
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userId}/removeOrdini`,
        { ordineIds: [ordineId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("❌ Errore durante la rimozione");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 pl-64">
        <Navbar />
        <div className="p-6">
          {/* 🔍 Barre de recherche + bouton */}
          <div className="flex justify-between items-center mb-6 mt-20">
            <input
              type="text"
              placeholder="🔍 Cerca utente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-green-200 rounded-lg w-1/3 shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 
                         hover:bg-green-700 shadow-md transition"
              onClick={() => navigate("/register")}
            >
              <Plus className="w-4 h-4" /> Aggiungi
            </button>
          </div>

          {/* 📋 Liste utilisateurs */}
          <div className="h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user, index) => {
                const availableOrdini = ordini.filter(
                  (o) =>
                    !user.assignedOrdini?.some((ao) => ao.id === o.id)
                );

                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-white/80 border border-green-100 rounded-2xl shadow-md 
                                    p-5 space-y-4 hover:shadow-xl transition transform hover:-translate-y-1">
                      {/* 👤 Header carte utilisateur */}
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gradient-to-r from-green-200 to-emerald-300">
                          <UserIcon className="w-6 h-6 text-green-800" />
                        </div>
                        <div className="flex-1">
                          {editingUser === user.id ? (
                            <>
                              <input
                                type="text"
                                value={editData.name}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-green-200 rounded mb-1 
                                           focus:outline-none focus:ring-2 focus:ring-green-400"
                              />
                              <input
                                type="email"
                                value={editData.email}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    email: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-green-200 rounded 
                                           focus:outline-none focus:ring-2 focus:ring-green-400"
                              />
                            </>
                          ) : (
                            <>
                              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                              <p className="text-gray-500 text-sm flex items-center gap-1">
                                <Mail className="w-4 h-4" /> {user.email}
                              </p>
                            </>
                          )}
                        </div>

                        {/* ✏️ Actions */}
                        <div className="flex gap-2">
                          {editingUser === user.id ? (
                            <button
                              onClick={() => updateUser(user.id)}
                              className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
                              title="Salva"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingUser(user.id);
                                setEditData({ name: user.name, email: user.email });
                              }}
                              className="p-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                              title="Modifica"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                            title="Elimina"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 📌 Ordini assignés */}
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1 text-green-700">
                          <ListChecks className="w-4 h-4" /> Ordini attuali
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {user.assignedOrdini?.length ? (
                            user.assignedOrdini.map((o) => (
                              <div
                                key={o.id}
                                className="flex items-center gap-1 px-2 py-1 rounded-full 
                                           bg-green-100 text-green-700 text-xs font-medium"
                              >
                                {o.numero}
                                <Trash2
                                  className="w-4 h-4 cursor-pointer hover:text-red-500"
                                  onClick={() => removeOrdini(user.id, o.id)}
                                />
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">Nessuno</p>
                          )}
                        </div>
                      </div>

                      {/* ➕ Assignation ordini */}
                      {availableOrdini.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-1 text-green-700">Assegna ordine</h4>
                          <select
                            className="w-full border border-green-200 rounded-lg px-3 py-2 
                                       focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={selectedOrdini[user.id] || ""}
                            onChange={(e) =>
                              setSelectedOrdini((prev) => ({
                                ...prev,
                                [user.id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">Seleziona ordine...</option>
                            {availableOrdini.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.numero}
                              </option>
                            ))}
                          </select>
                          <button
                            disabled={!selectedOrdini[user.id]}
                            className="mt-2 w-full px-4 py-2 rounded-lg bg-green-600 
                                       hover:bg-green-700 text-white font-semibold 
                                       transition disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => assignOrdini(user.id)}
                          >
                            Assegna
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
