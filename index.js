import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", authRoutes);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await app.listen(process.env.API_PORT, () => console.log(`Server started at port ${process.env.API_PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
