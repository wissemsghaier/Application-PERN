import Abilitazioni from "../models/Abilitazioni.js";
import Anagrafica from "../models/Anagrafica.js";

export const createAbilitazione = async (req, res) => {
  try {
    const { anagraficaId } = req.params;
    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica) return res.status(404).json({ message: "Anagrafica non trouvée" });
    const abilitazione = await Abilitazioni.create({ ...req.body, anagrafica_id: anagraficaId });
    res.status(201).json({ success: true, data: abilitazione });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAbilitazioniByAnagrafica = async (req, res) => {
  try {
    const abilitazioni = await Abilitazioni.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: abilitazioni.length, data: abilitazioni });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAbilitazione = async (req, res) => {
  try {
    const abilitazione = await Abilitazioni.findByPk(req.params.id);
    if (!abilitazione) return res.status(404).json({ message: "Non trouvé" });
    await abilitazione.update(req.body);
    res.json({ success: true, data: abilitazione });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAbilitazione = async (req, res) => {
  try {
    const abilitazione = await Abilitazioni.findByPk(req.params.id);
    if (!abilitazione) return res.status(404).json({ message: "Non trouvé" });
    await abilitazione.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
