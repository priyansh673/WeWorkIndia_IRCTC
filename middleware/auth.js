const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const env = dotenv.config();

const auth = {
    authenticate: (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).send("No Access");
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            res.status(400).send("invalid token");
        }
    },

    authorizeAdmin: (req, res, next) => {
        if (req.user.role !== "admin") {
            return res.status(403).send("No Access");
        }
        next();
    }
};

module.exports = auth;
