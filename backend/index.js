import express from 'express';
import cors from 'cors'; 
import authRouter from './routes/auth.js'
import connectToDatabase from './db/db.js'
import userRoutes from "./routes/userRoutes.js";
import ordineRoutes from "./routes/ordineRoutes.js";




const app = express();


connectToDatabase()


// Middleware
app.use(cors());
app.use(express.json())
app.use('/api/auth', authRouter);
app.use("/api/users", userRoutes);
app.use("/api/ordini", ordineRoutes);

// Port par défaut si non défini dans .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
