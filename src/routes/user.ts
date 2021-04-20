import express from "express";
import bcrypt from "bcrypt";
import {
	validateEmail,
	validateMobileNumber,
	validateName,
	validatePassword,
	validateUsername,
} from "../utils";

const userRouter = express.Router();
const saltRounds = 10;

userRouter.post("/create", (req, res) => {
	let email: string = req.body.email;
	let mobileNumber: string = req.body.mobileNumber;
	let name: string = req.body.name;
	let password: string = req.body.password;
	let username: string = req.body.username;

	if (!validateEmail(email)) {
		res.statusCode = 400;
		res.send("Provide a valid email.");
	} else if (!validateMobileNumber(mobileNumber)) {
		res.statusCode = 400;
		res.send("Provide a valid name");
	} else if (!validateName(name)) {
		res.statusCode = 400;
		res.send("Provide a valid name");
	} else if (!validatePassword(password)) {
		res.statusCode = 400;
		res.send(
			"Provide a stronger password. (1 uppercase, 1 lowercase, 1 special character, 1 digit, length 8)"
		);
	} else if (!validateUsername(username)) {
		res.statusCode = 400;
		res.send("Provide a valid username.");
	} else {
		bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
			if (err) {
				res.statusCode = 500;
				res.send("An unknown error occurred.");
			} else {
				// YOUR CODE HERE
			}
		});
	}
});

userRouter.post("/login", (req, res) => {
	let password: string = req.body.password;
	let username: string = req.body.username;

	if (!validatePassword(password)) {
		res.statusCode = 400;
		res.send(
			"Provide a stronger password. (1 uppercase, 1 lowercase, 1 special character, 1 digit, length 8)"
		);
	} else if (!validateUsername(username)) {
		res.statusCode = 400;
		res.send("Provide a valid username.");
	}

	let hashedPassword: string = ""; // TODO: Fetch hashedPassword from the databse.
	bcrypt.compare(password, hashedPassword, (err, ok) => {
		if (err) {
			res.statusCode = 500;
			res.send("An unknown error occurred.");
		} else {
			if (ok) {
				// YOUR CODE HERE
			} else {
				res.statusCode = 401;
				res.send("Wrong username/password.");
			}
		}
	});
});

export default userRouter;
