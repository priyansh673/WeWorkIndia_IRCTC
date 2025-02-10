const express = require("express");
const BookingController = require("../controllers/bookCont");
const { authenticate } = require("../middleware/auth");

const router = express.Router();


router.post("/book", authenticate, BookingController.bookSeat);


router.get("/details/:id", authenticate, BookingController.getBookingDetails);

module.exports = router;
