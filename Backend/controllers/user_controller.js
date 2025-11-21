import userService from "../service/user_service.js";

class userController {
    async register_user(req, res) {
        try {
            const { username, email, password } = req.body
            const result = await userService.register_user({ username, email, password });
            return res.status(201).json({ message: "User registered successfully", result });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message})
        }
    };

    async login_user(req, res) {
        const { email, password } = req.body;
        try {
            const {token, user} = await userService.login_user({ email, password });
            return res.status(200).cookie("token", token, 
                {expiresIn: "1d", httpOnly: true, sameSite: "strict", secure: true})
                .json({ message: `Welcome back ${user.username}`, user, token });
                
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message})
        }
    };

    async logout_user(_, res) {
        try {
            return res.status(200).clearCookie("token").json({ message: "User logged out successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message})
        }
    };
};

export default new userController();