import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);
