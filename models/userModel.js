const db = require("../db");

const userModel = {
    register: (username, password, role, callback) => {
        const query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        db.query(query, [username, password, role], callback);
    },

    findByUsername: (username, callback) => {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], callback);
    }
};

module.exports = userModel;