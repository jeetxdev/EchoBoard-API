import express from "express";
import cors from "cors";
import defaultRouter from "./routes";
import dotenv from "dotenv";
import {errorConverter, handleError} from "./middlewares/error";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(defaultRouter);
app.use(errorConverter);
app.use(handleError)
export default app;
