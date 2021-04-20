import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import userRouter from "./routes/users";
import { typeormConfig } from "./typeorm.config";

const PORT = process.env.Port || 8000;

// TODO:
// Configure package.json
// Run npm i or yarn

let main = async () => {
	const app = express();

	console.log(__dirname);

	await createConnection(typeormConfig);

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use("/user", userRouter);

	app.listen(PORT, () => {
		console.log(`Listening on PORT: ${PORT}`);
	});
};

main().catch(console.log);
