import { Op } from "sequelize";
import User from "../models/User.js";
import Ordine from "../models/Ordine.js";
import Anagrafica from "../models/Anagrafica.js";
import Recapiti from "../models/Recapiti.js";
import Contatti from "../models/Contatti.js";
import AttivitaProfessionale from "../models/AttivitaProfessionale.js";
import StudiAssociati from "../models/StudiAssociati.js";
import Albo from "../models/Albo.js";
import Settori from "../models/Settori.js";
import Abilitazioni from "../models/Abilitazioni.js";
import Titoli from "../models/Titoli.js";
import PDFDocument from "pdfkit";

// ------------------------------
// 🔹 Créer un Ordine simple
// ------------------------------
export const createOrdine = async (req, res) => {
  try {
    const { numero } = req.body;
    const newOrdine = await Ordine.create({ numero });
    res.status(201).json({ success: true, message: "Ordine créé avec succès", data: newOrdine });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ------------------------------
// 🔹 Récupérer tous les Ordini
// ------------------------------
export const getAllOrdini = async (req, res) => {
  try {
    const ordini = await Ordine.findAll({
      include: [{ model: User, as: "assignedUsers", through: { attributes: [] } }]
    });
    res.json({ success: true, count: ordini.length, data: ordini });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ------------------------------
// 🔹 Récupérer un Ordine par ID
// ------------------------------
export const getOrdineById = async (req, res) => {
  try {
    const { id } = req.params;

    const ordine = await Ordine.findByPk(id); // Sequelize

    if (!ordine) {
      return res.status(404).json({ error: "Ordine non trovato" });
    }

    res.json({ data: ordine });
  } catch (error) {
    console.error("Errore GET ordine:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
};

// ------------------------------
// 🔹 Mettre à jour un Ordine
// ------------------------------
export const updateOrdine = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Ordine.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, message: "Ordine non trouvé" });
    const updatedOrdine = await Ordine.findByPk(id);
    res.json({ success: true, message: "Ordine mis à jour", data: updatedOrdine });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ------------------------------
// 🔹 Supprimer un Ordine
// ------------------------------
export const deleteOrdine = async (req, res) => {
  try {
    const { id } = req.params;
    const ordine = await Ordine.findByPk(id);
    if (!ordine) {
      return res.status(404).json({ success: false, message: "Ordine non trouvé" });
    }

    // Utiliser l'alias correct : assignedUsers
    await ordine.setAssignedUsers([]);  

    // Supprimer l'Ordine
    await ordine.destroy();

    res.json({ success: true, message: "Ordine et ses assignations supprimés avec succès" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};






// ------------------------------
// 🔹 Visualiser l'Anagrafica d'un Ordine
// ------------------------------
export const getOrdineAnagrafica = async (req, res) => {
  try {
    const { id } = req.params;

    const ordine = await Ordine.findByPk(id, {
      include: [
        {
          model: Anagrafica,
          as: "anagrafiche", // ⚠️ alias exact défini dans ton association Ordine ↔ Anagrafica
          include: [
            { model: Recapiti, as: "recapiti" },
            { model: Contatti, as: "contatti" },
            { model: AttivitaProfessionale, as: "attivita_professionale" },
            { model: StudiAssociati, as: "studi_associati" },
            {
              model: Albo,
              as: "albi", // ⚠️ alias exact défini dans ton association Anagrafica ↔ Albo
              include: [
                { model: Settori, as: "settori" } // ✅ Settori inclus depuis Albo
              ]
            },
            { model: Abilitazioni, as: "abilitazioni" },
            { model: Titoli, as: "titoli" }
          ]
        }
      ]
    });

    if (!ordine)
      return res.status(404).json({ success: false, message: "Ordine non trouvé" });

    if (!ordine.anagrafiche || ordine.anagrafiche.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Aucune anagrafica associée" });

    res.json({ success: true, data: ordine.anagrafiche });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};






// ------------------------------
// 🔹 Récupérer tous les ordini assignés à un user spécifique
// ------------------------------
export const getOrdiniByUser = async (req, res) => {
  try {
    const { userId } = req.params; // l'ID de l'utilisateur

    // Vérifie si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    // Récupère les ordini assignés à cet utilisateur
    const ordini = await user.getAssignedOrdini({ // Sequelize magic method
      include: [
        {
          model: User,
          as: "assignedUsers",
          through: { attributes: [] }, // ne pas inclure les colonnes de la table pivot
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({ success: true, count: ordini.length, data: ordini });
  } catch (err) {
    console.error("Erreur getOrdiniByUser:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};








// ------------------------------
// 🔹 Genera un PDF per l'Ordine
// ------------------------------
export const stampaOrdine = async (req, res) => {
  try {
    const { id } = req.params;

    const ordine = await Ordine.findByPk(id, {
      include: [
        {
          model: User,
          as: "assignedUsers", // relazione Sequelize (belongsToMany)
          through: { attributes: [] }, // non includere le colonne della tabella pivot
        },
      ],
    });

    if (!ordine) {
      return res
        .status(404)
        .json({ success: false, message: "Ordine non trovato" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ordine_${ordine.numero}.pdf`
    );

    const doc = new PDFDocument({ margin: 50, size: "A4" });
    doc.pipe(res);

    // ✅ Titolo
    doc
      .fontSize(20)
      .fillColor("#1F2937")
      .text(`Ordine #${ordine.numero}`, { align: "center" })
      .moveDown();

    // ✅ Data (⚠️ dipende dal tuo modello Sequelize: createdAt o created_at)
    doc
      .fontSize(12)
      .fillColor("#4B5563")
      .text(
        `Data di creazione: ${new Date(
          ordine.createdAt || ordine.created_at
        ).toLocaleString("it-IT")}`
      )
      .moveDown(2);

    const users = ordine.assignedUsers;

    if (!users || users.length === 0) {
      doc.fontSize(12).fillColor("#111827").text("Nessun utente assegnato.");
    } else {
      // ✅ Tabella
      const tableTop = 180;
      const itemSpacing = 30;

      // Intestazione
      doc
        .rect(40, tableTop - 20, 520, 25)
        .fill("#10B981"); // verde tenue
      doc
        .fillColor("white")
        .fontSize(12)
        .text("N°", 50, tableTop - 15)
        .text("Nome", 100, tableTop - 15)
        .text("Email", 300, tableTop - 15);

      // Righe utenti
      let y = tableTop + 10;
      users.forEach((user, i) => {
        if (i % 2 === 0) {
          // alternanza colore sfondo
          doc.rect(40, y - 10, 520, 25).fill("#ECFDF5").stroke();
        }

        doc.fillColor("#111827").fontSize(12);
        doc.text(i + 1, 50, y);
        doc.text(user.name, 100, y);
        doc.text(user.email, 300, y);

        y += itemSpacing;
      });
    }

    doc.end();
  } catch (err) {
    console.error("Errore nella generazione del PDF:", err);
    res
      .status(500)
      .json({ success: false, error: "Impossibile generare il PDF" });
  }
};




