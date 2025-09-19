import Albo from "../models/Albo.js";
import Anagrafica from "../models/Anagrafica.js";

// // 🔹 Champs date de Albo
// const dateFields = ["andatisc", "andatpis", "andatcan", "andatdec", "andtisno", "andtdeca"];

// // 🔹 Normalisation du payload avant Sequelize
// const normalizeAlboPayload = (data) => {
//   const payload = { ...data };

//   // Transforme les dates
//   dateFields.forEach(f => {
//     if (payload[f]) payload[f] = new Date(payload[f]);
//     else payload[f] = null;
//   });

//   // Checkbox / flags
//   if ("anflgisc" in payload) {
//     payload.anflgisc = payload.anflgisc ? "Si" : "No";
//   }

//   return payload;
// };

export const createAlbo = async (req, res) => {
  try {
    const { anagraficaId } = req.params;
    
    // 🔹 Vérifie si l'Anagrafica existe
    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica) {
      return res.status(404).json({ message: `Anagrafica avec id=${anagraficaId} non trouvée` });
    }

    // 🔹 Création directe de l'Albo sans normalisation
    const albo = await Albo.create({ ...req.body, anagrafica_id: anagraficaId });

    // 🔹 Réponse réussie
    res.status(201).json({ success: true, data: albo });

  } catch (error) {
    console.error("CREATE ALBO ERROR:", error);

    // 🔹 Gestion des erreurs de clé étrangère
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        success: false,
        message: `Impossible de créer l'Albo : l'anagrafica_id=${req.params.anagraficaId} n'existe pas dans la table Anagrafica.`
      });
    }

    // 🔹 Autres erreurs
    res.status(500).json({ success: false, error: error.message });
  }
};



export const getAlboByAnagrafica = async (req, res) => {
  try {
    const albo = await Albo.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: albo.length, data: albo });
  } catch (error) {
    console.error("GET ALBO ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAlbo = async (req, res) => {
  try {
    const { id, anagraficaId } = req.params;

    // 🔹 Vérifier que l'albo existe et appartient à l'anagrafica
    const albo = await Albo.findOne({ where: { id, anagrafica_id: anagraficaId } });
    if (!albo) return res.status(404).json({ message: "Albo non trouvé pour cette Anagrafica" });

    // 🔹 Préparer le payload sans anagrafica_id
    const { anagrafica_id, ...safePayload } = req.body;

    // 🔹 Mise à jour
    await albo.update(safePayload);

    res.json({ success: true, data: albo });
  } catch (error) {
    console.error("UPDATE ALBO ERROR:", error);

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        success: false,
        message: `Impossible de mettre à jour : anagrafica_id invalide.`,
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
};



export const deleteAlbo = async (req, res) => {
  try {
    const albo = await Albo.findByPk(req.params.id);
    if (!albo) return res.status(404).json({ message: "Albo non trouvé" });

    await albo.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    console.error("DELETE ALBO ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
