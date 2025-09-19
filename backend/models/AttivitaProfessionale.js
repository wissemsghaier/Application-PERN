import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const AttivitaProfessionale = sequelize.define(
  "AttivitaProfessionale",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    ancodatt: DataTypes.STRING,
    andesatt: DataTypes.STRING,
    andtinap: DataTypes.DATE,
    andtifap: DataTypes.DATE,
    anconssn: DataTypes.STRING,
    anregpro: DataTypes.STRING,
    andatssn: DataTypes.DATE,
    andip_pa: DataTypes.STRING,
    ancodzon: DataTypes.STRING,
    andiccat: DataTypes.STRING,
    andipora: DataTypes.STRING,
    andipcon: DataTypes.STRING,
    andiccnl: DataTypes.STRING,
    andipcoo: DataTypes.STRING,
    andipdir: DataTypes.STRING,
    anesepro: DataTypes.STRING,
  },
  { tableName: "attivita_professionale", timestamps: false }
);

// Relation Anagrafica 1–N Contatti
AttivitaProfessionale.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(AttivitaProfessionale, { foreignKey: "anagrafica_id", as: "attivita_professionale" });

export default AttivitaProfessionale;
