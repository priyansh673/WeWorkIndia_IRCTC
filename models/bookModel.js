const db = require("../db");

const bookModel = {
    createBooking: (userId, trainId, source, destination, callback) => {
        const query = `
            INSERT INTO bookings (user_id, train_id, source, destination)
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [userId, trainId, source, destination], callback);
    },

    getBookingDetails: (bookingId, callback) => {
        const query = `
            SELECT * FROM bookings
            WHERE id = ?
        `;
        db.query(query, [bookingId], callback);
    }
};

module.exports = bookModel;
