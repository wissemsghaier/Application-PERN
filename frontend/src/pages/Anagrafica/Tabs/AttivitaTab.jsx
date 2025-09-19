import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const AttivitaTab = () => {
  const { ordineId, anagraficaId } = useParams();

  // Endpoint backend pour Attivita Professionale
  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/attivita-professionale`;

  // Champs de la table "AttivitaProfessionale"
  const fields = [
    "ancodatt",
    "andesatt",
    "andtinap",
    "andtifap",
    "anconssn",
    "anregpro",
    "andatssn",
    "andip_pa",
    "ancodzon",
    "andiccat",
    "andipora",
    "andipcon",
    "andiccnl",
    "andipcoo",
    "andipdir",
    "anesepro",
  ];

  // Labels pour affichage lisible
  const labels = {
    ancodatt: "Codice Attività",
    andesatt: "Descrizione Attività",
    andtinap: "Data Inizio Attività",
    andtifap: "Data Fine Attività",
    anconssn: "Consiglio SSN",
    anregpro: "Registro Professionale",
    andatssn: "Data SSN",
    andip_pa: "Dip. Pubblica Amm.",
    ancodzon: "Codice Zona",
    andiccat: "Categoria",
    andipora: "Dip. Orario",
    andipcon: "Dip. Contratto",
    andiccnl: "CCNL",
    andipcoo: "Dip. Cooperativa",
    andipdir: "Dip. Direttore",
    anesepro: "Esenzione Professionale",
  };

  // Types spécifiques pour certains champs
  const fieldTypes = {
    andtinap: "date",
    andtifap: "date",
    andatssn: "date",
    // tu peux ajouter d'autres types spéciaux si nécessaire
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Attività Professionale</h3>
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

export default AttivitaTab;
