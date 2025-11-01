import express from "express";
import dotenv from "dotenv";
import { connectPostgres, connectMongo } from "./config/database.js";
dotenv.config();

const app = express();
app.use(express.json());

await connectPostgres();
await connectMongo();

app.get("/", (req, res) => res.send("✅ Maets backend is running!"));
app.listen(process.env.PORT || 3000, "0.0.0.0", () => console.log("Server up"));
