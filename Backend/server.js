import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongo from "./configs/my_db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user_route.js";
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())

const PORT = process.env.PORT || 8880;

mongo();

app.use("/api/v1/user", userRoute);

app.listen(PORT, () =>{
    mongo()
    console.log("server is running on PORT : ", PORT);
});