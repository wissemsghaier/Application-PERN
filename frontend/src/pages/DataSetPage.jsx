// src/pages/DataSetPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiPlus, FiSearch } from "react-icons/fi";
import DataSetForm from "../components/DataSets/DataSetForm";
import DataSetTable from "../components/DataSets/DataSetTable";
import EditDataSet from "../components/DataSets/EditDataSet";

import Navbar from "../components/Dashboard/Navbar";
import SideBar from "../components/Dashboard/SideBarAdmin";


const backendURL = "http://localhost:3000/api/ordini";

const DataSetPage = () => {
  const { id } = useParams();
  const ordineId = id;
  const [ordine, setOrdine] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDataSet, setEditingDataSet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  const fetchOrdine = async () => {
    try {
      const res = await axios.get(`${backendURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdine(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (ds, index) => {
    setEditingDataSet({ ...ds, id: index });
    setShowForm(true);
  };

  const handleDelete = async (datasetIndex) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce DataSet ?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/ordini/${ordineId}/deleteDataSet/${datasetIndex}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "DataSet supprimé !");
      fetchOrdine(); // rafraîchir la liste après suppression
    } catch (err) {
      console.error("Erreur lors de la suppression :", err.response || err);
      alert(err.response?.data?.message || "Erreur lors de la suppression du DataSet");
    }
  };

  const filteredDataSets = ordine?.dataSets?.filter(
    (ds) =>
      ds.anagrafica.AN_NOME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.anagrafica.ANCOGNOM.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchOrdine();
  }, []);

  if (!ordine)
    return <div className="ml-64 p-8 text-gray-600">Caricamento...</div>;

  return (
    <div className="relative min-h-screen bg-green-50">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="ml-64 pt-20 px-8">
        <h2 className="text-4xl font-bold mb-6 text-green-700">Ordine: {ordine.numero}</h2>

        {/* Recherche + Ajouter */}
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-6">
          <div className="flex items-center gap-2">
            <FiSearch className="text-green-700" />
            <input
              type="text"
              placeholder="Cerca DataSet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingDataSet(null);
            }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow transition"
          >
            <FiPlus /> {showForm ? "Chiudi Form" : "Aggiungi DataSet"}
          </button>
        </div>

        {/* Formulaire d'ajout ou d'édition */}
        {showForm && (
          editingDataSet ? (
            <EditDataSet
              ordineId={id}
              datasetIndex={editingDataSet.id}
              existingDataSet={editingDataSet}
              fetchOrdine={fetchOrdine}
              closeForm={() => setShowForm(false)}
            />
          ) : (
            <DataSetForm
              ordineId={id}
              fetchOrdine={fetchOrdine}
              closeForm={() => setShowForm(false)}
            />
          )
        )}

        {/* Table des datasets */}
        {!showForm && (
          <div className="max-w-5xl mx-auto mt-8">
            <DataSetTable
              dataSets={filteredDataSets}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSetPage;