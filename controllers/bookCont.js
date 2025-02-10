const TrainModel = require("../models/trainModel");
const BookingModel = require("../models/bookModel");

const bookCont = {
    bookSeat: (req, res) => {
        const { trainId, source, destination } = req.body;
        const userId = req.user.id; 

        TrainModel.getTrainsBetweenStations(source, destination, (err, trains) => {
            if (err || trains.length === 0) {
                return res.status(404).send("Train not found");
            }

            const train = trains[0];

            if (train.available_seats <= 0) {
                return res.status(400).send("No seats available");
            }

            
            BookingModel.createBooking(userId, trainId, source, destination, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error booking seat");
                }

               
                TrainModel.updateSeats(trainId, train.available_seats - 1, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error updating seat availability");
                    }
                    res.status(201).send("Seat booked successfully");
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
