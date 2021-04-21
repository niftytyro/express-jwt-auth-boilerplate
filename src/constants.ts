export const __prod__ = process.env.NODE_ENV === "production";

export const __access_token_secret__ =
	process.env.AccessTokenSecret || "dewkncds";
