import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Initialisation Sequelize
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

// 🔹 Fonction de connexion
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL via Sequelize!");
  } catch (error) {
    console.error("❌ Unable to connect to PostgreSQL:", error);
  }
};

// 🔹 Export par défaut Sequelize
export default sequelize;

