// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// 🔹 Import de Sequelize et de la fonction de connexion
import sequelize, { connectToDatabase } from "./db/db.js";

// 🔹 Import des routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js"
import ordineRoutes from "./routes/ordineRoutes.js";







// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(cors());


// Middleware JSON
app.use(express.json());

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ordini", ordineRoutes );





// 🔹 Port
const PORT = process.env.PORT || 3000;

// 🔹 Lancement du serveur
const startServer = async () => {
  try {
    // Connexion à la BDD
    await connectToDatabase();

    // Synchroniser Sequelize avec la base (⚠️ alter: true adapte les tables sans supprimer les données)
    await sequelize.sync({ alter: true });
    console.log("✅ Sequelize models synchronized with PostgreSQL!");

    // Lancer le serveur
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

// Démarrer le serveur
startServer();

