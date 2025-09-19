import Settori from "../models/Settori.js";
import Albo from "../models/Albo.js";

// ➕ Créer un Settore pour un Albo
export const createSettore = async (req, res) => {
  try {
    const { alboId } = req.params;
    const albo = await Albo.findByPk(alboId);
    if (!albo) return res.status(404).json({ message: "Albo non trouvé" });

    const settore = await Settori.create({ ...req.body, albo_id: alboId });
    res.status(201).json({ success: true, data: settore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Récupérer tous les Settori d’un Albo
export const getSettoriByAlbo = async (req, res) => {
  try {
    const { alboId } = req.params;
    if (!alboId) {
      return res.status(400).json({ message: "alboId manquant" });
    }

    const settori = await Settori.findAll({ where: { albo_id: alboId } });
    res.json({ success: true, count: settori.length, data: settori });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// ✏️ Mettre à jour un Settore
export const updateSettore = async (req, res) => {
  try {
    const settore = await Settori.findByPk(req.params.id);
    if (!settore) return res.status(404).json({ message: "Settore non trouvé" });

    await settore.update(req.body);
    res.json({ success: true, data: settore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Supprimer un Settore
export const deleteSettore = async (req, res) => {
  try {
    const settore = await Settori.findByPk(req.params.id);
    if (!settore) return res.status(404).json({ message: "Settore non trouvé" });

    await settore.destroy();
    res.json({ success: true, message: "Settore supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


