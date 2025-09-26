import sequelize from "../db/db.js";

// Tables à auditer
const tablesToAudit = [
  "anagrafica",
  "abilitazioni",
  "albo",
  "attivita_professionale",
  "contatti",
  "recapiti",
  "settori",
  "studi_associati",
  "titoli"
];

// 🔹 Récupérer les 100 derniers logs sur toutes les tables
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await sequelize.query(
      `SELECT * FROM audit_logs
       WHERE table_name = ANY(ARRAY[:tables]::text[])
       ORDER BY log_time DESC
       LIMIT 100`,
      {
        replacements: { tables: tablesToAudit },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const formattedLogs = logs.map(log => {
      const oldData = log.old_data || {};
      const newData = log.new_data || {};
      const changes = Object.keys({ ...oldData, ...newData })
        .filter(key => oldData[key] !== newData[key])
        .map(key => ({
          field: key,
          before: oldData[key] ?? null,
          after: newData[key] ?? null
        }));

      return {
        id: log.id,
        log_time: log.log_time,
        user: log.username || "system",
        table: log.table_name,
        action: log.action_type,
        changes
      };
    });

    res.status(200).json({ success: true, total: formattedLogs.length, data: formattedLogs });
  } catch (err) {
    console.error("❌ getAuditLogs error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// 🔹 Récupérer les logs d’une anagrafica spécifique
export const getLogsByAnagraficaId = async (req, res) => {
  try {
    const { anagraficaId } = req.params;

    const logs = await sequelize.query(
      `SELECT * FROM audit_logs
       WHERE table_name = ANY(ARRAY[:tables]::text[])
       AND (
         old_data @> :idJson OR
         new_data @> :idJson OR
         old_data @> :anagraficaIdJson OR
         new_data @> :anagraficaIdJson
       )
       ORDER BY log_time DESC`,
      {
        replacements: {
          tables: tablesToAudit,
          idJson: JSON.stringify({ id: Number(anagraficaId) }),
          anagraficaIdJson: JSON.stringify({ anagrafica_id: Number(anagraficaId) })
        },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const formattedLogs = logs.map(log => {
      const oldData = log.old_data || {};
      const newData = log.new_data || {};
      const changes = Object.keys({ ...oldData, ...newData })
        .filter(key => oldData[key] !== newData[key])
        .map(key => ({
          field: key,
          before: oldData[key] ?? null,
          after: newData[key] ?? null
        }));

      return {
        id: log.id,
        log_time: log.log_time,
        user: log.username || "system",
        table: log.table_name,
        action: log.action_type,
        changes
      };
    });

    res.status(200).json({ success: true, total: formattedLogs.length, data: formattedLogs });
  } catch (err) {
    console.error("❌ getLogsByAnagraficaId error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


























































































// // controllers/auditController.js
// import { Op } from "sequelize";
// import AuditLog from "../models/AuditLog.js";
// import Anagrafica from "../models/Anagrafica.js";

// /**
//  * 🔹 Récupérer les 100 derniers logs sur toutes les tables auditées
//  */
// export const getAuditLogs = async (req, res) => {
//   try {
//     const tablesToAudit = [
//       "anagrafica",
//       "abilitazioni",
//       "albo",
//       "attivita_professionale",
//       "contatti",
//       "recapiti",
//       "settori",
//       "studi_associati",
//       "titoli"
//     ];

//     const logs = await AuditLog.findAll({
//       where: { table_name: { [Op.in]: tablesToAudit } },
//       order: [["log_time", "DESC"]],
//       limit: 100
//     });

//     const formattedLogs = logs.map(log => {
//       const oldData = log.old_data || {};
//       const newData = log.new_data || {};
//       const changes = {};

//       Object.keys({ ...oldData, ...newData }).forEach(key => {
//         if (oldData[key] !== newData[key]) {
//           changes[key] = {
//             before: oldData[key] ?? null,
//             after: newData[key] ?? null
//           };
//         }
//       });

//       return {
//         id: log.id,
//         log_time: log.log_time,
//         user: log.username || newData?.anauttr || oldData?.anauttr || 'Unknown',
//         table: log.table_name,
//         action: log.action_type,
//         changes
//       };
//     });

//     res.status(200).json({
//       success: true,
//       total: formattedLogs.length,
//       data: formattedLogs
//     });

//   } catch (error) {
//     console.error("❌ Erreur getAuditLogs:", error);
//     res.status(500).json({ success: false, error: "Erreur serveur" });
//   }
// };

// /**
//  * 🔹 Récupérer tous les logs pour une anagrafica spécifique
//  */
// export const getLogsByAnagraficaId = async (req, res) => {
//   try {
//     const { anagraficaId } = req.params;

//     const anagrafica = await Anagrafica.findByPk(anagraficaId);
//     if (!anagrafica) {
//       return res.status(404).json({ success: false, message: "Anagrafica non trouvée" });
//     }

//     // Définir l'utilisateur courant pour PostgreSQL (audit trigger)
//     if (req.user && req.user.email) {
//       await AuditLog.sequelize.query(
//         `SET session "app.current_user" = :email`,
//         { replacements: { email: req.user.email } }
//       );
//     }

//     // Récupérer les IDs d'albo liés à cette anagrafica
//     const albi = await AuditLog.sequelize.query(
//       `SELECT id FROM albo WHERE anagrafica_id = :anagraficaId`,
//       {
//         replacements: { anagraficaId },
//         type: AuditLog.sequelize.QueryTypes.SELECT
//       }
//     );
//     const alboIds = albi.map(a => a.id);

//     // Construire les conditions pour les settori liés aux albi
//     const settoriConditions = [];
//     for (const alboId of alboIds) {
//       settoriConditions.push({ old_data: { [Op.contains]: { albo_id: alboId } } });
//       settoriConditions.push({ new_data: { [Op.contains]: { albo_id: alboId } } });
//     }

//     const tablesToAudit = [
//       "anagrafica",
//       "abilitazioni",
//       "albo",
//       "attivita_professionale",
//       "contatti",
//       "recapiti",
//       "settori",
//       "studi_associati",
//       "titoli"
//     ];

//     // Récupérer les logs de cette anagrafica et ses tables liées
//     const logs = await AuditLog.findAll({
//       where: {
//         table_name: { [Op.in]: tablesToAudit },
//         [Op.or]: [
//           { old_data: { [Op.contains]: { id: Number(anagraficaId) } } },
//           { new_data: { [Op.contains]: { id: Number(anagraficaId) } } },
//           { old_data: { [Op.contains]: { anagrafica_id: Number(anagraficaId) } } },
//           { new_data: { [Op.contains]: { anagrafica_id: Number(anagraficaId) } } },
//           ...settoriConditions
//         ]
//       },
//       order: [["log_time", "DESC"]]
//     });

//     // Formater uniquement les champs qui ont changé
//     const formattedLogs = logs.map(log => {
//       const oldData = log.old_data || {};
//       const newData = log.new_data || {};
//       const changes = Object.keys({ ...oldData, ...newData })
//         .filter(key => oldData[key] !== newData[key])
//         .map(key => ({
//           field: key,
//           before: oldData[key] ?? null,
//           after: newData[key] ?? null
//         }));

//       return {
//         id: log.id,
//         log_time: log.log_time,
//         user: log.username || newData?.anauttr || oldData?.anauttr || 'Unknown',
//         table: log.table_name,
//         action: log.action_type,
//         changes
//       };
//     });

//     res.status(200).json({ success: true, total: formattedLogs.length, data: formattedLogs });

//   } catch (error) {
//     console.error("❌ Erreur getLogsByAnagraficaId:", error);
//     res.status(500).json({ success: false, error: "Erreur serveur" });
//   }
// };
