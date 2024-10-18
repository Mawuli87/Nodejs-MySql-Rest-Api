import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { routes } from "./routes";
import { DataSource} from "typeorm";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host : "localhost",
    port: 3307,
    username: "root",
    password: "",
    database:"node-admin",
    entities:[
        "src/entity/*.ts"
    ],
    logging: false,
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        app.use(
            cors({
                 credentials: true,
                origin: ["http://localhost:3000"],
            })
        );

        routes(app);
        app.listen(8000, () => {
            console.log("listening to port 8000");
        });
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error(
            'Error during Data Source initialization',
            err,
        );
    });








