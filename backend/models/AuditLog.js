// models/AuditLog.js
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const AuditLog = sequelize.define("AuditLog", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  log_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  username: { type: DataTypes.STRING, allowNull: false, defaultValue: "system" },
  table_name: { type: DataTypes.STRING, allowNull: false },
  action_type: { type: DataTypes.STRING, allowNull: false },
  old_data: { type: DataTypes.JSONB, allowNull: true },
  new_data: { type: DataTypes.JSONB, allowNull: true },
}, {
  tableName: "audit_logs",
  timestamps: false,
});

export default AuditLog;
