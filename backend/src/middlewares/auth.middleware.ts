import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload = verifyAccessToken(token!); // ! utilizado...possivel problema
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
