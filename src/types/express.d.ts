import "express";
import { JwtPayload } from "jsonwebtoken";

interface UserData {
  id: string;
  email?: string;
}

declare module "express" {
  export interface Request {
    user?: JwtPayload | UserData | any;
  }
}

// Declare module to augment the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


