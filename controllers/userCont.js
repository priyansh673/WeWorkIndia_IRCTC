const UserModel = require("../models/userModel");
const trainModel = require("../models/trainModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const env = dotenv.config();

const userCont = {
    register: async (req, res) => {
        const { username, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        UserModel.register(username, hashedPassword, role || "user", (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error registering user");
            }
            res.status(201).send("User registered successfully");
        });
    },
    login: (req, res) => {
        const { username, password } = req.body;

        UserModel.findByUsername(username, async (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).send("User not found");
            }

            const user = results[0];


            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).send("Invalid credentials");
            }
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ token });
        });
    },

    check: (req, res) => {
        const { source, destination } = req.body;

        if(!source || !destination) {
            return res.status(400).json({message: "Source and Destination needed"})
        }

        trainModel.checkAvailability(source, destination, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "No trains found for this route" });
            }

            res.json({ trains: results });
        });

    }
};

module.exports = userCont;