import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { ICustomRequest } from "./types";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

dotenv.config();

/*const {PORT, MONGO_URL = 'mongodb://localhost:27017/mestodb'} = process.env;*/

const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/mestodb";

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use((req: ICustomRequest, _res, next) => {
  req.user = {
    _id: "644fa9d3349470c8c792bc6f",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT);
