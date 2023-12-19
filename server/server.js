const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cars.db');

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
    const sql = 'SELECT * FROM cars';
    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Something broke!');
        } else {
            res.status(200).json(rows);
        }
    });
});

server.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM cars WHERE id = ${id}`;

    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Something broke!');
        } else {
            res.send(rows[0]);
        }
    });
});
server.post('/cars', (req, res) => {
    const newCar = req.body;
    const sql = 'INSERT INTO cars(regNum, model, manuFact, manufactYear, color, fuel) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, Object.values(newCar), (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Something broke!');
        } else {
            res.status(200).send('A new car has been added to the database');
        }
    });
});

server.put('/cars', (req, res) => {
    const updatedCar = req.body;

    const id = updatedCar.id;
    const car = {
        regNum: updatedCar.regNum, 
        model: updatedCar.model, 
        manuFact: updatedCar.manuFact, 
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
});

server.delete('/cars/:id', (req, res) => {
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
});

