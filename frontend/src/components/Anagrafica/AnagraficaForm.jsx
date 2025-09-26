// // src/components/Anagrafica/AnagraficaForm.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiSave, FiCheckCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const AnagraficaForm = ({ ordineId, anagraficaId, onSaved }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     an_nome: "",
//     ancognom: "",
//     anseriale: "",
//     an_note: "",
//     an_sesso: "",
//     andatnas: "",
//     ancomnas: "",
//     anlocnas: "",
//     anpronas: "",
//     ancodnaz: "",
//     anestnas: "",
//     annaznas: "",
//     ancodfis: "",
//     anflgcfm: "",
//     anpariva: "",
//     aniscrit: "",
//     antitolo: "",
//     anlibero: "",
//     andatvar: "",
//     annussig: "",
//     andatsig: "",
//     andtresi: "",
//     ancodcon: "",
//     anattenz: "",
//     ancodope: "",
//     andtvran: "",
//     anmatcas: "",
//     andteic: "",
//     andtdicc: "",
//     andtdlcc: "",
//     andtdeic: "",
//     anflgsos: "",
//     andtsosp: "",
//     anmososp: "",
//     anprivac: "",
//     andatprv: "",
//     anauttr: "",
//     andtautr: "",
//     andtscpe: "",
//     anflging: "",
//     ancodcec: "",
//     anold_cf: "",
//     andtexcf: "",
//     annoexpo: "",
//     anidanpr: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [page, setPage] = useState(0);

//   const token = localStorage.getItem("token");
//   const fieldsPerPage = 4;
//   const fieldKeys = Object.keys(formData);
//   const totalPages = Math.ceil(fieldKeys.length / fieldsPerPage);

//   const formatDate = (dateString) => (dateString ? dateString.split("T")[0] : "");

//   // Caricamento dati esistenti
//   useEffect(() => {
//     if (!anagraficaId) return;
//     axios.get(`http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then(res => {
//       const data = res.data.data || res.data;
//       if (data) {
//         const newData = { ...formData };
//         Object.keys(newData).forEach(key => {
//           if (key.toLowerCase().includes("dat") || key.toLowerCase().includes("ts")) {
//             newData[key] = formatDate(data[key] ?? "");
//           } else {
//             newData[key] = data[key] ?? "";
//           }
//         });
//         setFormData(newData);
//       } else setError("Anagrafica non trovata");
//     }).catch(() => setError("Errore durante il caricamento dei dati"));
//   }, [anagraficaId]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value ?? "" });

//   // 🔹 Salvataggio manuale
//   const handleSave = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (anagraficaId) {
//         await axios.put(
//           `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}`,
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSuccess("Anagrafica aggiornata con successo!");
//       } else {
//         await axios.post(
//           `http://localhost:3000/api/ordini/${ordineId}/anagrafica`,
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSuccess("Anagrafica aggiunta con successo!");
//       }

//       // Dopo salvataggio, ritorno alla lista
//       setTimeout(() => navigate(`/admin-dashboard/ordini/${ordineId}/anagrafica`), 1000);

//     } catch {
//       setError("Errore durante il salvataggio");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setSuccess(null), 2500);
//     }
//   };
  

//   const handleBack = () => navigate(`/admin-dashboard/ordini/${ordineId}/anagrafica`);
//   const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages - 1));
//   const handlePrev = () => setPage(prev => Math.max(prev - 1, 0));

//   const currentFields = fieldKeys.slice(page * fieldsPerPage, (page + 1) * fieldsPerPage);

//   return (
//     <div className="w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-fadeIn">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
//           {anagraficaId ? "Modifica Anagrafica" : "Nuova Anagrafica"}
//         </h2>
//         <button onClick={handleBack} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition">
//           <FiArrowLeft /> Torna alla lista
//         </button>
//       </div>

//       {/* Messaggi */}
//       {error && <div className="bg-red-100 text-red-700 px-6 py-3 rounded-xl text-center">{error}</div>}
//       {success && <div className="bg-green-100 text-green-700 px-6 py-3 rounded-xl text-center flex items-center justify-center gap-2"><FiCheckCircle /> {success}</div>}

//       {/* Form */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {currentFields.map(key => {
//           const isTextarea = key === "an_note";
//           const isDate = key.toLowerCase().includes("dat") || key.toLowerCase().includes("ts");
//           return isTextarea ? (
//             <textarea key={key} name={key} placeholder={key.replace(/_/g, " ")} value={formData[key] || ""} onChange={handleChange} className="p-3 border rounded-xl md:col-span-2 focus:ring-2 focus:ring-green-300 transition resize-none" />
//           ) : (
//             <input key={key} name={key} type={isDate ? "date" : "text"} placeholder={key.replace(/_/g, " ")} value={formData[key] || ""} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-green-300 transition" />
//           );
//         })}

//         {/* Paginazione */}
//         <div className="md:col-span-2 flex justify-between mt-4">
//           <button type="button" onClick={handlePrev} disabled={page === 0} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition disabled:opacity-50"><FiArrowLeft /> Precedente</button>

//           {page === totalPages - 1 ? (
//             <button type="button" onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-6 py-2 rounded-2xl font-bold transition disabled:opacity-50">
//               <FiSave /> {loading ? "Salvataggio..." : anagraficaId ? "Modifica" : "Aggiungi"}
//             </button>
//           ) : (
//             <button type="button" onClick={handleNext} className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-xl shadow-sm transition">
//               Successivo <FiArrowRight />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnagraficaForm;




















// src/components/Anagrafica/AnagraficaForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSave, FiCheckCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Labels leggibili per i campi di anagrafica
const fieldLabels = {
  an_nome: "Nome",
  ancognom: "Cognome",
  anseriale: "Numero seriale",
  an_note: "Note",
  an_sesso: "Sesso",
  andatnas: "Data di nascita",
  ancomnas: "Comune di nascita",
  anlocnas: "Località di nascita",
  anpronas: "Provincia di nascita",
  ancodnaz: "Codice nazionale",
  anestnas: "Stato di nascita",
  annaznas: "Nazionalità",
  ancodfis: "Codice fiscale",
  anflgcfm: "Flag conferma",
  anpariva: "Parità IVA",
  aniscrit: "Iscritto",
  antitolo: "Titolo",
  anlibero: "Libero professionista",
  andatvar: "Data variazione",
  annussig: "Numero iscrizione",
  andatsig: "Data iscrizione",
  andtresi: "Data residenza",
  ancodcon: "Codice contatto",
  anattenz: "Attenzione",
  ancodope: "Codice operatore",
  andtvran: "Data variazione",
  anmatcas: "Matrimonio / Casi",
  andteic: "Data EIC",
  andtdicc: "Data DICC",
  andtdlcc: "Data DLCC",
  andtdeic: "Data DEIC",
  anflgsos: "Flag SOS",
  andtsosp: "Data sospensione",
  anmososp: "Motivo sospensione",
  anprivac: "Privacy",
  andatprv: "Data privacy",
  anauttr: "Autore",
  andtautr: "Data autore",
  andtscpe: "Data scadenza",
  anflging: "Flag ing",
  ancodcec: "Codice CEC",
  anold_cf: "Vecchio CF",
  andtexcf: "Data eccezione CF",
  annoexpo: "Anno esposizione",
  anidanpr: "ID anagrafica",
};

const AnagraficaForm = ({ ordineId, anagraficaId, onSaved }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    Object.fromEntries(Object.keys(fieldLabels).map(key => [key, ""]))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [page, setPage] = useState(0);

  const token = localStorage.getItem("token");
  const fieldsPerPage = 4;
  const fieldKeys = Object.keys(formData);
  const totalPages = Math.ceil(fieldKeys.length / fieldsPerPage);

  const formatDate = (dateString) => (dateString ? dateString.split("T")[0] : "");

  // Caricamento dati esistenti
  useEffect(() => {
    if (!anagraficaId) return;
    axios.get(`http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const data = res.data.data || res.data;
      if (data) {
        const newData = { ...formData };
        Object.keys(newData).forEach(key => {
          newData[key] = key.toLowerCase().includes("dat") || key.toLowerCase().includes("ts")
            ? formatDate(data[key] ?? "")
            : data[key] ?? "";
        });
        setFormData(newData);
      } else setError("Anagrafica non trovata");
    }).catch(() => setError("Errore durante il caricamento dei dati"));
  }, [anagraficaId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value ?? "" });

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (anagraficaId) {
        await axios.put(
          `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Anagrafica aggiornata con successo!");
      } else {
        await axios.post(
          `http://localhost:3000/api/ordini/${ordineId}/anagrafica`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Anagrafica aggiunta con successo!");
      }
      setTimeout(() => navigate(`/admin-dashboard/ordini/${ordineId}/anagrafica`), 1000);
    } catch {
      setError("Errore durante il salvataggio");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 2500);
    }
  };

  const handleBack = () => navigate(`/admin-dashboard/ordini/${ordineId}/anagrafica`);
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages - 1));
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 0));

  const currentFields = fieldKeys.slice(page * fieldsPerPage, (page + 1) * fieldsPerPage);

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
          {anagraficaId ? "Modifica Anagrafica" : "Nuova Anagrafica"}
        </h2>
        <button onClick={handleBack} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition">
          <FiArrowLeft /> Torna alla lista
        </button>
      </div>

      {/* Messaggi */}
      {error && <div className="bg-red-100 text-red-700 px-6 py-3 rounded-xl text-center">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-6 py-3 rounded-xl text-center flex items-center justify-center gap-2"><FiCheckCircle /> {success}</div>}

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentFields.map(key => {
          const isTextarea = key === "an_note";
          const isDate = key.toLowerCase().includes("dat") || key.toLowerCase().includes("ts");
          const label = fieldLabels[key] || key;
          return (
            <div key={key} className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">{label}</label>
              {isTextarea ? (
                <textarea
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="p-3 border rounded-xl md:col-span-2 focus:ring-2 focus:ring-green-300 transition resize-none"
                />
              ) : (
                <input
                  name={key}
                  type={isDate ? "date" : "text"}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-green-300 transition"
                />
              )}
            </div>
          );
        })}

        {/* Paginazione */}
        <div className="md:col-span-2 flex justify-between mt-4">
          <button type="button" onClick={handlePrev} disabled={page === 0} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition disabled:opacity-50">
            <FiArrowLeft /> Precedente
          </button>

          {page === totalPages - 1 ? (
            <button type="button" onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-6 py-2 rounded-2xl font-bold transition disabled:opacity-50">
              <FiSave /> {loading ? "Salvataggio..." : anagraficaId ? "Modifica" : "Aggiungi"}
            </button>
          ) : (
            <button type="button" onClick={handleNext} className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-xl shadow-sm transition">
              Successivo <FiArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnagraficaForm;
