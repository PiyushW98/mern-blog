import express from "express";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import userRouter from "./route/user.js"

dotenv.config();

mongoose.connect(process.env.MONGO).then((result) => {
    console.log("MongoDB is connected")
}).catch((err) => {
    console.error(err);
});

const app = express();

app.get('/', (req, res) => { return res.send("Hello World") })

app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`server has started http://localhost:${process.env.PORT}/`)
})
