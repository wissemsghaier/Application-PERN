import React from "react";
import { useParams } from "react-router-dom";
import SubTableForm from "../../../components/Anagrafica/SubTableForm";

const SettoriTab = () => {
  const { ordineId, anagraficaId, alboId } = useParams();

  // 🔹 Endpoint backend pour Settori
  const endpoint = `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/albo/${alboId}/settori`;

  // 🔹 Champs de Settori
  const fields = ["ansezion", "ansotsez", "ansezspe", "ansettore"];

  // 🔹 Labels lisibles
  const labels = {
    ansezion: "Sezione",
    ansotsez: "Sezione Tecnica",
    ansezspe: "Speciale",
    ansettore: "Settore",
  };

  // 🔹 Types spécifiques
  const fieldTypes = {
    ansezion: "text",
    ansotsez: "text",
    ansezspe: "text",
    ansettore: "text",
  };

 return (
     <div>
       <h3 className="text-lg font-semibold mb-4">Albo</h3>
       <SubTableForm
         endpoint={endpoint}
         fields={fields}
         labels={labels}
         anagraficaId={anagraficaId}
         
       />
     </div>
   );
};

export default SettoriTab;
