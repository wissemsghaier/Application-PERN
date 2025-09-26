import User from "../models/User.js";
import Ordine from "../models/Ordine.js";


// 🔹 Lister tous les utilisateurs avec leurs ordini assignés
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Ordine,
          as: "assignedOrdini",
          through: { attributes: [] }, // cache les colonnes de la table pivot
        },
      ],
    });
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

 //🔹 Mettre à jour un utilisateur
 export const updateUser = async (req, res) => {
   try {
     const { id } = req.params;
     const [updated] = await User.update(req.body, { where: { id } });
     if (!updated) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

     const updatedUser = await User.findByPk(id);
     res.json({ success: true, message: "Utilisateur mis à jour", data: updatedUser });
   } catch (err) {
     res.status(400).json({ success: false, error: err.message });
   }
 };




// 🔹 Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Retirer toutes les assignations dans la table pivot
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

    await user.setAssignedOrdini([]); // supprime toutes les relations Many-to-Many
    await user.destroy();

    res.json({ success: true, message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 Assigner des ordini à un utilisateur
export const assignOrdine = async (req, res) => {
  try {
    const { id } = req.params;
    const { ordineIds } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

    // Ajouter les ordini à l'utilisateur sans doublon
    const ordini = await Ordine.findAll({ where: { id: ordineIds } });
    await user.addAssignedOrdini(ordini);

    // Retourner les ordini assignés
    const updatedUser = await User.findByPk(id, {
      include: { model: Ordine, as: "assignedOrdini", through: { attributes: [] } },
    });

    res.json({ success: true, message: "Ordini assignés avec succès à l'utilisateur", data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de l’assignation", error: err.message });
  }
};

// 🔹 Supprimer des ordini assignés à un utilisateur
export const removeOrdiniFromUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { ordineIds } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

    const ordini = await Ordine.findAll({ where: { id: ordineIds } });
    await user.removeAssignedOrdini(ordini);

    const updatedUser = await User.findByPk(id, {
      include: { model: Ordine, as: "assignedOrdini", through: { attributes: [] } },
    });

    res.json({ success: true, message: "Ordini retirés avec succès de l'utilisateur", data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de la suppression des ordini", error: err.message });
  }
};
