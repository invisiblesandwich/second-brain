import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}
export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRE || "7d") as SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
