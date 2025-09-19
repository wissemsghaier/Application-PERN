import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Ordine from "./Ordine.js";

const Anagrafica = sequelize.define(
  "Anagrafica",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ordine_id: { type: DataTypes.INTEGER, references: { model: Ordine, key: "id" }, onDelete: "CASCADE" },
    anseriale: DataTypes.STRING,
    ancognom: DataTypes.STRING,
    an_nome: DataTypes.STRING,
    ancodnaz: DataTypes.STRING,
    an_sesso: DataTypes.STRING,
    andatnas: DataTypes.DATE,
    ancomnas: DataTypes.STRING,
    anlocnas: DataTypes.STRING,
    anpronas: DataTypes.STRING,
    anestnas: DataTypes.STRING,
    annaznas: DataTypes.STRING,
    ancodfis: DataTypes.STRING,
    anflgcfm: DataTypes.STRING,
    anpariva: DataTypes.STRING,
    aniscrit: DataTypes.STRING,
    an_note: DataTypes.TEXT,
    antitolo: DataTypes.STRING,
    anlibero: DataTypes.STRING,
    andatvar: DataTypes.DATE,
    annussig: DataTypes.INTEGER,
    andatsig: DataTypes.DATE,
    andtresi: DataTypes.DATE,
    ancodcon: DataTypes.STRING,
    anattenz: DataTypes.STRING,
    ancodope: DataTypes.INTEGER,
    andtvran: DataTypes.DATE,
    anmatcas: DataTypes.STRING,
    andteic: DataTypes.DATE,
    andtdicc: DataTypes.DATE,
    andtdlcc: DataTypes.DATE,
    andtdeic: DataTypes.DATE,
    anflgsos: DataTypes.STRING,
    andtsosp: DataTypes.DATE,
    anmososp: DataTypes.STRING,
    anprivac: DataTypes.STRING,
    andatprv: DataTypes.DATE,
    anauttr: DataTypes.STRING,
    andtautr: DataTypes.DATE,
    andtscpe: DataTypes.DATE,
    anflging: DataTypes.STRING,
    ancodcec: DataTypes.STRING,
    anold_cf: DataTypes.STRING,
    andtexcf: DataTypes.DATE,
    annoexpo: DataTypes.STRING,
    anidanpr: DataTypes.STRING,
  },
  { tableName: "anagrafica", timestamps: false }
);

// Relation Ordine 1–N Anagrafica
Anagrafica.belongsTo(Ordine, { foreignKey: "ordine_id" });
Ordine.hasMany(Anagrafica, { foreignKey: "ordine_id", as: "anagrafiche" });

export default Anagrafica;
