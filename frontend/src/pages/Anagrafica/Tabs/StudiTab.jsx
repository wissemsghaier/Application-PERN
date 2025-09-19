import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const StudiTab = () => {
  const { ordineId, anagraficaId } = useParams();

  // Endpoint backend pour StudiAssociati
  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/studi-associati`;

  // Champs de la table "StudiAssociati"
  const fields = [
    "anstuass",  // Studio associato
    "ancarstu",  // Carica nello studio
    "andtinsa",  // Data inizio
    "andtfisa",  // Data fine
  ];

  // Labels lisibles pour l'affichage
  const labels = {
    anstuass: "Studio Associato",
    ancarstu: "Carica Studio",
    andtinsa: "Data Inizio",
    andtfisa: "Data Fine",
  };

  // Types spécifiques pour certains champs
  const fieldTypes = {
    andtinsa: "date",
    andtfisa: "date",
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Studi Associati</h3>
      <SubTableForm
        endpoint={endpoint}
        fields={fields}
        labels={labels}
        anagraficaId={anagraficaId}
        fieldTypes={fieldTypes} // 🔹 types spécifiques
      />
    </div>
  );
};

export default StudiTab;
