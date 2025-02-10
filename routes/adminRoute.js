const express = require("express");
const AdminController = require("../controllers/adminCont");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/add-train", authenticate, authorizeAdmin, AdminController.addTrain);

module.exports = router;
