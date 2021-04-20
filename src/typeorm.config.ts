import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";

export const typeormConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	database: "",
	entities: [__dirname + "/entities/*.js"],
	synchronize: !__prod__,
	logging: !__prod__,
};
