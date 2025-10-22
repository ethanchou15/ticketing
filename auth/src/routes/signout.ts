import { Request, Response, Router } from "express";
const router = Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  // clear the session object
  req.session = null;
  res.send({});
});

export default router;
