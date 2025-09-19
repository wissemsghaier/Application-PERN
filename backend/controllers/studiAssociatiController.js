import StudiAssociati from "../models/StudiAssociati.js";
import Anagrafica from "../models/Anagrafica.js";

export const createStudioAssociato = async (req, res) => {
  try {
    const { anagraficaId } = req.params;
    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica) return res.status(404).json({ message: "Anagrafica non trouvée" });
    const studio = await StudiAssociati.create({ ...req.body, anagrafica_id: anagraficaId });
    res.status(201).json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudiByAnagrafica = async (req, res) => {
  try {
    const studi = await StudiAssociati.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: studi.length, data: studi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudio = async (req, res) => {
  try {
    const studio = await StudiAssociati.findByPk(req.params.id);
    if (!studio) return res.status(404).json({ message: "Non trouvé" });
    await studio.update(req.body);
    res.json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudio = async (req, res) => {
  try {
    const studio = await StudiAssociati.findByPk(req.params.id);
    if (!studio) return res.status(404).json({ message: "Non trouvé" });
    await studio.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
