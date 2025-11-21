import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class userService {
    async register_user(user_data) {
        const { username, email, password } = user_data;
        if(!username || !email || !password) {
            throw new Error("All fields are required");
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        };

        if(password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        };

        const existing_user = await User.findOne({ email });
        if(existing_user) {
            throw new Error("Account already exists");
        };

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username, email, password: hashPassword
        });

        await user.save();
        return user;
    };

    async login_user(user_data) {
        const { email, password } = user_data;
        if(!email || !password) {
            throw new Error("All fields are required");
        };

        const user = await User.findOne({ email });
        if(!user) {
            throw new Error("Account not found");
        };

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            throw new Error("Email or password is incorrect")
        };

        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1d" });
        return { token, user }
    };
};

export default new userService();