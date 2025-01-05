import { Request, Response } from "express";
import {
  generateApiKeyService,
  loginUserService,
  registerUserService,
} from "../services/user.service";

import { AuthenticatedRequest } from "../middlewares/authenticateJWT.middleware";
import { HoroscopeError } from "../errors";

export const registerNewUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body || {};
  try {
    const result = await registerUserService(username, email, password);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status((error as HoroscopeError).status || 400)
      .json({ error: (error as HoroscopeError).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserService(email, password);
    res.json(result);
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status((error as HoroscopeError).status || 400)
      .json({ error: (error as HoroscopeError).message });
  }
};

export const generateApiKey = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log("User ID v1 :", req.user.id);
    const result: { apiKey: string } = await generateApiKeyService(req.user.id);
    res.json(result);
  } catch (error) {
    console.error("Error generating API key:", error);
    res
      .status((error as HoroscopeError).status || 400)
      .json({ error: (error as HoroscopeError).message });
  }
};
