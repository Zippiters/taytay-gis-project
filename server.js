const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configure your local MySQL database connection here
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Your MySQL username (usually root)
    password: 'root', // ⚠️ Enter the password you type to log into MySQL Workbench!
    database: 'taytay_gis',
    port: 3306             // Default port for native MySQL installations
});
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// API endpoint to fetch detailed data when a user clicks a map feature
app.get('/api/location', (req, res) => {
    const locationName = req.query.name;
    const query = "SELECT * FROM location_details WHERE location_name = ?";
    
    db.query(query, [locationName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "No extra database records found for this spot." });
        res.json(results[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});