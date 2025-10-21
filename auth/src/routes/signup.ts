import { Router, Request, Response } from "express";
const router = Router();

router.post("/api/users/signup", (req: Request, res: Response) => {
  res.send("hi there!");
});

export default router;