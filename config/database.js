import { Sequelize } from "sequelize";
import mongoose from "mongoose"; 
import dotenv from "dotenv";

dotenv.config();

// PostgreSQL
export const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
  }
);

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à PostgreSQL réussie !");
    await sequelize.sync({ alter: true });  // Crée/maj tables
    console.log("✅ Tables synchronisées !");
  } catch (err) {
    console.error("❌ Impossible de se connecter à PostgreSQL :", err);
  }
};

export async function connectMongo() {
  const uri = process.env.MONGO_URI || "mongodb://mongo:27017/maets";
  await mongoose.connect(uri, { dbName: "maets" });
  console.log("✅ Connexion à MongoDB réussie !");
}