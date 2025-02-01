import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload} from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized"
    });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = payload as { id: string, email: string };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    });
  }
}