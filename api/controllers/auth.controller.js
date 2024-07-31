import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';

async function signup(req, res, next) {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json("Signup Successfull")
    } catch (error) {
        next(error);
    }


}

async function signin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            next(errorHandler(400, "Invalid Credentails"));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(400, "Invalid Credentails"));
        }

        const token = jwt.sign({
            id: validUser._id
        }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie("access token", token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
}

async function google(req, res, next) {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-18) + Math.random().toString(36).slice(-18);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-1),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,

            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export { signup, signin, google };