// import User from "../models/User.js";
// import Ordine from "../models/Ordine.js";  // <-- manquait

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().populate("assignedOrdini");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // export const assignOrdine = async (req, res) => {
// //   try {
// //     const { ordineIds } = req.body; // tableau d'ID d'ordini
// //     const user = await User.findByIdAndUpdate(
// //       req.params.id,
// //       { $addToSet: { assignedOrdini: { $each: ordineIds } } }, // évite les doublons
// //       { new: true }
// //     ).populate("assignedOrdini");

// //     res.json({ message: "Ordini assignés", user });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };


// // export const assignOrdine = async (req, res) => {
// //   try {
// //     const { ordineIds } = req.body; // tableau d'ID d'ordini
// //     const user = await User.findByIdAndUpdate(
// //       req.params.id,
// //       { $addToSet: { assignedOrdini: { $each: ordineIds } } }, // évite les doublons
// //       { new: true }
// //     ).populate("assignedOrdini");

// //     // Mettre à jour chaque Ordine pour refléter l'utilisateur assigné
// //     await Ordine.updateMany(
// //       { _id: { $in: ordineIds } },
// //       { $set: { assignedTo: user._id } }
// //     );

// //     res.json({ message: "Ordini assignés", user });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };

// // Assigner des ordini à un user
// // PUT /api/ordini/:id/assign
// // PUT /api/users/:id/assign


// export const assignOrdine = async (req, res) => {
//   try {
//     const { id } = req.params;       // ID de l'utilisateur
//     const { ordineIds } = req.body;  // Liste d'ordini à assigner

//     // Vérifier si l'utilisateur existe
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     // Ajouter les ordini à l'utilisateur (éviter les doublons)
//     ordineIds.forEach(ordineId => {
//       if (!user.assignedOrdini.includes(ordineId)) {
//         user.assignedOrdini.push(ordineId);
//       }
//     });
//     await user.save();

//     // Mettre à jour chaque Ordine pour ajouter l'utilisateur (éviter doublons)
//     await Ordine.updateMany(
//       { _id: { $in: ordineIds } },
//       { $addToSet: { assignedTo: user._id } }  // ajoute sans supprimer les précédents
//     );

//     res.status(200).json({
//       message: "Ordini assignés avec succès à l'utilisateur",
//       user
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Erreur lors de l’assignation",
//       error: error.message
//     });
//   }
// };


import User from "../models/User.js";
import Ordine from "../models/Ordine.js";

// 🔹 Lister tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("assignedOrdini");
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.json({ success: true, message: "Utilisateur mis à jour", data: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 🔹 Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    // Retirer l'utilisateur de tous les ordini où il est assigné
    await Ordine.updateMany(
      { assignedTo: deletedUser._id },
      { $pull: { assignedTo: deletedUser._id } }
    );

    res.json({ success: true, message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 Assigner des ordini à un utilisateur
export const assignOrdine = async (req, res) => {
  try {
    const { id } = req.params;       // ID de l'utilisateur
    const { ordineIds } = req.body;  // Liste d'ordini à assigner

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

    // Ajouter les ordini à l'utilisateur (éviter doublons)
    ordineIds.forEach(ordineId => {
      if (!user.assignedOrdini.includes(ordineId)) user.assignedOrdini.push(ordineId);
    });
    await user.save();

    // Mettre à jour chaque Ordine pour ajouter l'utilisateur
    await Ordine.updateMany(
      { _id: { $in: ordineIds } },
      { $addToSet: { assignedTo: user._id } }
    );

    res.json({ success: true, message: "Ordini assignés avec succès à l'utilisateur", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de l’assignation", error: err.message });
  }
};

// 🔹 Supprimer des ordini assignés à un utilisateur
export const removeOrdiniFromUser = async (req, res) => {
  try {
    const { id } = req.params;       // ID utilisateur
    const { ordineIds } = req.body;  // IDs des ordini à retirer

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

    // Retirer les ordini du user
    user.assignedOrdini = user.assignedOrdini.filter(oId => !ordineIds.includes(oId.toString()));
    await user.save();

    // Retirer l'utilisateur des ordini
    await Ordine.updateMany(
      { _id: { $in: ordineIds } },
      { $pull: { assignedTo: user._id } }
    );

    res.json({ success: true, message: "Ordini retirés avec succès de l'utilisateur", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de la suppression des ordini", error: err.message });
  }
};
