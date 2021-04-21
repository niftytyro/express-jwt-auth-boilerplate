import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	validateEmail,
	validateMobileNumber,
	validateName,
	validatePassword,
} from "../utils";
import { getConnection } from "typeorm";
import { Users } from "../entities/users";
import { __jwt_secret__ } from "../constants";
import { verifyJWT } from "../middlewares/verifyJwt";

const userRouter = express.Router();

const saltRounds = 10;

userRouter.get("/me", verifyJWT, async (req, res) => {
	if (req.user) {
		let connection = getConnection();
		const user = await connection.manager.findOne(Users, req.user.id);
		if (user)
			return res.status(200).json({
				email: user?.email,
				id: user?.id,
				mobile_number: user?.mobileNumber,
				name: user?.name,
			});
		return res.status(404).send("User does not exist.");
	}
	return;
});

userRouter.post("/create", async (req, res) => {
	const { email, mobileNumber, name, password } = req.body;

	if (!validateEmail(email))
		return res.status(400).send("Provide a valid email.");
	if (!validateMobileNumber(mobileNumber))
		return res.status(400).send("Provide a valid mobile number.");
	if (!validateName(name)) return res.status(400).send("Provide a valid name.");
	if (!validatePassword(password))
		return res
			.status(400)
			.send(
				"Provide a stronger password. (1 uppercase, 1 lowercase, 1 special character, 1 digit, length 8-16)"
			);
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const connection = getConnection();

	const existingEmail = await connection.manager.findOne(Users, {
		where: {
			email: email,
		},
	});
	if (existingEmail) return res.status(400).send("Email already in use.");
	const existingMobileNumber = await connection.manager.findOne(Users, {
		where: {
			mobileNumber: mobileNumber,
		},
	});
	if (existingMobileNumber)
		return res.status(400).send("Mobile Number already in use.");

	let newUser = new Users();
	newUser.email = email;
	newUser.mobileNumber = mobileNumber;
	newUser.name = name;
	newUser.password = hashedPassword;
	try {
		newUser = await connection.manager.save(newUser);
		const token = jwt.sign({ id: newUser.id }, __jwt_secret__);

		return res.status(200).send(token);
	} catch (e) {
		return res.status(500).send("An unknown error occurred.");
	}
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!validatePassword(password))
		return res
			.status(400)
			.send(
				"Provide a stronger password. (1 uppercase, 1 lowercase, 1 special character, 1 digit, length 8)"
			);

	if (!validateEmail(email))
		return res.status(400).send("Provide a valid email.");

	const connection = getConnection();
	const user = await connection.manager.findOne(Users, {
		where: {
			email: email,
		},
	});
	if (!user) return res.status(404).send("User does not exist.");

	if (user?.password) {
		let hashedPassword: string = user?.password;

		try {
			const ok = await bcrypt.compare(password, hashedPassword);

			if (ok) {
				const token = jwt.sign({ id: user.id }, __jwt_secret__);
				return res.status(200).send(token);
			} else return res.status(401).send("Wrong email/password.");
		} catch (err) {
			return res.status(500).send("An unknown error occurred.");
		}
	}
	return res.status(400).send("This account was created with google.");
});

export default userRouter;
