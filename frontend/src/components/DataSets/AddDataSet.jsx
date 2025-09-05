// src/components/DataSets/AddDataSet.jsx
import React from "react";
import { useParams } from "react-router-dom";
import DataSetForm from "./DataSetForm";

const AddDataSet = ({ fetchOrdine, closeForm }) => {
  const { id } = useParams(); // <-- Récupère l'ID de l'ordine depuis l'URL
  const ordineId = id;         // On le passe ensuite au formulaire

  return <DataSetForm ordineId={ordineId} fetchOrdine={fetchOrdine} closeForm={closeForm} />;
};

export default AddDataSet;
