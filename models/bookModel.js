const db = require("../db");

const bookModel = {
    createBooking: (userId, trainId, seatCount, callback) => {
        const query = `
            INSERT INTO bookings (user_id, train_id, seat_count, booking_date)
            VALUES (?, ?, ?, NOW())
        `;
        db.query(query, [userId, trainId, seatCount], callback);
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
