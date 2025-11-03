import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sequelize, connectMongo } from './config/database.js';
import { associate } from './models/index.js';
import apiRouter from './routers/index.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// ⚙️ Charger les variables d'env le plus tôt possible
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const openapiPath = path.resolve(__dirname, './docs/openapi.yaml');

const openapiDocument = YAML.load(openapiPath);

const app = express();

// 🔹 Middlewares globaux
app.use(cors());
app.use(express.json());

// 🔹 Swagger (avant les routes, c’est plus clair)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument, { explorer: true }));
app.get('/', (req, res) => res.redirect('/docs'));

// 🔹 Associations et connexions DB
associate();

await sequelize.sync({ alter: true });
console.log('✅ Base de données SQL synchronisée !');

await connectMongo();
console.log('✅ Connexion MongoDB réussie !');

// 🔹 Routes API
app.use('/api', apiRouter);

// 🔹 Middleware global d’erreurs (toujours en dernier)
// import errorHandler from './middlewares/errorHandler.js';
// app.use(errorHandler);

// 🔹 Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

export default app;
