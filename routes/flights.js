const express = require('express');
const router = express.Router();
const db = require('../db'); 

// POST /flights
router.post('/', (req, res) => {
  const { flight_no, source, destination, seats, departure_time, arrival_time } = req.body;
  const sql = 'INSERT INTO Flights (flight_no, source, destination, seats, departure_time, arrival_time) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [flight_no, source, destination, seats, departure_time, arrival_time], (err, results) => {
    if (err) {
      console.error('Error adding flight:', err);
      return res.status(500).json({ message: 'Failed to add flight' });
    }
    res.status(201).json({ message: 'Flight added successfully', flightId: results.insertId });
  });
});

// GET /flights
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Flights';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching flights:', err);
      return res.status(500).json({ error: 'Failed to fetch flights' });
    }
    res.json(results);
  });
});

// DELETE /flights/:flight_id
router.delete('/:flight_id', (req, res) => {
  const { flight_id } = req.params;
  const sql = 'DELETE FROM Flights WHERE flight_id = ?';
  db.query(sql, [flight_id], (err, result) => {
    if (err) {
      console.error('Error deleting flight:', err);
      return res.status(500).json({ error: 'Failed to delete flight' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  });
});

module.exports = router;
