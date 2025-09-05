import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Dati Anagrafici",
  "Recapiti",
  "Contatti",
  "Attività Professionale",
  "Studi Associati",
  "Albo",
  "Settori",
  "Abilitazioni",
  "Titoli",
];

// --- Descriptions des champs pour rendre le formulaire lisible ---
const fieldDescriptions = {
  // --- ANAGRAFICA ---
  ANSERIALE:  "Serial anagrafica",
    ANCOGNOM:  "Cognome",
    AN_NOME:   "Nome",
    ANCODNAZ:  "Codice nazionalità",
    AN_SESSO:  "Sesso",
    ANDATNAS:  "Data nascita",
    ANCOMNAS:  "Codice comune nascita",
    ANLOCNAS:  "Luogo nascita",
    ANPRONAS:  "Provincia nascita",
    ANESTNAS:  "Località estera nascita",
    ANNAZNAS:  "Nazione nascita",
    ANCODFIS:  "Codice fiscale",
    ANFLGCFM:  "Flag CF Ministero",
    ANPARIVA:  "Partita IVA",
    ANISCRIT:  "Iscritto (S/N)",
    AN_NOTE:   "Note",
    ANTITOLO:  "Titolo",
    ANLIBERO:  "Campo libero",
    ANDATVAR:  "Data variazione",
    ANNUSSIG:  "Numero sigillo",
    ANDATSIG:  "Data sigillo",
    ANDTRESI:  "Data reso sigillo",
    ANCODCON:  "Codice controparte",
    ANATTENZ:  "Attenzione",
    ANCODOPE:  "Operatore",
    ANDTVRAN:  "Data variazione anagrafica",
    ANMATCAS:  "Matricola cassa",
    ANDTEIC:   "Decorrenza iscrizione cassa",
    ANDTDICC:  "Delibera iscrizione cassa",
    ANDTDLCC:  "Delibera cancellazione cassa",
    ANDTDEIC:  "Decorrenza cancellazione cassa",
    ANFLGSOS:  "Flag sospeso",
    ANDTSOSP:  "Data sospensione",
    ANMOSOSP:  "Motivo sospensione",
    ANPRIVAC:  "Assenso privacy",
    ANDATPRV:  "Data assenso privacy",
    ANAUTTR:   "Autorizzazione trasferimento dati",
    ANDTAUTR:  "Data autorizzazione trasferimento",
    ANDTSCPE:  "Data scadenza permesso soggiorno",
    ANFLGING:  "Posizione incongruente",
    ANCODCEC:  "Codice eccezione",
    ANOLD_CF:  "Codice fiscale precedente",
    ANDTEXCF:  "Data invio CF variato",
    ANNOEXPO:  "Flag non export",
    ANIDANPR:  "ID soggetto FNOMCeO",

  // --- RECAPITI ---
  ANTIPIND: "TTipologia indirizzo (Residenza, Studio, PEC…)",
  ANINDIRI: "Indirizzo",
  AN_CAP: "CAP",
  ANCODCOM: "Codice comune",
  ANLOCALI: "Località",
  ANPROVIN: "Provincia",
  ANNAZION: "Nazione",
  ANTELEFO: "Telefono",
  ANTELFAX: "Fax",
  ANPUBWEB: "Visibile albo web (S/N)",

  // --- CONTATTI ---
  ANTIPCON: "Tipo contatto (Email, PEC, Cellulare…)",
  ANDESCON: "Descrizione",
  ANPUBWEB_CONT: "Visibile albo web (S/N)",

  // --- ATTIVITÀ PROFESSIONALE ---
  ANCODATT: "Codice attività  Professionale",
  ANDESATT: "Descrizione attività Professionale  ",
  ANDTINAP: "Data inizio attività Professionale ",
  ANDTIFAP: "Data fine attività Professionale",
  ANCONSSN: "Convenzionato SSN (S/N)",
  ANREGPRO: "Regione attività Professionale ",
  ANDATSSN: "Data Convenzionato SSN",
  ANDIP_PA: "Dipendente Pubblica Amministrazione ",
  ANCODZON: "Zona x Incarichi",
  ANDICCAT: "Categoria inquadramento CCNL",
  ANDIPORA: "(F) Full-time (P) Part-time",
  ANDIPCON: "(I) Tempo indeterminato (D) Tempo determinato",
  ANDICCNL: "Codice CCNL",
  ANDIPCOO: "Svolge funzioni di coordinamento",
  ANDIPDIR: "Svolge funzioni di direigenza",
  ANESEPRO: "Esercita la profossione",

  // --- STUDI ASSOCIATI ---
  ANSTUASS: "Codice studio associato",
  ANCARSTU: "Codice Carica studio",
  ANDTINSA: "Data inserimento studio associato",
  ANDTFISA: "Data fuoriuscita studio associato",

  // --- ALBO ---
  ANTIPISC: "Tipologia Albo",
  ANNUNISC: "Numero iscrizione",
  ANDATISC: "Data iscrizione",
  ANDATPIS: "Data prima iscrizione",
  ANORPROV: "Ordine di Provenienza",
  ANMOTCAN: "Motivo cancellazione",
  ANDESCAN: "Descrizione Motivo",
  ANDATCAN: "Data cancellazione",
  ANDATDEC: "Data decesso",
  ANDTOTRA: "Ordine Trasferimento",
  ANDTISNO: "Data iscrizione Nuovo Ordine",
  ANFLGISC: "Flag Iscritto Albo (Si/No)",
  ANDTDECA: "Data dilebera cancellazione",

  // --- SETTORI ---
  ANSEZION: "Sezione Albo",
  ANSOTSEZ: "Sottosezione",
  ANSEZSPE: "Flag Sezione Speciale",
  ANSETTOR: "Codice Settore",

  // --- ABILITAZIONI ---
  ANAMBABI: "Ambito abilitazione",
  ANDATABI: "Data abilitazione",
  ANCUNABI: "codice Università Abilitazione",
  ANLOCABI: "Localita Abilitazione",
  ANPUNABI: "Punteggio abilitazione",
  ANLODEBI: "Lode abilitazione",
  ANABILVE: "Abilitazione Verificata",
  ANDATARV: "Data riconoscimento abilitazione",

  // --- TITOLI DI STUDIO ---
  ANCODTIT: "titolo di Studio",
  ANDATTIT: "Data Cons. Titolo",
  ANCUNITI: "Codice Università Titolo",
  ANUNIESP: "Università Titolo Studio",
  ANPUNTIT: "Punteggio titolo Studio",
  ANLODTIT: "Lode Titolo Studio",
  ANNTIT: "Anno immatricololazione",
  ANCLASSE: "Classe Titolo Studio",
  ANDICRIS: "Dicitura iscrizione con Riserva",
  ANDRITCL: "Data Riconoscimento Titolo Estero",
  ANCARICL: "Causale Riconoscimento Titolo Estero",
  ANFLITA: "Flag Titolo Abilitante",
  ANRIMTI: "Flag Titolo Riconosciuto dal Ministero ",
  ANRICUTI: "lag Titolo Riconosciuto dall'Università",
  ANTIVVER: "Titolo di studio verificato ",
};

const initialFormState = {
  anagrafica: { ANSERIALE: "", ANCOGNOM: "", AN_NOME: "", ANCODNAZ: "", AN_SESSO: "", ANDATNAS: "", ANCOMNAS: "", ANLOCNAS: "", ANPRONAS: "", ANESTNAS: "", ANNAZNAS: "", ANCODFIS: "", ANFLGCFM: "", ANPARIVA: "", ANISCRIT: "", AN_NOTE: "", ANTITOLO: "", ANLIBERO: "", ANDATVAR: "", ANNUSSIG: "", ANDATSIG: "", ANDTRESI: "", ANCODCON: "", ANATTENZ: "", ANCODOPE: "", ANDTVRAN: "", ANMATCAS: "", ANDTEIC: "", ANDTDICC: "", ANDTDLCC: "", ANDTDEIC: "", ANFLGSOS: "", ANDTSOSP: "", ANMOSOSP: "", ANPRIVAC: "", ANDATPRV: "", ANAUTTR: "", ANDTAUTR: "", ANDTSCPE: "", ANFLGING: "", ANCODCEC: "", ANOLD_CF: "", ANDTEXCF: "", ANNOEXPO: "", ANIDANPR: "" },
  recapiti: [{ ANTIPIND: "", ANINDIRI: "", AN_CAP: "", ANCODCOM: "", ANLOCALI: "", ANPROVIN: "", ANNAZION: "", ANTELEFO: "", ANTELFAX: "", ANPUBWEB: "" }],
  contatti: [{ ANTIPCON: "", ANDESCON: "", ANPUBWEB_CONT: "" }],
  attivita_professionale: [{ ANCODATT: "", ANDESATT: "", ANDTINAP: "", ANDTIFAP: "", ANCONSSN: "", ANREGPRO: "", ANDATSSN: "", ANDIP_PA: "", ANCODZON: "", ANDICCAT: "", ANDIPORA: "", ANDIPCON: "", ANDICCNL: "", ANDIPCOO: "", ANDIPDIR: "", ANESEPRO: "" }],
  studi_associati: [{ ANSTUASS: "", ANCARSTU: "", ANDTINSA: "", ANDTFISA: "" }],
  albo: [{ ANTIPISC: "", ANNUNISC: "", ANDATISC: "", ANDATPIS: "", ANORPROV: "", ANMOTCAN: "", ANDESCAN: "", ANDATCAN: "", ANDATDEC: "", ANDTOTRA: "", ANDTISNO: "", ANFLGISC: "", ANDTDECA: "" }],
  settori: [{ ANSEZION: "", ANSOTSEZ: "", ANSEZSPE: "", ANSETTOR: "" }],
  abilitazioni: [{ ANAMBABI: "", ANDATABI: "", ANCUNABI: "", ANLOCABI: "", ANPUNABI: "", ANLODEBI: "", ANABILVE: "", ANDATARV: "" }],
  titoli: [{ ANCODTIT: "", ANDATTIT: "", ANCUNITI: "", ANUNIESP: "", ANPUNTIT: "", ANLODTIT: "", ANNTIT: "", ANCLASSE: "", ANDICRIS: "", ANDRITCL: "", ANCARICL: "", ANFLITA: false, ANRIMTI: false, ANRICUTI: false, ANTIVVER: false }],
};


const EditDataSet = ({ ordineId, existingDataSet, datasetIndex, fetchOrdine, closeForm }) => {
  const [step, setStep] = useState(0);
  const [dataSet, setDataSet] = useState(initialFormState);
  const token = localStorage.getItem("token");

  // Initialiser le DataSet existant
  useEffect(() => {
    if (existingDataSet) {
      const merged = {
        anagrafica: { ...initialFormState.anagrafica, ...existingDataSet.anagrafica },
        recapiti: existingDataSet.recapiti?.length ? existingDataSet.recapiti.map(r => ({ ...initialFormState.recapiti[0], ...r })) : initialFormState.recapiti,
        contatti: existingDataSet.contatti?.length ? existingDataSet.contatti.map(c => ({ ...initialFormState.contatti[0], ...c })) : initialFormState.contatti,
        attivita_professionale: existingDataSet.attivita_professionale?.length ? existingDataSet.attivita_professionale.map(a => ({ ...initialFormState.attivita_professionale[0], ...a })) : initialFormState.attivita_professionale,
        studi_associati: existingDataSet.studi_associati?.length ? existingDataSet.studi_associati.map(s => ({ ...initialFormState.studi_associati[0], ...s })) : initialFormState.studi_associati,
        albo: existingDataSet.albo?.length ? existingDataSet.albo.map(a => ({ ...initialFormState.albo[0], ...a })) : initialFormState.albo,
        settori: existingDataSet.settori?.length ? existingDataSet.settori.map(s => ({ ...initialFormState.settori[0], ...s })) : initialFormState.settori,
        abilitazioni: existingDataSet.abilitazioni?.length ? existingDataSet.abilitazioni.map(a => ({ ...initialFormState.abilitazioni[0], ...a })) : initialFormState.abilitazioni,
        titoli: existingDataSet.titoli?.length ? existingDataSet.titoli.map(t => ({ ...initialFormState.titoli[0], ...t })) : initialFormState.titoli,

      };
      setDataSet(merged);
    }
  }, [existingDataSet]);

  const handleChange = (section, index, name, value) => {
    if (Array.isArray(dataSet[section])) {
      const newSection = [...dataSet[section]];
      newSection[index][name] = value;
      setDataSet({ ...dataSet, [section]: newSection });
    } else {
      setDataSet({ ...dataSet, [section]: { ...dataSet[section], [name]: value } });
    }
  };

  // Nettoyage des champs titoli selon type Mongoose
  const cleanTitoli = (titoli) =>
    titoli.map(t => {
      const cleaned = { ...t };
      // Number
      ["ANNTIT","ANCLASSE","ANDICRIS","ANCARICL"].forEach(f => {
        cleaned[f] = isNaN(cleaned[f]) || cleaned[f] === "" ? 0 : Number(cleaned[f]);
      });
      // Date
      ["ANDRITCL"].forEach(f => {
        const d = new Date(cleaned[f]);
        cleaned[f] = isNaN(d.getTime()) ? null : d;
      });
      // String
      ["ANLODTIT"].forEach(f => {
        if (!cleaned[f] || cleaned[f].trim() === "") cleaned[f] = "N/A";
      });
      return cleaned;
    });

  const cleanAllDataSets = (dataSets) =>
    dataSets.map(ds => ({
      ...ds,
      titoli: ds.titoli ? cleanTitoli(ds.titoli) : []
    }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!ordineId || datasetIndex === undefined) {
    alert("OrdineId ou datasetIndex non défini");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    // Nettoyer les champs avant l'envoi si besoin (ex: "N/A" pour les titres vides)
    const cleanedDataSet = cleanAllDataSets([dataSet])[0];

    const response = await axios.put(
      `http://localhost:3000/api/ordini/${ordineId}/updateDataSet/${datasetIndex}`,
      { updatedDataSet: cleanedDataSet },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("DataSet mis à jour :", response.data);
    alert("✅ DataSet mis à jour avec succès !");
    fetchOrdine(); 
    if (closeForm) closeForm();
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err.response || err);
    alert(err.response?.data?.message || "Erreur lors de la mise à jour du DataSet");
  }
};


  const selectOptions = {
  ANDIPORA: [
    { value: "F", label: "Full-time" },
    { value: "P", label: "Part-time" },
  ],
  ANDIPCON: [
    { value: "I", label: "Tempo indeterminato" },
    { value: "D", label: "Tempo determinato" },
  ],
  AN_SESSO: [
    { value: "M", label: "Maschio" },
    { value: "F", label: "Femmina" },
  ],
ANFLITA: [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ],
  ANRIMTI: [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ],
  ANRICUTI: [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ],
  ANTIVVER: [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ],
};

  const renderFields = (section, index = 0) => {
  const fields = Array.isArray(dataSet[section]) ? dataSet[section][index] : dataSet[section];

  return Object.keys(fields).map((field) => {
    const value = fields[field];
    const isDateField = field.toLowerCase().includes("dat");

    // Vérifie si c’est un champ avec choix prédéfini (y compris Oui/No)
    const hasSelectOptions = selectOptions[field];

    return (
      <div key={field} className="flex flex-col">
        <label className="text-sm font-semibold mb-1">{field}</label>

        {hasSelectOptions ? (
          <select
            value={value}
            onChange={(e) => {
              // si la valeur est "true"/"false", on la convertit en bool
              const newValue =
                e.target.value === "true"
                  ? true
                  : e.target.value === "false"
                  ? false
                  : e.target.value;
              handleChange(section, index, field, newValue);
            }}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-green-300 focus:outline-none"
          >
            <option value="">-- Seleziona --</option>
            {hasSelectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : typeof value === "boolean" ? (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(section, index, field, e.target.checked)}
            className="accent-green-500"
          />
        ) : (
          <input
            type={isDateField ? "date" : "text"}
            value={value}
            placeholder={fieldDescriptions[field] || `Ex: ${field}`}
            onChange={(e) => handleChange(section, index, field, e.target.value)}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-green-300 focus:outline-none"
          />
        )}

        {fieldDescriptions[field] && (
          <small className="text-gray-500 mt-1">{fieldDescriptions[field]}</small>
        )}
      </div>
    );
  });
};

  const sectionsMap = [
    { section: "anagrafica" },
    { section: "recapiti", index: 0 },
    { section: "contatti", index: 0 },
    { section: "attivita_professionale", index: 0 },
    { section: "studi_associati", index: 0 },
    { section: "albo", index: 0 },
    { section: "settori", index: 0 },
    { section: "abilitazioni", index: 0 },
    { section: "titoli", index: 0 },

  ];

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white shadow-2xl rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-center text-yellow-700 mb-4">Modifica DataSet</h3>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {steps.map((label, index) => (
          <button key={index} type="button" onClick={() => setStep(index)} className={`px-4 py-2 rounded text-sm font-medium border transition ${step===index?"bg-yellow-500 text-white border-yellow-500":"bg-white text-yellow-500 border-yellow-500 hover:bg-yellow-50"}`}>{label}</button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 gap-4">
            {renderFields(sectionsMap[step].section, sectionsMap[step].index)}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">Indietro</button>}
          <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">{step===steps.length-1?"Aggiorna DataSet":"Avanti"}</button>
        </div>
      </form>
    </div>
  );
};

export default EditDataSet;