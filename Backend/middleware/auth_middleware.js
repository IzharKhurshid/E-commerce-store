import jwt from "jsonwebtoken";

export const isAuthenticate = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode.user;
    next();
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
};

export const isAdmin = (req, res, next) => {
    try {
        if(!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden, you are not an admin"});
    }
    next()
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
};