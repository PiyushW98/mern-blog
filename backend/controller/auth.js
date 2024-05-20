import User from "../model/user.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        next(errorHandler(400, "All Fields are Required"));
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPass
    });

    try {
        await newUser.save();
        res.json('signup success')
    } catch (error) {
        next(error)
    }


}