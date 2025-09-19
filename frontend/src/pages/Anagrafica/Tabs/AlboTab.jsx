import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const AlboTab = () => {
  const { ordineId, anagraficaId } = useParams();
  const navigate = useNavigate();

  // 🔹 Endpoint backend pour Albo
  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/albo`;

  // 🔹 Fonction pour naviguer vers le détail Albo (ex: Settori)
const handleViewSettori = (item) => {
  navigate(`/admin-dashboard/ordini/${ordineId}/anagrafica/${anagraficaId}/albo/${item.id}/settori`);
};


  // 🔹 Champs de la table "Albo"
  const fields = [
    "antipisc",
    "annunisc",
    "andatisc",
    "andatpis",
    "anorprov",
    "anmotcan",
    "andescan",
    "andatcan",
    "andatdec",
    "andtotra",
    "andtisno",
    "anflgisc",
    "andtdeca",
  ];

  // 🔹 Labels lisibles pour affichage
  const labels = {
    antipisc: "Tipo Iscrizione",
    annunisc: "Numero Iscrizione",
    andatisc: "Data Iscrizione",
    andatpis: "Data Prima Iscrizione",
    anorprov: "Ordine/Provincia",
    anmotcan: "Motivo Cancellazione",
    andescan: "Descrizione Cancellazione",
    andatcan: "Data Cancellazione",
    andatdec: "Data Decadenza",
    andtotra: "Trasferimento",
    andtisno: "Data Iscrizione NO",
    anflgisc: "Flag Iscrizione",
    andtdeca: "Data Decadenza Albo",
  };

  // 🔹 Types spécifiques pour certains champs
  const fieldTypes = {
    andatisc: "date",
    andatpis: "date",
    andatcan: "date",
    andatdec: "date",
    andtisno: "date",
    andtdeca: "date",
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Albo</h3>
      <SubTableForm
        endpoint={endpoint}
        fields={fields}
        labels={labels}
        anagraficaId={anagraficaId}
        fieldTypes={fieldTypes}       // 🔹 dates activées
        onViewDetail={handleViewSettori} // 🔹 bouton Voir Settori
      />
    </div>
  );
};

export default AlboTab;
