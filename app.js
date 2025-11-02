import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, connectMongo } from "./config/database.js";
import { associate } from "./models/index.js";
import gameRouter from "./routers/gameRouter.js";
// import { errorHandler } from "./middlewares/errorHandler.js"; // si tu l’as
// import { requireAuth } from "./middlewares/requireAuth.js"; // si besoin plus tard

dotenv.config();

const app = express();

// 🔹 Middlewares globaux
app.use(cors());
app.use(express.json());

// 🔹 Associations et connexions DB
associate();

await sequelize.sync({ alter: true });
console.log("✅ Base de données SQL synchronisée !");

await connectMongo();
console.log("✅ Connexion MongoDB réussie !");

// 🔹 Routes
app.get("/", (req, res) => res.send("✅ Maets backend is running!"));

// Route principale pour la ressource "games"
app.use("/api/games", gameRouter);

// 🔹 Middleware global d’erreurs (toujours en dernier)
// app.use(errorHandler);

// 🔹 Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

export default app;
