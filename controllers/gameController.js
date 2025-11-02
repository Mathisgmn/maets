import { GameService } from "../services/index.js";
// import { GameError } from "../errors/index.error.js"; // tu pourras définir ça plus tard si tu veux gérer des erreurs custom

export async function getAllGames(req, res, next) {
  try {
    const games = await GameService.getAllGames();
    res.json(games);
  } catch (error) {
    next(error);
  }
}

export async function getGameById(req, res, next) {
  try {
    const id = req.params.id;
    const game = await GameService.getGameById(id);
    res.json(game);
  } catch (error) {
    next(error);
  }
}

export async function createGame(req, res, next) {
  try {
    const { title } = req.body;
    const newGame = await GameService.createGame({ title });
    res.json(newGame);
  } catch (error) {
    next(error);
  }
}

export async function updateGame(req, res, next) {
  try {
    const id = req.params.id;
    const { title } = req.body;
    const updatedGame = await GameService.updateGame(id, { title });
    res.json(updatedGame);
  } catch (error) {
    next(error);
  }
}

export async function deleteGame(req, res, next) {
  try {
    const id = req.params.id;
    const deletedGame = await GameService.deleteGame(id);
    res.json(deletedGame);
  } catch (error) {
    next(error);
  }
}

export async function getMyGames(req, res, next) {
  try {
    const idUser = req.user.sub; // vient du JWT décodé par requireAuth
    const games = await GameService.getGamesForUser(idUser);
    res.json({ ok: true, data: games });
  } catch (error) {
    next(error);
  }
}
