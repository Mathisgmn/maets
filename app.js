import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, connectMongo } from "./config/database.js";
import { associate } from "./models/index.js";

dotenv.config();

associate();

await sequelize.sync({ alter: true });
console.log("✅ Base de données synchronisée !");

// 3. Connexion à MongoDB
await connectMongo();


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.send("✅ Maets backend is running!"));


app.listen(process.env.PORT || 3000, "0.0.0.0", () =>
  console.log(`🚀 Server listening on http://localhost:${process.env.PORT || 3000}`)
);
