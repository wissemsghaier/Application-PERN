import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const Contatti = sequelize.define(
  "Contatti",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    antipcon: DataTypes.STRING,
    andescon: DataTypes.STRING,
    anpubweb: DataTypes.STRING,
  },
  { tableName: "contatti", timestamps: false }
);

// Relation Anagrafica 1–N Contatti
Contatti.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(Contatti, { foreignKey: "anagrafica_id", as: "contatti" });

export default Contatti;
