import Recapiti from "../models/Recapiti.js";
import Anagrafica from "../models/Anagrafica.js";

// 🔹 Créer un recapito lié à une anagrafica
export const createRecapito = async (req, res) => {
  try {
    const { anagraficaId } = req.params;
    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica) return res.status(404).json({ message: "Anagrafica non trouvée" });

    const recapito = await Recapiti.create({ ...req.body, anagrafica_id: anagraficaId });
    res.status(201).json({ success: true, data: recapito });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Récupérer tous les recapiti d’une anagrafica
export const getRecapitiByAnagrafica = async (req, res) => {
  try {
    const recapiti = await Recapiti.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: recapiti.length, data: recapiti });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Mettre à jour un recapito
export const updateRecapito = async (req, res) => {
  try {
    const recapito = await Recapiti.findByPk(req.params.id);
    if (!recapito) return res.status(404).json({ message: "Non trouvé" });

    await recapito.update(req.body);
    res.json({ success: true, data: recapito });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer un recapito
export const deleteRecapito = async (req, res) => {
  try {
    const recapito = await Recapiti.findByPk(req.params.id);
    if (!recapito) return res.status(404).json({ message: "Non trouvé" });

    await recapito.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
