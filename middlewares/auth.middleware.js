import { JWT_SECRET } from "../config/env.js";  // Ensure ".js" extension if using ES modules
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";  // Import User model

const authorize = async (req, res, next) => {
    try {
        let token;

      
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

    
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fix incorrect ID usage
        const user = await User.findById(decoded.userId); 

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();  // Proceed to the next middleware

    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

export default authorize;
