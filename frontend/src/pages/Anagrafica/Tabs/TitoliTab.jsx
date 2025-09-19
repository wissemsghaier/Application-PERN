import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const TitoliTab = () => {
  const { ordineId, anagraficaId } = useParams();

  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/titoli`;

  // Champs que tu veux afficher / modifier
  const fields = [
    "ancodtit",
    "andattit",
    "ancuniti",
    "anuniesp",
    "anpuntit",
    "anlodtit",
    "anntit",
    "anclasse",
    "andicris",
    "andritcl",
    "ancaricl",
    "anflita",
    "anrimti",
    "anricuti",
    "antivver",
  ];

  // Labels lisibles pour l’UI
  const labels = {
    ancodtit: "Code Titre",
    andattit: "Date Titre",
    ancuniti: "Université",
    anuniesp: "Spécialité",
    anpuntit: "Punteggio",
    anlodtit: "Lode",
    anntit: "Année",
    anclasse: "Classe",
    andicris: "Descrizione",
    andritcl: "Data Ritiro Classe",
    ancaricl: "Carico Classe",
    anflita: "Flag Titolo Attivo",
    anrimti: "Rimesso",
    anricuti: "Riconosciuto",
    antivver: "Verificato",
  };

  // Types spécifiques
  const fieldTypes = {
    andattit: "date",
    andritcl: "date",
    anflita: "checkbox",
    anrimti: "checkbox",
    anricuti: "checkbox",
    antivver: "checkbox",
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Titoli</h3>
      <SubTableForm
        endpoint={endpoint}
        fields={fields}
        labels={labels}
        anagraficaId={anagraficaId}
        fieldTypes={fieldTypes} // 🔹 types spécifiques pour date et checkbox
      />
    </div>
  );
};

export default TitoliTab;
