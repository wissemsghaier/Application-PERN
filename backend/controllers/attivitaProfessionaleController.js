import AttivitaProfessionale from "../models/AttivitaProfessionale.js";
import Anagrafica from "../models/Anagrafica.js";

export const createAttivita = async (req, res) => {
  try {
    const { anagraficaId } = req.params;
    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica) return res.status(404).json({ message: "Anagrafica non trouvée" });
    const attivita = await AttivitaProfessionale.create({ ...req.body, anagrafica_id: anagraficaId });
    res.status(201).json({ success: true, data: attivita });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttivitaByAnagrafica = async (req, res) => {
  try {
    const attivita = await AttivitaProfessionale.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: attivita.length, data: attivita });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAttivita = async (req, res) => {
  try {
    const attivita = await AttivitaProfessionale.findByPk(req.params.id);
    if (!attivita) return res.status(404).json({ message: "Non trouvé" });
    await attivita.update(req.body);
    res.json({ success: true, data: attivita });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAttivita = async (req, res) => {
  try {
    const attivita = await AttivitaProfessionale.findByPk(req.params.id);
    if (!attivita) return res.status(404).json({ message: "Non trouvé" });
    await attivita.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
