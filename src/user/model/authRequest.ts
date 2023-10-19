import { User } from "./user";

export interface AuthRequest extends Request {
    user: User;
  }