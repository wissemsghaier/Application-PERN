import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const AbilitazioniTab = () => {
  const { ordineId, anagraficaId } = useParams();

  // Endpoint backend pour Abilitazioni
  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/abilitazioni`;

  // Champs de la table Abilitazioni
  const fields = [
    "anambabi",
    "andatabi",
    "ancunabi",
    "anlocabi",
    "anpunabi",
    "anlodebi",
    "anabilve",
    "andatarv",
  ];

  // Labels lisibles pour affichage
  const labels = {
    anambabi: "Nome Abilitazione",
    andatabi: "Data Abilitazione",
    ancunabi: "Cun Abilitazione",
    anlocabi: "Località",
    anpunabi: "Punteggio",
    anlodebi: "Lode",
    anabilve: "Abilitazione Verificata",
    andatarv: "Data Revisione",
  };

  // Types spécifiques pour certains champs
  const fieldTypes = {
    andatabi: "date",
    andatarv: "date",
    anabilve: "checkbox",
    anlodebi: "select", // exemple si tu veux Oui/Non
  };

  // Options pour les select (si nécessaire)
  const selectOptions = {
    anlodebi: ["Si", "No"],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Abilitazioni</h3>
      <SubTableForm
        endpoint={endpoint}
        fields={fields}
        labels={labels}
        anagraficaId={anagraficaId}
        fieldTypes={fieldTypes}       // 🔹 ajoute les types spécifiques
        selectOptions={selectOptions} // 🔹 ajoute les options select
      />
    </div>
  );
};

export default AbilitazioniTab;

