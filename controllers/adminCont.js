const TrainModel = require("../models/trainModel");

const adminCont = {
    addTrain: (req, res) => {
        const { name, source, destination, totalSeats } = req.body;

        TrainModel.addTrain(name, source, destination, totalSeats, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error adding train");
            }
            res.status(201).send("Train added !");
        });
    }
};

module.exports = adminCont;
