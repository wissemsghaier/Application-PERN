// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sequelize from "../db/db.js";  // <-- importer Sequelize pour exécuter la query

// export const verifyUser = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ success: false, error: "Token Not Provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);

//     const user = await User.findByPk(decoded.id, {
//       attributes: { exclude: ["password"] },
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User Not Found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "Server Error" });
//   }
// };











export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, error: "Token Not Provided" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) return res.status(404).json({ success: false, error: "User Not Found" });

    req.user = user;

    // 🔹 Définir l'utilisateur courant pour PostgreSQL (audit)
    await sequelize.query(
      `SET session "app.current_user" = :email`,
      { replacements: { email: req.user?.email || 'system' } }
    );

    next();
  } catch (error) {
    console.error("❌ verifyUser error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Accès réservé à l’administrateur" });
};

