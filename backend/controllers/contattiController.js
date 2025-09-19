import Contatti from "../models/Contatti.js";
import Anagrafica from "../models/Anagrafica.js";

export const createContatto = async (req, res) => {
  try {
    const { anagraficaId } = req.params;
    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica) return res.status(404).json({ message: "Anagrafica non trouvée" });
    const contatto = await Contatti.create({ ...req.body, anagrafica_id: anagraficaId });
    res.status(201).json({ success: true, data: contatto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContattiByAnagrafica = async (req, res) => {
  try {
    const contatti = await Contatti.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: contatti.length, data: contatti });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContatto = async (req, res) => {
  try {
    const contatto = await Contatti.findByPk(req.params.id);
    if (!contatto) return res.status(404).json({ message: "Non trouvé" });
    await contatto.update(req.body);
    res.json({ success: true, data: contatto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContatto = async (req, res) => {
  try {
    const contatto = await Contatti.findByPk(req.params.id);
    if (!contatto) return res.status(404).json({ message: "Non trouvé" });
    await contatto.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
