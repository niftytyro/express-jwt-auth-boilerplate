import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { __jwt_secret__ } from "../constants";
import { UserPayload } from "../utils";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	let authHeader = req.headers.authorization;
	if (authHeader) {
		let token: string = authHeader.split(" ")[1];
		if (token) {
			jwt.verify(token, __jwt_secret__, (err, user) => {
				if (err) {
					if (err.name === "TokenExpiredError")
						return res.status(400).send("Token has expired.");
					return res.status(400).send("Could not parse token.");
				}
				if (user) {
					req.user = user as UserPayload;
					next();
				}
				return res.status(401).send("You are not logged in.");
			});
		}
		return res.status(401).send("You are not logged in.");
	}
	return res.status(401).send("You are not logged in.");
};
