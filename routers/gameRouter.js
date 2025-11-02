
import { Router } from "express";
import { GameController } from "../controllers/index.js";
// import { requireAuth, requireAdmin } from "../middlewares/requireAuth.js"; // tu pourras les activer plus tard

const router = Router();

//GET tous les jeux
router.get("/", GameController.getAllGames);

//GET un jeu par id
router.get("/:id", GameController.getGameById);

//POST création d’un jeu (admin plus tard)
router.post("/", /* requireAdmin, */ GameController.createGame);

//PATCH mise à jour d’un jeu (admin plus tard)
// router.patch("/:id", /* requireAdmin, */ GameController.updateGame);

//DELETE suppression d’un jeu (admin plus tard)
router.delete("/:id", /* requireAdmin, */ GameController.deleteGame);

export default router;
