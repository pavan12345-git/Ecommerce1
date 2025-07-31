const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/ecommerce.db');

// Helper function to wrap db.all in a promise
function allAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Helper function for db.get
function getAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// GET all departments with product counts
router.get('/', async (req, res) => {
  try {
    const departments = await allAsync(`
      SELECT d.id, d.name, COUNT(p.id) as product_count
      FROM departments d
      LEFT JOIN products p ON d.id = p.department_id
      GROUP BY d.id
      ORDER BY d.name`, []);
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add other endpoints from previous examples...
// (GET /:id, GET /:id/products)

module.exports = router;