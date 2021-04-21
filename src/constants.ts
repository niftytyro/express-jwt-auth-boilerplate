import dotenv from "dotenv";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";

export const __jwt_secret__ = process.env.JWT_SECRET || "dewkncds";

export const PORT = process.env.PORT || 8000;

export const __google_client_id__ = process.env.GOOGLE_CLIENT_ID;

export const __google_client_secret__ = process.env.GOOGLE_CLIENT_SECRET;

export const __google_redirect_uri__ = process.env.GOOGLE_REDIRECT_URI;
