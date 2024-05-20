import express from "express";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import userRouter from "./route/user.js"
import authRouter from "./route/auth.js"

dotenv.config();

mongoose.connect(process.env.MONGO).then((result) => {
    console.log("MongoDB is connected")
}).catch((err) => {
    console.error(err);
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => { return res.send("Hello World") })

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

app.listen(process.env.PORT, () => {
    console.log(`server has started http://localhost:${process.env.PORT}/`)
})
