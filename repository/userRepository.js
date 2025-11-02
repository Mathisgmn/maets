import User from "../models/userModel.js";
import Game from "../models/gameModel.js";
import bcrypt from "bcrypt";

/**
 * Crée un utilisateur en hashant le mot de passe.
 */
export async function createUser({ username, password, is_admin = false }) {
  const password_hash = await bcrypt.hash(password, 10);
  return await User.create({ username, password_hash, is_admin });
}

/**
 * Retourne un utilisateur par PK (UUID).
 */
export async function getUserById(id, { withGames = false } = {}) {
  if (withGames) {
    return await User.findByPk(id, {
      include: [{ model: Game, as: "games" }],
    });
  }
  return await User.findByPk(id);
}

/**
 * Retourne un utilisateur par username (utile pour login).
 */
export async function getUserByUsername(username) {
  return await User.findOne({ where: { username } });
}

/**
 * Vérifie le couple username/password.
 */
export async function verifyCredentials(username, password) {
  const user = await getUserByUsername(username);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  return ok ? user : null;
}

/**
 * Met à jour des champs sur l’utilisateur.
 */
export async function updateUser(id, values) {
  const user = await User.findByPk(id);
  if (!user) return null;
  // Empêche la mise à jour directe du password_hash
  if (values.password) {
    values.password_hash = await bcrypt.hash(values.password, 10);
    delete values.password;
  }
  return await user.update(values);
}

/**
 * Supprime un utilisateur.
 */
export async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
}

/**
 * Liste paginée des utilisateurs.
 */
export async function listUsers({ limit = 50, offset = 0 } = {}) {
  return await User.findAll({ limit, offset, order: [["username", "ASC"]] });
}
