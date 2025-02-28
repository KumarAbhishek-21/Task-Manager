
import express from 'express';
const app = express();
import "dotenv/config";
import dotenv from "dotenv";
import {connectDb} from './Models/db.js';
import TaskRouter from './Routes/TaskRouter.js';
import cors from 'cors';
import userRouter from "./Routes/userRouter.js";
dotenv.config();
connectDb();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Server is Running');
});
app.use(cors())
app.use(express.json());
app.use("/api", TaskRouter)
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})