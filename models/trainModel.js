const db = require("../db");

const trainModel = {
    addTrain: (train_name, source, destination, totalSeats, callback) => {
        const query = `
            INSERT INTO trains (train_name, source, destination, total_seats, available_seats)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [train_name, source, destination, totalSeats, totalSeats], callback);
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
    },

    checkAvailability: (source, destination, callback) => {
        const query = `
            SELECT id, train_name, total_seats - (
                SELECT COUNT(*) FROM bookings where bookings.id = trains.id
            ) AS available_seats
            FROM trains
            WHERE source = ? AND destination = ?`;
        db.query(query, [source, destination], callback);
    },

    checkAvailabilityById: (trainId, callback) => {
        const query = `
            SELECT id, train_name, total_seats - (
                SELECT COUNT(*) FROM bookings WHERE bookings.train_id = trains.id
            ) AS available_seats
            FROM trains
            WHERE id = ?
        `;
        db.query(query, [trainId], callback);
    }
    
};

module.exports = trainModel;
