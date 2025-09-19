import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Albo from "./Albo.js";

const Settori = sequelize.define(
  "Settori",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    albo_id: { type: DataTypes.INTEGER, references: { model: Albo, key: "id" }, onDelete: "CASCADE" },
    ansezion: DataTypes.STRING,
    ansotsez: DataTypes.STRING,
    ansezspe: DataTypes.STRING,
    ansettore: DataTypes.STRING,
  },
  { tableName: "settori", timestamps: false }
);

Settori.belongsTo(Albo, { foreignKey: "albo_id", as: "albi" });
Albo.hasMany(Settori, { foreignKey: "albo_id", as: "settori" });

export default Settori;
