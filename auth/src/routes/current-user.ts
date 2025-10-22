import { Request, Response, Router } from "express";
import { currentUser } from "../middlewares/current-user";
const router = Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    // if no currentUser, return null
    res.send({ currentUser: req.currentUser || null });
  }
);

export default router;
