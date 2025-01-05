import { NextFunction, Request, Response } from "express";

import User from "../models/user.model";

export const authenticateAPIKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header("horoscope-api-key");
  if (!apiKey) {
    res.status(401).json({ error: "API key is required" });
    return;
  }

  const user = await User.findOne({ apiKey });
  if (!user) {
    res.status(403).json({ error: "Invalid API key" });
    return;
  }

  next();
};
