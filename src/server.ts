import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { PORT } from "./constants";
import userRouter from "./routes/users";
import { typeormConfig } from "./typeorm.config";

let main = async () => {
	const app = express();

	await createConnection(typeormConfig);

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use("/users", userRouter);

	app.listen(PORT, () => {
		console.log(`Listening on PORT: ${PORT}`);
	});
};

main().catch(console.log);
