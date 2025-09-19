import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Anagrafica from "./Anagrafica.js";

const Titoli = sequelize.define(
  "Titoli",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    anagrafica_id: { type: DataTypes.INTEGER, references: { model: Anagrafica, key: "id" }, onDelete: "CASCADE" },
    ancodtit: DataTypes.STRING,
    andattit: DataTypes.DATE,
    ancuniti: DataTypes.STRING,
    anuniesp: DataTypes.STRING,
    anpuntit: DataTypes.STRING,
    anlodtit: DataTypes.STRING,
    anntit: DataTypes.INTEGER,
    anclasse: DataTypes.INTEGER,
    andicris: DataTypes.STRING,
    andritcl: DataTypes.DATE,
    ancaricl: DataTypes.STRING,
    anflita: DataTypes.BOOLEAN,
    anrimti: DataTypes.BOOLEAN,
    anricuti: DataTypes.BOOLEAN,
    antivver: DataTypes.BOOLEAN,
  },
  { tableName: "titoli", timestamps: false }
);

// Relation Anagrafica 1–N Titoli
Titoli.belongsTo(Anagrafica, { foreignKey: "anagrafica_id" });
Anagrafica.hasMany(Titoli, { foreignKey: "anagrafica_id", as: "titoli" });

export default Titoli;
