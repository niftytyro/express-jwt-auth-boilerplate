import express from "express";
import userRouter from "./routes/user";

const PORT = process.env.Port || 8000;

let main = async () => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use("/user", userRouter);

	app.listen(PORT, () => {
		console.log(`Listening on PORT: ${PORT}`);
	});
};

main().catch(console.log);
