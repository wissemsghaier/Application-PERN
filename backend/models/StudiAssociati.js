import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const StudiAssociati = sequelize.define(
  "StudiAssociati",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    anstuass: DataTypes.STRING,
    ancarstu: DataTypes.STRING,
    andtinsa: DataTypes.DATE,
    andtfisa: DataTypes.DATE,
  },
  { tableName: "studi_associati", timestamps: false }
);

// Relation Anagrafica 1–N StudiAssociati
StudiAssociati.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(StudiAssociati, { foreignKey: "anagrafica_id", as: "studi_associati" });

export default StudiAssociati;
