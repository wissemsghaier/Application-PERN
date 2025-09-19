import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const ContattiTab = () => {
  const { ordineId, anagraficaId } = useParams();

  // Endpoint backend pour Contatti
  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/contatti`;

  // Champs de la table "Contatti"
  const fields = [
    "antipcon",  // Tipo Contatto
    "andescon",  // Descrizione
    "anpubweb",  // Sito Web
  ];

  // Labels lisibles pour les champs
  const labels = {
    antipcon: "Tipo Contatto",
    andescon: "Descrizione Contatto",
    anpubweb: "Sito Web",
  };

  // Types spécifiques pour certains champs
  const fieldTypes = {
    antipcon: "select",  // on transforme en select
  };

  // Options pour les select
  const selectOptions = {
    antipcon: ["Email", "Telefono", "Fax", "Altro"],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contatti</h3>
      <SubTableForm
        endpoint={endpoint}
        fields={fields}
        labels={labels}
        anagraficaId={anagraficaId}
        fieldTypes={fieldTypes}       // 🔹 types spécifiques
        selectOptions={selectOptions} // 🔹 options select
      />
    </div>
  );
};

export default ContattiTab;
