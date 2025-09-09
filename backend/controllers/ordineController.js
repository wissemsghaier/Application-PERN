// import Ordine from "../models/Ordine.js";

// // export const createOrdine = async (req, res) => {
// //   try {
// //     // On crée un nouvel Ordine avec les données envoyées dans le body
// //     const newOrdine = new Ordine(req.body);

// //     // On sauvegarde dans la base MongoDB
// //     const savedOrdine = await newOrdine.save();

// //     // On renvoie le nouvel Ordine créé avec le code 201 (Created)
// //     res.status(201).json({
// //       success: true,
// //       message: "Ordine créé avec succès",
// //       data: savedOrdine
// //     });
// //   } catch (err) {
// //     res.status(400).json({ success: false, error: err.message });
// //   }
// // };


// export const createOrdine = async (req, res) => {
//   try {
//     const { numero, dataSets, parentOrdine } = req.body;

//     const newOrdine = new Ordine({
//       numero,
//       dataSets: dataSets || [],
//       parentOrdine: parentOrdine || null
//     });

//     const savedOrdine = await newOrdine.save();

//     res.status(201).json({
//       success: true,
//       message: "Ordine créé avec succès",
//       data: savedOrdine
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };



// export const addDataSetToOrdine = async (req, res) => {
//   try {
//     const { ordineNumero, newDataSet } = req.body;

//     const updatedOrdine = await Ordine.findOneAndUpdate(
//       { numero: ordineNumero },              // trouve l'Ordine existant
//       { $push: { dataSets: newDataSet } },  // ajoute un nouveau dataset
//       { new: true }                          // retourne le document mis à jour
//     );

//     if (!updatedOrdine) {
//       return res.status(404).json({ success: false, message: "Ordine non trouvé" });
//     }

//     res.json({ success: true, message: "DataSet ajouté", data: updatedOrdine });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };




// export const getAllOrdini = async (req, res) => {
//   try {
//     // On récupère tous les ordini et on "popule" le champ assignedTo pour voir l'utilisateur lié
//     const ordini = await Ordine.find().populate("assignedTo", "username role");

//     res.json({
//       success: true,
//       count: ordini.length,
//       data: ordini
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };



// export const getOrdineById = async (req, res) => {
//   try {
//     const ordine = await Ordine.findById(req.params.id).populate("assignedTo", "username role");
    
//     if (!ordine) {
//       return res.status(404).json({ success: false, message: "Ordine non trouvé" });
//     }

//     res.json({ success: true, data: ordine });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };



// export const updateOrdine = async (req, res) => {
//   try {
//     // findByIdAndUpdate retourne l'objet mis à jour si { new: true }
//     const updatedOrdine = await Ordine.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     if (!updatedOrdine) {
//       return res.status(404).json({ success: false, message: "Ordine non trouvé" });
//     }

//     res.json({ success: true, message: "Ordine mis à jour", data: updatedOrdine });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };


// export const deleteOrdine = async (req, res) => {
//   try {
//     const deletedOrdine = await Ordine.findByIdAndDelete(req.params.id);

//     if (!deletedOrdine) {
//       return res.status(404).json({ success: false, message: "Ordine non trouvé" });
//     }

//     res.json({ success: true, message: "Ordine supprimé avec succès" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };







import mongoose from "mongoose";
import Ordine from "../models/Ordine.js";
import User from "../models/User.js";

// 📌 Créer un Ordine simple (sans dataset)
export const createOrdine = async (req, res) => {
  try {
    const { numero, parentOrdine } = req.body;

    const newOrdine = new Ordine({
      numero,
      dataSets: [],             
      parentOrdine: parentOrdine || null
    });

    const savedOrdine = await newOrdine.save();

    res.status(201).json({
      success: true,
      message: "Ordine créé avec succès",
      data: savedOrdine
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 📌 Ajouter un DataSet à un Ordine existant
export const addDataSetToOrdine = async (req, res) => {
  try {
    const { id } = req.params;           // ID de l'Ordine depuis l'URL
    const { newDataSet } = req.body;     // DataSet depuis le body

    const updatedOrdine = await Ordine.findByIdAndUpdate(
      id,
      { $push: { dataSets: newDataSet } },
      { new: true }
    );

    if (!updatedOrdine) {
      return res.status(404).json({ success: false, message: "Ordine non trouvé" });
    }

    res.json({
      success: true,
      message: "DataSet ajouté avec succès",
      data: updatedOrdine
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 📌 Mettre à jour un DataSet spécifique d’un Ordine
export const updateDataSet = async (req, res) => {
  try {
    const { ordineId, datasetIndex } = req.params;
    const { updatedDataSet } = req.body;

    const ordine = await Ordine.findById(ordineId);
    if (!ordine) return res.status(404).json({ success: false, message: "Ordine non trouvé" });

    if (!ordine.dataSets[datasetIndex]) {
      return res.status(404).json({ success: false, message: "DataSet non trouvé" });
    }

    ordine.dataSets[datasetIndex] = updatedDataSet;
    await ordine.save();

    res.json({ success: true, message: "DataSet mis à jour", data: ordine });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 📌 Supprimer un DataSet d’un Ordine
export const deleteDataSet = async (req, res) => {
  try {
    const { ordineId, datasetIndex } = req.params;

    const ordine = await Ordine.findById(ordineId);
    if (!ordine) return res.status(404).json({ success: false, message: "Ordine non trouvé" });

    if (!ordine.dataSets[datasetIndex]) {
      return res.status(404).json({ success: false, message: "DataSet non trouvé" });
    }

    ordine.dataSets.splice(datasetIndex, 1);
    await ordine.save();

    res.json({ success: true, message: "DataSet supprimé", data: ordine });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 📌 Récupérer tous les Ordini
export const getAllOrdini = async (req, res) => {
  try {
    const ordini = await Ordine.find().populate("assignedTo", "username role");
    res.json({ success: true, count: ordini.length, data: ordini });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📌 Récupérer un Ordine par ID
export const getOrdineById = async (req, res) => {
  try {
    const ordine = await Ordine.findById(req.params.id).populate("assignedTo", "username role");
    if (!ordine) return res.status(404).json({ success: false, message: "Ordine non trouvé" });
    res.json({ success: true, data: ordine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📌 Mettre à jour un Ordine
export const updateOrdine = async (req, res) => {
  try {
    const updatedOrdine = await Ordine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrdine) return res.status(404).json({ success: false, message: "Ordine non trouvé" });
    res.json({ success: true, message: "Ordine mis à jour", data: updatedOrdine });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// 📌 Supprimer un Ordine
// export const deleteOrdine = async (req, res) => {
//   try {
//     const deletedOrdine = await Ordine.findByIdAndDelete(req.params.id);
//     if (!deletedOrdine) return res.status(404).json({ success: false, message: "Ordine non trouvé" });
//     res.json({ success: true, message: "Ordine supprimé avec succès" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };




// export const deleteOrdine = async (req, res) => {
//   try {
//     const ordineId = req.params.id;

//     // 1️⃣ Supprimer l'Ordine
//     const deletedOrdine = await Ordine.findByIdAndDelete(ordineId);
//     if (!deletedOrdine)
//       return res.status(404).json({ success: false, message: "Ordine non trouvé" });

//     // 2️⃣ Supprimer les références de l'Ordine dans assignedOrdini des utilisateurs
//     await User.updateMany(
//       { assignedOrdini: mongoose.Types.ObjectId(ordineId) }, // convertir en ObjectId
//       { $pull: { assignedOrdini: mongoose.Types.ObjectId(ordineId) } }
//     );

//     res.json({ success: true, message: "Ordine et ses assignations supprimés avec succès" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };









export const deleteOrdine = async (req, res) => {
  try {
    const ordineId = req.params.id;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(ordineId)) {
      return res.status(400).json({ success: false, message: "ID non valide" });
    }

    // 1️⃣ Supprimer l'ordre
    const deletedOrdine = await Ordine.findByIdAndDelete(ordineId);
    if (!deletedOrdine) {
      return res.status(404).json({ success: false, message: "Ordine non trouvé" });
    }

    // 2️⃣ Supprimer les références si elles existent
    await User.updateMany(
      { assignedOrdini: { $in: [ordineId] } }, // seulement si l'ID est présent
      { $pull: { assignedOrdini: ordineId } }
    );

    // Réponse réussie
    res.status(200).json({ success: true, message: "Ordine et ses assignations supprimés avec succès" });
  } catch (err) {
    console.error("Erreur backend deleteOrdine:", err);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la suppression de l'ordre" });
  }
};