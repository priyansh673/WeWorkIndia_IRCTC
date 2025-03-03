const express = require("express");

const userCont = require("../controllers/userCont");

const router = express.Router();

router.post("/register", userCont.register);
router.post("/login", userCont.login);
router.get("/trains/availability", userCont.check);


module.exports = router;