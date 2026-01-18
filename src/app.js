import express, { Router } from "express";
import cors from "cors";
//import authController from "./controller/authController.js";
import router from "./routes/apiRouter.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(cors({
    origin: "*", // Aapke React ka URL
                   // Taaki cookies (auth) kaam kar sakein
}));

app.use(express.json())
app.use(cookieParser());

//route
app.use("/api",router);
export default app