import express, { json, response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router); 

app.listen(5000, () => {
    console.log("Serving running in port: 5000");
});