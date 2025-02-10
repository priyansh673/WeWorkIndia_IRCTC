const mysql = require("mysql2");
const dotenv = require("dotenv");

const env = dotenv.config();

const passkey = process.env.rootPass;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: passkey,
    database: "irctc_system"
});

db.connect(err => {
    if(err){
        console.error("database connection failed: ", err);
        process.exit(1);
    }
    else{
        console.log("Connected to database successfully");
    }
});

module.exports = db;