import express, { json, response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import sellingRouter from "./routes/sellingRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRouter.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter); 
app.use(sellingRouter); 
app.use(productsRouter); 

app.listen(5000, () => {
    console.log("Serving running in port: 5000");
});