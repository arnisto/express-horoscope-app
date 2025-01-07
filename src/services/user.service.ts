import {
  ConflictError,
  HoroscopeError,
  NotFoundError,
  UnauthorizedError,
} from "../errors";

import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import { loginValidator } from "../validators/loginValidator";
import { registerValidator } from "../validators/registerValidator";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const registerUserService = async (
  username: string,
  email: string,
  password: string
) => {
  const { error } = registerValidator.validate({ username, email, password });
  if (error) {
    throw new HoroscopeError(error.details[0].message, 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("Email is already in use.");
  }

  const user = new User({ username, email, password });
  await user.save();
  return { message: "User registered successfully." };
};

export const loginUserService = async (email: string, password: string) => {
  const { error } = loginValidator.validate({ email, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthorizedError("Invalid credentials.");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  return { token };
};

export const generateApiKeyService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.apiKey = uuidv4();
  await user.save();
  return { apiKey: user.apiKey };
};
