import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const RecapitiTab = () => {
  const { ordineId, anagraficaId } = useParams();

  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/recapiti`;

  const fields = [
    "antipind",
    "anindiri",
    "an_cap",
    "ancodcom",
    "anlocali",
    "anprovin",
    "annazion",
    "antelefo",
    "antelfax",
    "anpubweb",
  ];

  const labels = {
    antipind: "Tipo Indirizzo",
    anindiri: "Indirizzo",
    an_cap: "CAP",
    ancodcom: "Codice Comune",
    anlocali: "Località",
    anprovin: "Provincia",
    annazion: "Nazione",
    antelefo: "Telefono",
    antelfax: "Fax",
    anpubweb: "Sito Web",
  };

  // Champs spécifiques
  const fieldTypes = {
    antipind: "select", // Tipo Indirizzo devient select
  };

  // Options pour le select
  const selectOptions = {
    antipind: ["Residenza", "Studio", "Altro"],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Recapiti</h3>
      <SubTableForm
        endpoint={endpoint}
        fields={fields}
        labels={labels}
        anagraficaId={anagraficaId}
        fieldTypes={fieldTypes}
        selectOptions={selectOptions}
      />
    </div>
  );
};

export default RecapitiTab;
