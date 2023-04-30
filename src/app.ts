import express from 'express';
import mongoose from 'mongoose'

const PORT = 3000;

const app = express();
const MONGO_URL = 'mongodb://localhost:27017/mestodb';
mongoose.connect(MONGO_URL);

app.listen(PORT)