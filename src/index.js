import express, { json, response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
//importar rotas

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//app.use(ROTA);
//app.use(ROTA); 

app.listen(5000, () => {
    console.log("Serving running in port: 5000");
});