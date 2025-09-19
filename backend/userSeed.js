// backend/userSeed.js
import bcrypt from "bcrypt";
import { connectToDatabase } from "./db/db.js"; // 🔹 import nommé
import User from "./models/User.js"; // Import du modèle User

const userRegister = async () => {
  // 🔹 Connexion à la base
  await connectToDatabase();

  try {
    const plainPassword = "admin";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 🔹 Création de l'utilisateur avec Sequelize
    const newUser = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Utilisateur enregistré avec succès !");
    console.log("🔑 Mot de passe hashé :", hashedPassword);
    console.log("📄 Utilisateur :", newUser.toJSON()); // Affiche les données lisibles
  } catch (error) {
    console.error("❌ Erreur lors de l'inscription :", error);
  } finally {
    // 🔹 Fermer la connexion après l'insertion
    await User.sequelize.close();
  }
};

userRegister();
