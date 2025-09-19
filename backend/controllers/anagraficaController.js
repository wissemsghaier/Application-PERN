// controllers/anagraficaController.js
import Anagrafica from "../models/Anagrafica.js";
import Recapiti from "../models/Recapiti.js";
import Contatti from "../models/Contatti.js";
import AttivitaProfessionale from "../models/AttivitaProfessionale.js";
import StudiAssociati from "../models/StudiAssociati.js";
import Albo from "../models/Albo.js";
import Settori from "../models/Settori.js";
import Abilitazioni from "../models/Abilitazioni.js";
import Titoli from "../models/Titoli.js";





export const createAnagrafica = async (req, res) => {
  try {
    const { ordineId } = req.params;

    if (!ordineId) 
      return res.status(400).json({ error: "ordineId manquant" });

    // 🔹 Nettoyer les champs vides
    const cleanData = { ...req.body };
    Object.keys(cleanData).forEach((key) => {
      if (cleanData[key] === "") cleanData[key] = null;
    });

    // 🔹 Créer l'anagrafica avec mapping Sequelize
    const anagrafica = await Anagrafica.create({
      ...cleanData,
      ordineId: ordineId,          // camelCase pour le code
      ordine_id: ordineId,         // snake_case pour la colonne
    });

    // 🔹 Si tu veux créer des subtables liées
    // Exemple : recapiti
    if (cleanData.recapiti && Array.isArray(cleanData.recapiti)) {
      for (const r of cleanData.recapiti) {
        await Recapiti.create({
          ...r,
          anagraficaId: anagrafica.id, // mapping vers la clé étrangère
          anagrafica_id: anagrafica.id,
        });
      }
    }

    // 🔹 Idem pour Contatti, AttivitaProfessionale, etc.
    // if (cleanData.contatti) { ... }

    res.status(201).json({ success: true, data: anagrafica });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAnagrafica = async (req, res) => {
  try {
    const { id } = req.params;

    const anagrafica = await Anagrafica.findByPk(id);
    if (!anagrafica) return res.status(404).json({ message: "Anagrafica non trouvé" });

    // 🔹 Nettoyer les champs vides
    const cleanData = { ...req.body };
    Object.keys(cleanData).forEach((key) => {
      if (cleanData[key] === "") cleanData[key] = null;
    });

    await anagrafica.update(cleanData);

    res.json(anagrafica);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/ordini/:ordineId/anagrafica
export const getAnagraficaByOrdine = async (req, res) => {
  const { ordineId } = req.params;

  try {
    // Récupère seulement les anagrafiche liées à cet ordine
    const anagrafiche = await Anagrafica.findAll({
      where: { ordine_id: ordineId }, // <-- utiliser ordre_id comme défini dans le modèle
    });

    res.json(anagrafiche);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getAnagraficaById = async (req, res) => {
  try {
    const anagrafica = await Anagrafica.findByPk(req.params.id);
    if (!anagrafica) return res.status(404).json({ message: "Non trouvé" });
    res.json(anagrafica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteAnagrafica = async (req, res) => {
  try {
    const anagrafica = await Anagrafica.findByPk(req.params.id);
    if (!anagrafica) return res.status(404).json({ message: "Non trouvé" });

    await anagrafica.destroy();
    res.json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ------------------------------
// 🔹 Visualiser toutes les sous-tables d'une Anagrafica
// ------------------------------
export const getAnagraficaWithSubTables = async (req, res) => {
  try {
    const { id } = req.params;

    const anagrafica = await Anagrafica.findByPk(id, {
      include: [
        { model: Recapiti, as: "recapiti" },
        { model: Contatti, as: "contatti" },
        { model: AttivitaProfessionale, as: "attivita_professionale" },
        { model: StudiAssociati, as: "studi_associati" },
        {
          model: Albo,
          as: "albi",
          include: [{ model: Settori, as: "settori" }] // inclure Settori depuis Albo
        },
        { model: Abilitazioni, as: "abilitazioni" },
        { model: Titoli, as: "titoli" }
      ]
    });

    if (!anagrafica)
      return res.status(404).json({ success: false, message: "Anagrafica non trouvée" });

    res.json({ success: true, data: anagrafica });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};





