import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwt } from "../config/jwt";

type IPayload = {
  sub: string;
};

export function ensureClientAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Missing token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, String(jwt.secret_client)) as IPayload;
    request.client_id = sub;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token' });
  }
}