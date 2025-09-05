// import mongoose from "mongoose";

// const ordineSchema = new mongoose.Schema({
//      numero: { type: String, required: true, unique: true }, // Ex: "Ordine 1", "Ordine 2"
//   // ================================
//   // 📌 Tabella ANAGRAFICA ISCRITTI
//   // ================================
//   anagrafica: {
//     ANSERIALE: { type: String }, // C 10 - Seriale anagrafica
//     ANCOGNOM: { type: String },  // C 40 - Cognome
//     AN_NOME: { type: String },   // C 40 - Nome
//     ANCODNAZ: { type: String },  // C 4 - Codice Nazionalità
//     AN_SESSO: { type: String },  // C 1 - Sesso (M/F)
//     ANDATNAS: { type: Date },    // D 8 - Data di Nascita
//     ANCOMNAS: { type: String },  // C 4 - Cod. Comune Nascita
//     ANLOCNAS: { type: String },  // C 40 - Luogo di Nascita
//     ANPRONAS: { type: String },  // C 2 - Provincia di Nascita
//     ANESTNAS: { type: String },  // C 50 - Località Estera Nascita
//     ANNAZNAS: { type: String },  // C 4 - Nazione di Nascita
//     ANCODFIS: { type: String },  // C 16 - Codice Fiscale
//     ANFLGCFM: { type: String },  // C 1 - Flag CF Ministero
//     ANPARIVA: { type: String },  // C 12 - Partita IVA
//     ANISCRIT: { type: String },  // C 1 - Iscritti (S/N)
//     AN_NOTE: { type: String },   // C 254 - Note
//     ANTITOLO: { type: String },  // C 15 - Titolo
//     ANLIBERO: { type: String },  // C 20 - Campo Libero
//     ANDATVAR: { type: Date },    // D 8 - Data Variazione
//     ANNUSSIG: { type: Number },  // N 6 - Numero Sigillo
//     ANDATSIG: { type: Date },    // D 8 - Data Sigillo
//     ANDTRESI: { type: Date },    // D 8 - Data Reso Sigillo
//     ANCODCON: { type: String },  // C 7 - Codice Controparte
//     ANATTENZ: { type: String },  // C 1 - Attenzione
//     ANCODOPE: { type: Number },  // N 2 - Operatore
//     ANDTVRAN: { type: Date },    // D 8 - Data Variazione Dati Anagrafici
//     ANMATCAS: { type: String },  // C 10 - Matricola Cassa
//     ANDTEIC: { type: Date },     // D 8 - Decorrenza Iscrizione Cassa
//     ANDTDLCC: { type: Date },    // D 8 - Delibera Cancellazione Cassa
//     ANFLGSOS: { type: String },  // C 1 - Flag Sospeso
//     ANDTSOSP: { type: Date },    // D 8 - Data Sospensione
//     ANMOSOSP: { type: String },  // C 50 - Motivo Sospensione
//     ANPRIVAC: { type: String },  // C 1 - Assenso Privacy
//     ANDATPRV: { type: Date },    // D 8 - Data Assenso Privacy
//     ANAUTTR: { type: String },   // C 1 - Autorizzazione Trasferimento Dati
//     ANDTAUTR: { type: Date },    // D 8 - Data Autorizzazione Trasferimento
//     ANDTSCPE: { type: Date },    // D 8 - Data Scadenza Permesso Soggiorno
//     ANFLGING: { type: String },  // C 1 - Posizione Incongruente
//     ANCODCEC: { type: String },  // C 10 - Codice Eccezione
//     ANOLD_CF: { type: String },  // C 16 - Codice Fiscale Precedente
//     ANDTEXCF: { type: Date },    // D 8 - Data invio CF variato
//     ANNOEXPO: { type: String },  // C 1 - Flag Non Export
//     ANIDANPR: { type: String },  // C 9 - ID Soggetto F.N.O.M.C.E.O.
//   },

//   // ================================
//   // 📌 Tabella RECAPITI
//   // ================================
//   recapiti: [
//     {
//       ANTIPIND: { type: String }, // C 1 - Tipologia Indirizzo
//       ANINDIRI: { type: String }, // C 50 - Indirizzo
//       AN_CAP: { type: String },   // C 4 - CAP
//       ANCODCOM: { type: String }, // C 4 - Codice Comune
//       ANLOCALI: { type: String }, // C 50 - Località
//       ANPROVIN: { type: String }, // C 2 - Provincia
//       ANNAZION: { type: String }, // C 4 - Nazione
//       ANTELEFO: { type: String }, // C 18 - Telefono
//       ANTELFAX: { type: String }, // C 18 - Fax
//       ANPUBWEB: { type: String }, // C 1 - Visibile su Web (S/N)
//     },
//   ],

//   // ================================
//   // 📌 Tabella CONTATTI
//   // ================================
//   contatti: [
//     {
//       ANTIPCON: { type: String }, // C 1 - Tipo contatto (Cellulare, Email, PEC, etc.)
//       ANDESCON: { type: String }, // C 254 - Descrizione contatto
//       ANPUBWEB: { type: String }, // C 1 - Visibile su Web
//     },
//   ],

//   // ================================
//   // 📌 Tabella ATTIVITÀ PROFESSIONALE
//   // ================================
//   attivita_professionale: [
//     {
//       ANCODATT: { type: String }, // C 2 - Codice Attività Professionale
//       ANDESATT: { type: String }, // C 50 - Descrizione
//       ANDTINAP: { type: Date },   // D 8 - Data inizio
//       ANDTIFAP: { type: Date },   // D 8 - Data fine
//       ANCONSSN: { type: String }, // C 1 - Convenzionato SSN
//       ANREGPRO: { type: String }, // C 3 - Regione attività
//       ANDATSSN: { type: Date },   // D 8 - Data Conv. SSN
//       ANDIP_PA: { type: String }, // C 1 - Dipendente PA
//       ANCODCON: { type: String }, // C 2 - Zona X Incarichi
//       ANDICCAT: { type: String }, // C 3 - Categoria CCNL
//       ANDIPORA: { type: String }, // C 1 - Full-time/Part-time
//       ANDIPCON: { type: String }, // C 1 - Tempo ind./det.
//       ANDICCNL: { type: String }, // C 5 - Codice CCNL
//       ANDIPCOO: { type: String }, // C 1 - Coordinamento
//       ANDIPDIR: { type: String }, // C 1 - Dirigenza
//       ANESEPRO: { type: String }, // C 1 - Esercita la professione
//     },
//   ],

//   // ================================
//   // 📌 Tabella STUDI ASSOCIATI
//   // ================================
//   studi_associati: [
//     {
//       ANSTUASS: { type: String }, // C 5 - Codice Studio Associato
//       ANCARSTU: { type: String }, // C 2 - Codice Carica Studio
//       ANDTINSA: { type: Date },   // D 8 - Data inserimento
//       ANDTFISA: { type: Date },   // D 8 - Data fuoriuscita
//     },
//   ],

//   // ================================
//   // 📌 Tabella ALBO
//   // ================================
//   albo: [
//     {
//       ANTIPISC: { type: String }, // C 1 - Tipologia Albo
//       ANNUNISC: { type: Number }, // N 6 - Numero Iscrizione
//       ANDATISC: { type: Date },   // D 8 - Data Iscrizione
//       ANDATPIS: { type: Date },   // D 8 - Data Prima Iscrizione
//       ANORPROV: { type: String }, // C 2 - Ordine di Provenienza
//       ANMOTCAN: { type: String }, // C 2 - Motivo Cancellazione
//       ANDESCAN: { type: String }, // C 254 - Descrizione Motivo
//       ANDATCAN: { type: Date },   // D 8 - Data Cancellazione
//       ANDATDEC: { type: Date },   // D 8 - Data Decesso
//       ANDTOTRA: { type: String }, // C 3 - Ordine Trasferimento
//       ANDTISNO: { type: Date },   // D 8 - Data Nuovo Ordine
//       ANFLGISC: { type: String }, // C 1 - Iscritto Albo
//       ANDTDECA: { type: Date },   // D 8 - Data delibera cancellazione
//     },
//   ],

//   // ================================
//   // 📌 Tabella SETTORI
//   // ================================
//   settori: [
//     {
//       ANSEZION: { type: String }, // C 1 - Sezione
//       ANSOTSEZ: { type: String }, // C 2 - Sottosezione
//       ANSEZSPE: { type: String }, // C 1 - Flag Sezione Speciale
//       ANSETTOR: { type: String }, // C 5 - Codice Settore
//     },
//   ],

//   // ================================
//   // 📌 Tabella ABILITAZIONI
//   // ================================
//   abilitazioni: [
//     {
//       ANAMBABI: { type: String }, // C 40 - Ambito
//       ANDATABI: { type: Date },   // D 8 - Data
//       ANCUNABI: { type: String }, // C 8 - Codice Univ.
//       ANLOCABI: { type: String }, // C 30 - Località
//       ANPUNABI: { type: String }, // C 3 - Punteggio
//       ANLODEBI: { type: String }, // C 1 - Lode
//       ANABILVE: { type: String }, // C 1 - Verificata
//       ANDATARV: { type: Date },   // D 8 - Data riconoscimento
//     },
//   ],

//   // ================================
//   // 📌 Tabella TITOLI DI STUDIO
//   // ================================
//   titoli: [
//     {
//       ANCODTIT: { type: String }, // C 4 - Codice Titolo
//       ANDATTIT: { type: Date },   // D 8 - Data Consegna
//       ANCUNITI: { type: String }, // C 4 - Codice Università
//       ANUNIESP: { type: String }, // C 20 - Università
//       ANPUNTIT: { type: String }, // C 7 - Punteggio
//       ANLODTIT: { type: String, required: true },
//       ANNTIT: { type: Number, required: true },
//       ANCLASSE: { type: Number, required: true },
//       ANDICRIS: { type: String, required: true },
//       ANDRITCL: { type: Date, required: true },
//       ANCARICL: { type: String, required: true },
//       ANFLITA: { type: Boolean, required: true },
//       ANRIMTI: { type: Boolean, required: true },
//       ANRICUTI: { type: Boolean, required: true },
//       ANTIVVER: { type: Boolean, required: true }
//     },
//   ],

//   // ================================
//   // 🔗 Relation avec User
//   // ================================
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// });

// const Ordine = mongoose.model("Ordine", ordineSchema);

// export default Ordine;
import mongoose from "mongoose";

// Schéma pour chaque dataset d'un Ordine
const dataSetSchema = new mongoose.Schema({
  // ================================
  // 📌 Tabella ANAGRAFICA ISCRITTI
  // ================================
  anagrafica: {
    ANSERIALE: { type: String },  // Serial anagrafica
    ANCOGNOM: { type: String },   // Cognome
    AN_NOME: { type: String },    // Nome
    ANCODNAZ: { type: String },   // Codice nazionalità
    AN_SESSO: { type: String },   // Sesso
    ANDATNAS: { type: Date },     // Data nascita
    ANCOMNAS: { type: String },   // Codice comune nascita
    ANLOCNAS: { type: String },   // Luogo nascita
    ANPRONAS: { type: String },   // Provincia nascita
    ANESTNAS: { type: String },   // Località estera nascita
    ANNAZNAS: { type: String },   // Nazione nascita
    ANCODFIS: { type: String },   // Codice fiscale
    ANFLGCFM: { type: String },   // Flag CF Ministero
    ANPARIVA: { type: String },   // Partita IVA
    ANISCRIT: { type: String },   // Iscritto (S/N)
    AN_NOTE: { type: String },    // Note
    ANTITOLO: { type: String },   // Titolo
    ANLIBERO: { type: String },   // Campo libero
    ANDATVAR: { type: Date },     // Data variazione
    ANNUSSIG: { type: Number },   // Numero sigillo
    ANDATSIG: { type: Date },     // Data sigillo
    ANDTRESI: { type: Date },     // Data reso sigillo
    ANCODCON: { type: String },   // Codice controparte
    ANATTENZ: { type: String },   // Attenzione
    ANCODOPE: { type: Number },   // Operatore
    ANDTVRAN: { type: Date },     // Data variazione anagrafica
    ANMATCAS: { type: String },   // Matricola cassa
    ANDTEIC: { type: Date },      // Decorrenza iscrizione cassa
    ANDTDICC: { type: Date },     // Delibera iscrizione cassa
    ANDTDLCC: { type: Date },     // Delibera cancellazione cassa
    ANDTDEIC: { type: Date },     // Decorrenza cancellazione cassa
    ANFLGSOS: { type: String },   // Flag sospeso
    ANDTSOSP: { type: Date },     // Data sospensione
    ANMOSOSP: { type: String },   // Motivo sospensione
    ANPRIVAC: { type: String },   // Assenso privacy
    ANDATPRV: { type: Date },     // Data assenso privacy
    ANAUTTR: { type: String },    // Autorizzazione trasferimento dati
    ANDTAUTR: { type: Date },     // Data autorizzazione trasferimento
    ANDTSCPE: { type: Date },     // Data scadenza permesso soggiorno
    ANFLGING: { type: String },   // Posizione incongruente
    ANCODCEC: { type: String },   // Codice eccezione
    ANOLD_CF: { type: String },   // Codice fiscale precedente
    ANDTEXCF: { type: Date },     // Data invio CF variato
    ANNOEXPO: { type: String },   // Flag non export
    ANIDANPR: { type: String },   // ID soggetto FNOMCeO
  },

  // ================================
  // 📌 Tabella RECAPITI
  // ================================
  recapiti: [
    {
      ANTIPIND: { type: String },
      ANINDIRI: { type: String },
      AN_CAP: { type: String },
      ANCODCOM: { type: String },
      ANLOCALI: { type: String },
      ANPROVIN: { type: String },
      ANNAZION: { type: String },
      ANTELEFO: { type: String },
      ANTELFAX: { type: String },
      ANPUBWEB: { type: String },
    },
  ],

  // ================================
  // 📌 Tabella CONTATTI
  // ================================
  contatti: [
    {
      ANTIPCON: { type: String },
      ANDESCON: { type: String },
      ANPUBWEB: { type: String },
    },
  ],

  // ================================
  // 📌 Tabella ATTIVITÀ PROFESSIONALE
  // ================================
  attivita_professionale: [
    {
      ANCODATT: { type: String },
      ANDESATT: { type: String },
      ANDTINAP: { type: Date },
      ANDTIFAP: { type: Date },
      ANCONSSN: { type: String },
      ANREGPRO: { type: String },
      ANDATSSN: { type: Date },
      ANDIP_PA: { type: String },
      ANCODZON: { type: String },
      ANDICCAT: { type: String },
      ANDIPORA: { type: String },
      ANDIPCON: { type: String },
      ANDICCNL: { type: String },
      ANDIPCOO: { type: String },
      ANDIPDIR: { type: String },
      ANESEPRO: { type: String },
    },
  ],

  // ================================
  // 📌 Tabella STUDI ASSOCIATI
  // ================================
  studi_associati: [
    {
      ANSTUASS: { type: String },
      ANCARSTU: { type: String },
      ANDTINSA: { type: Date },
      ANDTFISA: { type: Date },
    },
  ],

  // ================================
  // 📌 Tabella ALBO
  // ================================
  albo: [
    {
      ANTIPISC: { type: String },
      ANNUNISC: { type: Number },
      ANDATISC: { type: Date },
      ANDATPIS: { type: Date },
      ANORPROV: { type: String },
      ANMOTCAN: { type: String },
      ANDESCAN: { type: String },
      ANDATCAN: { type: Date },
      ANDATDEC: { type: Date },
      ANDTOTRA: { type: String },
      ANDTISNO: { type: Date },
      ANFLGISC: { type: String },
      ANDTDECA: { type: Date },
    },
  ],

  // ================================
  // 📌 Tabella SETTORI
  // ================================
  settori: [
    {
      ANSEZION: { type: String },
      ANSOTSEZ: { type: String },
      ANSEZSPE: { type: String },
      ANSETTOR: { type: String },
    },
  ],

  // ================================
  // 📌 Tabella ABILITAZIONI
  // ================================
  abilitazioni: [
    {
      ANAMBABI: { type: String },
      ANDATABI: { type: Date },
      ANCUNABI: { type: String },
      ANLOCABI: { type: String },
      ANPUNABI: { type: String },
      ANLODEBI: { type: String },
      ANABILVE: { type: String },
      ANDATARV: { type: Date },
    },
  ],

  // ================================
  // 📌 Tabella TITOLI DI STUDIO
  // ================================
  titoli: [
    {
      ANCODTIT: { type: String },
      ANDATTIT: { type: Date },
      ANCUNITI: { type: String },
      ANUNIESP: { type: String },
      ANPUNTIT: { type: String },
      ANLODTIT: { type: String, required: true },
      ANNTIT: { type: Number, required: true },
      ANCLASSE: { type: Number, required: true },
      ANDICRIS: { type: String, required: true },
      ANDRITCL: { type: Date, required: true },
      ANCARICL: { type: String, required: true },
      ANFLITA: { type: Boolean, required: true },
      ANRIMTI: { type: Boolean, required: true },
      ANRICUTI: { type: Boolean, required: true },
      ANTIVVER: { type: Boolean, required: true },
    },
  ],

  // ================================
  // 🔹 Variables personnalisées
  // ================================
  variables: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

// Schéma principal Ordine
const ordineSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  dataSets: [dataSetSchema],            // Plusieurs datasets par Ordine
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // tableau
  parentOrdine: { type: mongoose.Schema.Types.ObjectId, ref: "Ordine", default: null }, // Sous-ordini
}, { timestamps: true });

const Ordine = mongoose.model("Ordine", ordineSchema);
export default Ordine;
