const db = require("../db");

const trainModel = {
    addTrain: (name, source, destination, totalSeats, callback) => {
        const query = `
            INSERT INTO trains (name, source, destination, total_seats, available_seats)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [name, source, destination, totalSeats, totalSeats], callback);
    },

    getTrainsBetweenStations: (source, destination, callback) => {
        const query = `
            SELECT * FROM trains
            WHERE source = ? AND destination = ?
        `;
        db.query(query, [source, destination], callback);
    },

    updateSeats: (trainId, availableSeats, callback) => {
        const query = `
            UPDATE trains
            SET available_seats = ?
            WHERE id = ?
        `;
        db.query(query, [availableSeats, trainId], callback);
    }
};

module.exports = trainModel;
