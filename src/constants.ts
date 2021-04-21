import dotenv from "dotenv";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";

export const __jwt_secret__ = process.env.JWT_SECRET || "dewkncds";

export const PORT = process.env.PORT || 8000;
