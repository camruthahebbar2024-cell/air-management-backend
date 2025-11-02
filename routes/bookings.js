const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /bookings - Book a ticket
router.post('/', (req, res) => {
  const { flight_id, passenger_id } = req.body;
  const sql = 'INSERT INTO Bookings (flight_id, passenger_id) VALUES (?, ?)';
  db.query(sql, [flight_id, passenger_id], (err, results) => {
    if (err) {
      console.error('Error booking ticket:', err);
      return res.status(500).json({ message: 'Failed to book ticket' });
    }
    res.status(201).json({ message: 'Ticket booked successfully', bookingId: results.insertId });
  });
});


router.get('/', (req, res) => {
  const sql = `
    SELECT 
      b.booking_id, b.booking_date,
      p.passenger_id, p.name AS passenger_name,
      f.flight_id, f.flight_no, f.source, f.destination
    FROM Bookings b
    JOIN Passengers p ON b.passenger_id = p.passenger_id
    JOIN Flights f ON b.flight_id = f.flight_id
    ORDER BY b.booking_date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings' });
    }
    res.json(results);
  });
});

module.exports = router;
