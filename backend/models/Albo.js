import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const Albo = sequelize.define(
  "Albo",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    antipisc: DataTypes.STRING,
    annunisc: DataTypes.INTEGER,
    andatisc: DataTypes.DATE,
    andatpis: DataTypes.DATE,
    anorprov: DataTypes.STRING,
    anmotcan: DataTypes.STRING,
    andescan: DataTypes.STRING,
    andatcan: DataTypes.DATE,
    andatdec: DataTypes.DATE,
    andtotra: DataTypes.STRING,
    andtisno: DataTypes.DATE,
    anflgisc: DataTypes.STRING,
    andtdeca: DataTypes.DATE,
  },
  { tableName: "albo", timestamps: false }
);


Albo.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(Albo, { foreignKey: "anagrafica_id", as: "albi" });

export default Albo;
