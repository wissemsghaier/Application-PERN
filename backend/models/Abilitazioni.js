import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const Abilitazioni = sequelize.define(
  "Abilitazioni",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    anambabi: DataTypes.STRING,
    andatabi: DataTypes.DATE,
    ancunabi: DataTypes.STRING,
    anlocabi: DataTypes.STRING,
    anpunabi: DataTypes.STRING,
    anlodebi: DataTypes.STRING,
    anabilve: DataTypes.STRING,
    andatarv: DataTypes.DATE,
  },
  { tableName: "abilitazioni", timestamps: false }
);

Abilitazioni.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(Abilitazioni, { foreignKey: "anagrafica_id", as: "abilitazioni" });





export default Abilitazioni;
