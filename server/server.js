const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cars.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const express = require('express');
const server = express();

server.use(express.json()).use(express.urlencoded({ extended: false })).use
((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

server.listen(3000, () => {console.log('Server started at port 3000');});

server.get('/cars', (req, res) => {
    try {
        const sql = 'SELECT * FROM cars';

        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Database error:', err.message);
                res.status(500).send('Database error occurred');
            } else {
                res.status(200).json(rows);
            }
        });
    } catch (error) {
        console.error('Synchronous error:', error.message);
        res.status(500).send('Server error occurred');
    }
});

server.get('/cars/:id', (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM cars WHERE id = ?`;

        db.all(sql, [id], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                if (rows.length > 0) {
                    res.send(rows[0]);
                } else {
                    res.status(404).send('Car not found');
                }
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});

server.post('/cars', (req, res) => {
    try {
        const newCar = req.body;
        const sql = 'INSERT INTO cars(regNum, model, manufact, manufactYear, color, fuel) VALUES (?, ?, ?, ?, ?, ?)';

        db.run(sql, Object.values(newCar), (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                res.status(200).send('A new car has been added to the database');
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});

server.put('/cars', (req, res) => {
    try {
        const updatedCar = req.body;

        const id = updatedCar.id;
        const car = {
            regNum: updatedCar.regNum, 
            model: updatedCar.model, 
            manufact: updatedCar.manufact, 
            manufactYear: updatedCar.manufactYear, 
            color: updatedCar.color, 
            fuel: updatedCar.fuel
        };

        let updateString = '';
        const columnsArray = Object.keys(car);
        columnsArray.forEach((column, i) => {
            updateString += `${column} = '${car[column]}'`;
            if (i !== columnsArray.length - 1) updateString += ', ';
        });
        const sql = `UPDATE cars SET ${updateString} WHERE id = ${id}`;

        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                res.status(200).send('A car has been updated');
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});

server.delete('/cars/:id', (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM cars WHERE id = ${id}`;
        
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                res.status(200).send(`A car with the id: ${id} has been deleted`);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});
