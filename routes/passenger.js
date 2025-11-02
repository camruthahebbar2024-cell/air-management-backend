const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /passengers - Add a new passenger
router.post('/', (req, res) => {
  const { name, phone, email, id_passport_no } = req.body;

  const sql = `INSERT INTO Passengers (name, phone, email, id_passport_no) 
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [name, phone, email, id_passport_no], (err, result) => {
    if (err) {
      console.error('Error adding passenger:', err);
      return res.status(500).json({ message: 'Failed to add passenger' });
    }
    res.status(201).json({ message: 'Passenger added successfully', passengerId: result.insertId });
  });
});

// GET /passengers - Get all passengers
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Passengers';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching passengers:', err);
      return res.status(500).json({ error: 'Failed to fetch passengers' });
    }
    res.json(results);
  });
});

// DELETE /passengers/:passenger_id - Delete a passenger
router.delete('/:passenger_id', (req, res) => {
  const { passenger_id } = req.params;

  const sql = 'DELETE FROM Passengers WHERE passenger_id = ?';

  db.query(sql, [passenger_id], (err, result) => {
    if (err) {
      console.error('Error deleting passenger:', err);
      return res.status(500).json({ error: 'Failed to delete passenger' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.json({ message: 'Passenger deleted successfully' });
  });
});

module.exports = router;
