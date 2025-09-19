import Titoli from "../models/Titoli.js";
import Anagrafica from "../models/Anagrafica.js";

export const createTitolo = async (req, res) => {
  try {
    const { anagraficaId } = req.params;

    const anagrafica = await Anagrafica.findByPk(anagraficaId);
    if (!anagrafica)
      return res.status(404).json({ message: "Anagrafica non trouvée" });

    // Filtrer seulement les champs définis dans le modèle
    const allowedFields = [
      "ancodtit", "andattit", "ancuniti", "anuniesp",
      "anpuntit", "anlodtit", "anntit", "anclasse",
      "andicris", "andritcl", "ancaricl",
      "anflita", "anrimti", "anricuti", "antivver"
    ];

    const data = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    // Ajouter la relation avec Anagrafica
    data.anagrafica_id = anagraficaId;

    const titolo = await Titoli.create(data);
    res.status(201).json({ success: true, data: titolo });
  } catch (error) {
    console.error("Erreur createTitolo:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getTitoliByAnagrafica = async (req, res) => {
  try {
    const titoli = await Titoli.findAll({ where: { anagrafica_id: req.params.anagraficaId } });
    res.json({ success: true, count: titoli.length, data: titoli });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTitolo = async (req, res) => {
  try {
    const titolo = await Titoli.findByPk(req.params.id);
    if (!titolo) return res.status(404).json({ message: "Non trouvé" });
    await titolo.update(req.body);
    res.json({ success: true, data: titolo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTitolo = async (req, res) => {
  try {
    const titolo = await Titoli.findByPk(req.params.id);
    if (!titolo) return res.status(404).json({ message: "Non trouvé" });
    await titolo.destroy();
    res.json({ success: true, message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
