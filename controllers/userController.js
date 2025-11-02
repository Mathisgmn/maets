import { UserService } from "../services/index.js";

export async function me(req, res, next) {
  try {
    const me = await UserService.getMe(req.user.sub);
    res.json({ ok: true, data: me });
  } catch (err) { next(err); }
}

export async function list(req, res, next) {
  try {
    const limit = Number(req.query.limit ?? 50);
    const offset = Number(req.query.offset ?? 0);
    const users = await UserService.getAllUsers();
    res.json({ ok: true, data: users });
  } catch (err) { next(err); }
}
