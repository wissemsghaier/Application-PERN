import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./User.js";

const Ordine = sequelize.define(
  "Ordine",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { tableName: "ordini", timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

// Many-to-Many avec User
Ordine.belongsToMany(User, {
  through: "assigned_ordini",
  as: "assignedUsers",
  foreignKey: "ordine_id",
});
User.belongsToMany(Ordine, {
  through: "assigned_ordini",
  as: "assignedOrdini",
  foreignKey: "user_id",
});

export default Ordine;
