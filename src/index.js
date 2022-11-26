import express, { json, response } from "express";
import cors from "cors";
import sellingRouter from "./routes/sellingRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRouter.js";
import noUserRouter from "./routes/noUserRoutes.js";


const app = express();
app.use(cors());
app.use(json());

app.use(noUserRouter);

app.use(userRouter);

app.use(sellingRouter);

app.use(productsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Serving running in port:" + port);
});
