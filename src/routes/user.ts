import express from "express";
import {
	validateEmail,
	validateMobileNumber,
	validateName,
	validatePassword,
	validateUsername,
} from "../utils";

const userRouter = express.Router();

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
	}

	// YOUR CODE HERE
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

	// YOUR CODE HERE
});

export default userRouter;
