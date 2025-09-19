import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const Recapiti = sequelize.define(
  "Recapiti",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    antipind: DataTypes.STRING,
    anindiri: DataTypes.STRING,
    an_cap: DataTypes.STRING,
    ancodcom: DataTypes.STRING,
    anlocali: DataTypes.STRING,
    anprovin: DataTypes.STRING,
    annazion: DataTypes.STRING,
    antelefo: DataTypes.STRING,
    antelfax: DataTypes.STRING,
    anpubweb: DataTypes.STRING,
  },
  { tableName: "recapiti", timestamps: false }
);

// Relation Anagrafica 1–N Recapiti
Recapiti.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(Recapiti, { foreignKey: "anagrafica_id", as: "recapiti" });

export default Recapiti;
