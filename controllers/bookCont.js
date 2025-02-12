const TrainModel = require("../models/trainModel");
const BookingModel = require("../models/bookModel");

const bookCont = {
    bookSeat: (req, res) => {
        const { trainId, seatCount } = req.body;
        const userId = req.user.id; 
    
        console.log("Booking request received:", { userId, trainId, seatCount });
    
        TrainModel.checkAvailabilityById(trainId, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Internal Server Error");
            }
    
            if (!result || result.length === 0) {
                console.warn("Train not found:", trainId);
                return res.status(404).send("Train not found");
            }
    
            const train = result[0];
    
            if (train.available_seats < seatCount) {
                console.warn("Not enough seats available. Requested:", seatCount, "Available:", train.available_seats);
                return res.status(400).send("Not enough seats available");
            }
    

            BookingModel.createBooking(userId, trainId, seatCount, (err, bookingResult) => {
                if (err) {
                    console.error("Error creating booking:", err);
                    return res.status(500).send("Error booking seat");
                }
    
                console.log("Booking created successfully:", bookingResult);
    

                const updatedSeats = Math.max(0, train.available_seats - seatCount);
                TrainModel.updateSeats(trainId, updatedSeats, (err) => {
                    if (err) {
                        console.error("Error updating seat availability:", err);
                        return res.status(500).send("Error updating seat availability");
                    }
                    res.status(201).send("Seat(s) booked successfully");
                });
            });
        });
    },

    getBookingDetails: (req, res) => {
        const bookingId = req.params.id;

        BookingModel.getBookingDetails(bookingId, (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).send("Booking not found");
            }
            res.status(200).json(result[0]);
        });
    }
};

module.exports = bookCont;
