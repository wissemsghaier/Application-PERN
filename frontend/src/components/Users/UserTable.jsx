// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { User as UserIcon, Mail, ListChecks, Trash2, Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [ordini, setOrdini] = useState([]);
//   const [selectedOrdini, setSelectedOrdini] = useState({});
//   const [search, setSearch] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newUser, setNewUser] = useState({ name: "", email: "" });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.data.filter(u => u.role !== "admin"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchOrdini = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/ordini", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrdini(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchOrdini();
//   }, []);

//   const assignOrdini = async (userId) => {
//     try {
//       const ordineIds = selectedOrdini[userId] ? [selectedOrdini[userId]] : [];
//       if (!ordineIds.length) return;

//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/assign`,
//         { ordineIds },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("✅ Ordini assegnati!");
//       setSelectedOrdini(prev => ({ ...prev, [userId]: "" }));
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'assegnazione");
//     }
//   };

//   const removeOrdini = async (userId, ordineId) => {
//     if (!window.confirm("Confermi la rimozione di questo ordine?")) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/removeOrdini`,
//         { ordineIds: [ordineId] },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la rimozione");
//     }
//   };

  

//   const filteredUsers = users.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Cerca utente..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
        
//       </div>

//       {/* Grid utilisateurs */}
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {filteredUsers.map(user => {
//           const availableOrdini = ordini.filter(
//             o => !user.assignedOrdini?.some(ao => ao._id === o._id)
//           );

//           return (
//             <motion.div
//               key={user._id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="bg-white border rounded-2xl shadow-md p-5 space-y-4 hover:shadow-xl transition transform hover:-translate-y-1">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-400">
//                     <UserIcon className="w-6 h-6 text-blue-700" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold">{user.name}</h3>
//                     <p className="text-gray-500 text-sm flex items-center gap-1">
//                       <Mail className="w-4 h-4" /> {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Ordini assignés */}
//                 <div>
//                   <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
//                     <ListChecks className="w-4 h-4" /> Ordini attuali
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {user.assignedOrdini?.length ? (
//                       user.assignedOrdini.map(o => (
//                         <div key={o._id} className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
//                           {o.numero}
//                           <Trash2
//                             className="w-4 h-4 cursor-pointer hover:text-red-500"
//                             onClick={() => removeOrdini(user._id, o._id)}
//                           />
//                         </div>
//                       ))
//                     ) : <p className="text-gray-400 text-sm">Nessuno</p>}
//                   </div>
//                 </div>

//                 {/* Assignation via select */}
//                 {availableOrdini.length > 0 && (
//                   <div>
//                     <h4 className="text-sm font-medium mb-1">Assegna nuovo ordine</h4>
//                     <select
//                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                       value={selectedOrdini[user._id] || ""}
//                       onChange={e =>
//                         setSelectedOrdini(prev => ({ ...prev, [user._id]: e.target.value }))
//                       }
//                     >
//                       <option value="">Seleziona ordine...</option>
//                       {availableOrdini.map(o => (
//                         <option key={o._id} value={o._id}>
//                           {o.numero}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       disabled={!selectedOrdini[user._id]}
//                       className="mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//                       onClick={() => assignOrdini(user._id)}
//                     >
//                       Salva
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Modal Ajouter Utilisateur */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl p-6 w-96 shadow-lg space-y-4"
//           >
//             <h3 className="text-lg font-semibold">Aggiungi Utente</h3>
//             <input
//               type="text"
//               placeholder="Nome"
//               value={newUser.name}
//               onChange={e => setNewUser({ ...newUser, name: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={newUser.email}
//               onChange={e => setNewUser({ ...newUser, email: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Annulla
//               </button>
//               <button
//                 className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
//                 onClick={addUser}
//               >
//                 Salva
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserTable;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { User as UserIcon, Mail, ListChecks, Trash2, Edit2, Save, Plus } from "lucide-react";


// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [ordini, setOrdini] = useState([]);
//   const [selectedOrdini, setSelectedOrdini] = useState({});
//   const [search, setSearch] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newUser, setNewUser] = useState({ name: "", email: "" });
//   const [editingUser, setEditingUser] = useState(null);
//   const [editData, setEditData] = useState({});
//   const token = localStorage.getItem("token");

//   // Recupera utenti
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.data.filter(u => u.role !== "admin"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Recupera ordini
//   const fetchOrdini = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/ordini", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrdini(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchOrdini();
//   }, []);

//   // Aggiungi utente
//   const addUser = async () => {
//     if (!newUser.name || !newUser.email) return alert("❌ Compila tutti i campi");
//     try {
//       await axios.post(
//         "http://localhost:3000/api/users",
//         newUser,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Utente aggiunto");
//       setShowAddModal(false);
//       setNewUser({ name: "", email: "" });
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'aggiunta");
//     }
//   };

//   // Modifica utente
//   const updateUser = async (userId) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}`,
//         editData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Utente aggiornato");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'aggiornamento");
//     }
//   };

//   // Cancella utente
//   const deleteUser = async (userId) => {
//     if (!window.confirm("Confermi la cancellazione di questo utente?")) return;
//     try {
//       await axios.delete(`http://localhost:3000/api/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("✅ Utente cancellato");
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la cancellazione");
//     }
//   };

//   // Assegna ordine
//   const assignOrdini = async (userId) => {
//     const ordineIds = selectedOrdini[userId] ? [selectedOrdini[userId]] : [];
//     if (!ordineIds.length) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/assign`,
//         { ordineIds },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Ordine assegnato");
//       setSelectedOrdini(prev => ({ ...prev, [userId]: "" }));
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'assegnazione");
//     }
//   };

//   // Rimuovi ordine
//   const removeOrdini = async (userId, ordineId) => {
//     if (!window.confirm("Confermi la rimozione di questo ordine?")) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/removeOrdini`,
//         { ordineIds: [ordineId] },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la rimozione");
//     }
//   };

//   const filteredUsers = users.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Cerca utente..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
//           onClick={() => setShowAddModal(true)}
//         >
//           <Plus className="w-4 h-4" /> Aggiungi
//         </button>
//       </div>

//       {/* Griglia utenti */}
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {filteredUsers.map(user => {
//           const availableOrdini = ordini.filter(
//             o => !user.assignedOrdini?.some(ao => ao._id === o._id)
//           );

//           return (
//             <motion.div
//               key={user._id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="bg-white border rounded-2xl shadow-md p-5 space-y-4 hover:shadow-xl transition transform hover:-translate-y-1">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-400">
//                     <UserIcon className="w-6 h-6 text-blue-700" />
//                   </div>
//                   <div className="flex-1">
//                     {editingUser === user._id ? (
//                       <>
//                         <input
//                           type="text"
//                           value={editData.name}
//                           onChange={e => setEditData({ ...editData, name: e.target.value })}
//                           className="w-full px-3 py-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         <input
//                           type="email"
//                           value={editData.email}
//                           onChange={e => setEditData({ ...editData, email: e.target.value })}
//                           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <h3 className="text-lg font-semibold">{user.name}</h3>
//                         <p className="text-gray-500 text-sm flex items-center gap-1">
//                           <Mail className="w-4 h-4" /> {user.email}
//                         </p>
//                       </>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     {editingUser === user._id ? (
//                       <button
//                         onClick={() => updateUser(user._id)}
//                         className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
//                         title="Salva"
//                       >
//                         <Save className="w-4 h-4" />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => { setEditingUser(user._id); setEditData({ name: user.name, email: user.email }); }}
//                         className="p-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
//                         title="Modifica"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                     )}
//                     <button
//                       onClick={() => deleteUser(user._id)}
//                       className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
//                       title="Elimina"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Ordini assegnati */}
//                 <div>
//                   <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
//                     <ListChecks className="w-4 h-4" /> Ordini attuali
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {user.assignedOrdini?.length ? (
//                       user.assignedOrdini.map(o => (
//                         <div key={o._id} className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
//                           {o.numero}
//                           <Trash2
//                             className="w-4 h-4 cursor-pointer hover:text-red-500"
//                             onClick={() => removeOrdini(user._id, o._id)}
//                           />
//                         </div>
//                       ))
//                     ) : <p className="text-gray-400 text-sm">Nessuno</p>}
//                   </div>
//                 </div>

//                 {/* Assegna nuovo ordine */}
//                 {availableOrdini.length > 0 && (
//                   <div>
//                     <h4 className="text-sm font-medium mb-1">Assegna ordine</h4>
//                     <select
//                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                       value={selectedOrdini[user._id] || ""}
//                       onChange={e =>
//                         setSelectedOrdini(prev => ({ ...prev, [user._id]: e.target.value }))
//                       }
//                     >
//                       <option value="">Seleziona ordine...</option>
//                       {availableOrdini.map(o => (
//                         <option key={o._id} value={o._id}>
//                           {o.numero}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       disabled={!selectedOrdini[user._id]}
//                       className="mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//                       onClick={() => assignOrdini(user._id)}
//                     >
//                       Assegna
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Modal Aggiungi Utente */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl p-6 w-96 shadow-lg space-y-4"
//           >
//             <h3 className="text-lg font-semibold">Aggiungi Utente</h3>
//             <input
//               type="text"
//               placeholder="Nome"
//               value={newUser.name}
//               onChange={e => setNewUser({ ...newUser, name: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={newUser.email}
//               onChange={e => setNewUser({ ...newUser, email: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Annulla
//               </button>
//               <button
//                 className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
//                 onClick={addUser}
//               >
//                 Salva
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserTable;























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { User as UserIcon, Mail, ListChecks, Trash2, Edit2, Save, Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // <-- import


// // import Navbar from "../Dashboard/Navbar";
// // import SideBar from "../Dashboard/SideBarAdmin";

// const UserTable = () => {
//   const navigate = useNavigate(); // <-- initialise
//   const [users, setUsers] = useState([]);
//   const [ordini, setOrdini] = useState([]);
//   const [selectedOrdini, setSelectedOrdini] = useState({});
//   const [search, setSearch] = useState("");
//   const [editingUser, setEditingUser] = useState(null);
//   const [editData, setEditData] = useState({});
//   const token = localStorage.getItem("token");

//   // Recupera utenti
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.data.filter(u => u.role !== "admin"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Recupera ordini
//   const fetchOrdini = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/ordini", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrdini(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchOrdini();
//   }, []);

//   // Modifica utente
//   const updateUser = async (userId) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}`,
//         editData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Utente aggiornato");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'aggiornamento");
//     }
//   };

//   // Cancella utente
//   const deleteUser = async (userId) => {
//     if (!window.confirm("Confermi la cancellazione di questo utente?")) return;
//     try {
//       await axios.delete(`http://localhost:3000/api/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("✅ Utente cancellato");
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la cancellazione");
//     }
//   };

//   // Assegna ordine
//   const assignOrdini = async (userId) => {
//     const ordineIds = selectedOrdini[userId] ? [selectedOrdini[userId]] : [];
//     if (!ordineIds.length) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/assign`,
//         { ordineIds },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Ordine assegnato");
//       setSelectedOrdini(prev => ({ ...prev, [userId]: "" }));
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'assegnazione");
//     }
//   };

//   // Rimuovi ordine
//   const removeOrdini = async (userId, ordineId) => {
//     if (!window.confirm("Confermi la rimozione di questo ordine?")) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/removeOrdini`,
//         { ordineIds: [ordineId] },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la rimozione");
//     }
//   };

//   const filteredUsers = users.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Cerca utente..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
//           onClick={() => navigate("/register")} // <-- redirection vers register
//         >
//           <Plus className="w-4 h-4" /> Aggiungi
//         </button>
//       </div>

//       {/* Griglia utenti */}
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {filteredUsers.map(user => {
//           const availableOrdini = ordini.filter(
//             o => !user.assignedOrdini?.some(ao => ao._id === o._id)
//           );

//           return (
//             <motion.div
//               key={user._id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="bg-white border rounded-2xl shadow-md p-5 space-y-4 hover:shadow-xl transition transform hover:-translate-y-1">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-400">
//                     <UserIcon className="w-6 h-6 text-blue-700" />
//                   </div>
//                   <div className="flex-1">
//                     {editingUser === user._id ? (
//                       <>
//                         <input
//                           type="text"
//                           value={editData.name}
//                           onChange={e => setEditData({ ...editData, name: e.target.value })}
//                           className="w-full px-3 py-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         <input
//                           type="email"
//                           value={editData.email}
//                           onChange={e => setEditData({ ...editData, email: e.target.value })}
//                           className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <h3 className="text-lg font-semibold">{user.name}</h3>
//                         <p className="text-gray-500 text-sm flex items-center gap-1">
//                           <Mail className="w-4 h-4" /> {user.email}
//                         </p>
//                       </>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     {editingUser === user._id ? (
//                       <button
//                         onClick={() => updateUser(user._id)}
//                         className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
//                         title="Salva"
//                       >
//                         <Save className="w-4 h-4" />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => { setEditingUser(user._id); setEditData({ name: user.name, email: user.email }); }}
//                         className="p-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
//                         title="Modifica"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                     )}
//                     <button
//                       onClick={() => deleteUser(user._id)}
//                       className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
//                       title="Elimina"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Ordini assegnati */}
//                 <div>
//                   <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
//                     <ListChecks className="w-4 h-4" /> Ordini attuali
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {user.assignedOrdini?.length ? (
//                       user.assignedOrdini.map(o => (
//                         <div key={o._id} className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
//                           {o.numero}
//                           <Trash2
//                             className="w-4 h-4 cursor-pointer hover:text-red-500"
//                             onClick={() => removeOrdini(user._id, o._id)}
//                           />
//                         </div>
//                       ))
//                     ) : <p className="text-gray-400 text-sm">Nessuno</p>}
//                   </div>
//                 </div>

//                 {/* Assegna nuovo ordine */}
//                 {availableOrdini.length > 0 && (
//                   <div>
//                     <h4 className="text-sm font-medium mb-1">Assegna ordine</h4>
//                     <select
//                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                       value={selectedOrdini[user._id] || ""}
//                       onChange={e =>
//                         setSelectedOrdini(prev => ({ ...prev, [user._id]: e.target.value }))
//                       }
//                     >
//                       <option value="">Seleziona ordine...</option>
//                       {availableOrdini.map(o => (
//                         <option key={o._id} value={o._id}>
//                           {o.numero}
//                         </option>
//                       ))}
//                     </select>
//                     <button
//                       disabled={!selectedOrdini[user._id]}
//                       className="mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//                       onClick={() => assignOrdini(user._id)}
//                     >
//                       Assegna
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default UserTable;










// src/components/UserTable.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { User as UserIcon, Mail, ListChecks, Trash2, Edit2, Save, Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Dashboard/Navbar";
// import SideBar from "../Dashboard/SideBarAdmin";

// const UserTable = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [ordini, setOrdini] = useState([]);
//   const [selectedOrdini, setSelectedOrdini] = useState({});
//   const [search, setSearch] = useState("");
//   const [editingUser, setEditingUser] = useState(null);
//   const [editData, setEditData] = useState({});
//   const token = localStorage.getItem("token");

//   // Recupera utenti
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.data.filter(u => u.role !== "admin"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Recupera ordini
//   const fetchOrdini = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/ordini", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrdini(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchOrdini();
//   }, []);

//   // Modifica utente
//   const updateUser = async (userId) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}`,
//         editData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Utente aggiornato");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'aggiornamento");
//     }
//   };

//   // Cancella utente
//   const deleteUser = async (userId) => {
//     if (!window.confirm("Confermi la cancellazione di questo utente?")) return;
//     try {
//       await axios.delete(`http://localhost:3000/api/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("✅ Utente cancellato");
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la cancellazione");
//     }
//   };

//   // Assegna ordine
//   const assignOrdini = async (userId) => {
//     const ordineIds = selectedOrdini[userId] ? [selectedOrdini[userId]] : [];
//     if (!ordineIds.length) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/assign`,
//         { ordineIds },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("✅ Ordine assegnato");
//       setSelectedOrdini(prev => ({ ...prev, [userId]: "" }));
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante l'assegnazione");
//     }
//   };

//   // Rimuovi ordine
//   const removeOrdini = async (userId, ordineId) => {
//     if (!window.confirm("Confermi la rimozione di questo ordine?")) return;
//     try {
//       await axios.put(
//         `http://localhost:3000/api/users/${userId}/removeOrdini`,
//         { ordineIds: [ordineId] },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Errore durante la rimozione");
//     }
//   };

//   const filteredUsers = users.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <SideBar />

//       {/* Contenu principal */}
//       <div className="flex-1 min-h-screen bg-gray-50 pl-64">
//         {/* Navbar */}
//         <Navbar />

//         {/* Contenu de la page */}
//         <div className="p-6">
//           {/* Header avec marge en haut pour descendre barre de recherche */}
//           <div className="flex justify-between items-center mb-6 mt-20">
//             <input
//               type="text"
//               placeholder="Cerca utente..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
//               onClick={() => navigate("/register")}
//             >
//               <Plus className="w-4 h-4" /> Aggiungi
//             </button>
//           </div>

//           {/* Grille des utilisateurs */}
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {filteredUsers.map(user => {
//               const availableOrdini = ordini.filter(
//                 o => !user.assignedOrdini?.some(ao => ao._id === o._id)
//               );

//               return (
//                 <motion.div
//                   key={user._id}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div className="bg-white border rounded-2xl shadow-md p-5 space-y-4 hover:shadow-xl transition transform hover:-translate-y-1">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-400">
//                         <UserIcon className="w-6 h-6 text-blue-700" />
//                       </div>
//                       <div className="flex-1">
//                         {editingUser === user._id ? (
//                           <>
//                             <input
//                               type="text"
//                               value={editData.name}
//                               onChange={e => setEditData({ ...editData, name: e.target.value })}
//                               className="w-full px-3 py-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                             <input
//                               type="email"
//                               value={editData.email}
//                               onChange={e => setEditData({ ...editData, email: e.target.value })}
//                               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                           </>
//                         ) : (
//                           <>
//                             <h3 className="text-lg font-semibold">{user.name}</h3>
//                             <p className="text-gray-500 text-sm flex items-center gap-1">
//                               <Mail className="w-4 h-4" /> {user.email}
//                             </p>
//                           </>
//                         )}
//                       </div>

//                       <div className="flex gap-2">
//                         {editingUser === user._id ? (
//                           <button
//                             onClick={() => updateUser(user._id)}
//                             className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
//                             title="Salva"
//                           >
//                             <Save className="w-4 h-4" />
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => { setEditingUser(user._id); setEditData({ name: user.name, email: user.email }); }}
//                             className="p-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
//                             title="Modifica"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => deleteUser(user._id)}
//                           className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
//                           title="Elimina"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Ordini assegnati */}
//                     <div>
//                       <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
//                         <ListChecks className="w-4 h-4" /> Ordini attuali
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {user.assignedOrdini?.length ? (
//                           user.assignedOrdini.map(o => (
//                             <div key={o._id} className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
//                               {o.numero}
//                               <Trash2
//                                 className="w-4 h-4 cursor-pointer hover:text-red-500"
//                                 onClick={() => removeOrdini(user._id, o._id)}
//                               />
//                             </div>
//                           ))
//                         ) : <p className="text-gray-400 text-sm">Nessuno</p>}
//                       </div>
//                     </div>

//                     {/* Assegna nuovo ordine */}
//                     {availableOrdini.length > 0 && (
//                       <div>
//                         <h4 className="text-sm font-medium mb-1">Assegna ordine</h4>
//                         <select
//                           className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           value={selectedOrdini[user._id] || ""}
//                           onChange={e =>
//                             setSelectedOrdini(prev => ({ ...prev, [user._id]: e.target.value }))
//                           }
//                         >
//                           <option value="">Seleziona ordine...</option>
//                           {availableOrdini.map(o => (
//                             <option key={o._id} value={o._id}>
//                               {o.numero}
//                             </option>
//                           ))}
//                         </select>
//                         <button
//                           disabled={!selectedOrdini[user._id]}
//                           className="mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//                           onClick={() => assignOrdini(user._id)}
//                         >
//                           Assegna
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTable;









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

  // Récupère utilisateurs
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

  // Récupère ordini
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

  // Met à jour utilisateur
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

  // Supprime utilisateur
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

  // Assigne un ordine
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

  // Retire un ordine
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
      {/* Sidebar */}
      <SideBar />

      {/* Contenu principal */}
      <div className="flex-1 min-h-screen bg-gray-50 pl-64">
        {/* Navbar */}
        <Navbar />

        {/* Contenu de la page */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 mt-20">
            <input
              type="text"
              placeholder="Cerca utente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
              onClick={() => navigate("/register")}
            >
              <Plus className="w-4 h-4" /> Aggiungi
            </button>
          </div>

          {/* Zone scrollable */}
          <div className="h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user, index) => {
                const availableOrdini = ordini.filter(
                  (o) => !user.assignedOrdini?.some((ao) => ao._id === o._id)
                );

                return (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-white border rounded-2xl shadow-md p-5 space-y-4 hover:shadow-xl transition transform hover:-translate-y-1">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-400">
                          <UserIcon className="w-6 h-6 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          {editingUser === user._id ? (
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
                                className="w-full px-3 py-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                            </>
                          ) : (
                            <>
                              <h3 className="text-lg font-semibold">
                                {user.name}
                              </h3>
                              <p className="text-gray-500 text-sm flex items-center gap-1">
                                <Mail className="w-4 h-4" /> {user.email}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {editingUser === user._id ? (
                            <button
                              onClick={() => updateUser(user._id)}
                              className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
                              title="Salva"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingUser(user._id);
                                setEditData({
                                  name: user.name,
                                  email: user.email,
                                });
                              }}
                              className="p-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                              title="Modifica"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                            title="Elimina"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Ordini assegnati */}
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <ListChecks className="w-4 h-4" /> Ordini attuali
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {user.assignedOrdini?.length ? (
                            user.assignedOrdini.map((o) => (
                              <div
                                key={o._id}
                                className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium"
                              >
                                {o.numero}
                                <Trash2
                                  className="w-4 h-4 cursor-pointer hover:text-red-500"
                                  onClick={() => removeOrdini(user._id, o._id)}
                                />
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">Nessuno</p>
                          )}
                        </div>
                      </div>

                      {/* Assigner nuovo ordine */}
                      {availableOrdini.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            Assegna ordine
                          </h4>
                          <select
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={selectedOrdini[user._id] || ""}
                            onChange={(e) =>
                              setSelectedOrdini((prev) => ({
                                ...prev,
                                [user._id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">Seleziona ordine...</option>
                            {availableOrdini.map((o) => (
                              <option key={o._id} value={o._id}>
                                {o.numero}
                              </option>
                            ))}
                          </select>
                          <button
                            disabled={!selectedOrdini[user._id]}
                            className="mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => assignOrdini(user._id)}
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
