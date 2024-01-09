// Importera sqlite3 modulen och sätt den i verbose-läge för detaljerad loggning.
const sqlite3 = require('sqlite3').verbose();
// Skapa en anslutning till SQLite-databasen, öppna den för läsning och skrivning.
const db = new sqlite3.Database('./cars.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        // Om det uppstår ett fel vid anslutning till databasen, logga felet.
        console.error('Error opening database', err.message);
    } else {
        // Meddela i konsolen att anslutningen till databasen är framgångsrik.
        console.log('Connected to the SQLite database.');
    }
});

// Importera express-modulen och skapa en ny express-server.
const express = require('express');
const server = express();

// Konfigurera servern att använda JSON och URL-encoded data samt hantera CORS.
server.use(express.json()).use(express.urlencoded({ extended: false })).use
((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});
// Starta servern på port 3000 och logga det i konsolen.
server.listen(3000, () => {console.log('Server started at port 3000');});

// Hantera GET-förfrågningar till '/cars' för att hämta alla bilar.
server.get('/cars', (req, res) => {
    try {
        // SQL-fråga för att välja alla rader från tabellen 'cars'.
        const sql = 'SELECT * FROM cars';
        // Kör SQL-frågan och hantera resultatet eller eventuella fel.
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Database error:', err.message);
                res.status(500).send('Database error occurred');
            } else {
                // Skicka tillbaka bilarna som JSON-objekt om inga fel uppstår.
                res.status(200).json(rows);
            }
        });
    } catch (error) {
        console.error('Synchronous error:', error.message);
        res.status(500).send('Server error occurred');
    }
});
// Hantera GET-förfrågningar till '/cars/:id' för att hämta en specifik bil.
server.get('/cars/:id', (req, res) => {
    try {
        // Hämta bilens ID från URL-parametrarna.
        const id = req.params.id;
        const sql = `SELECT * FROM cars WHERE id = ?`;

        // Kör SQL-frågan med det specifika ID:et.
        db.all(sql, [id], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                if (rows.length > 0) {
                    res.send(rows[0]);
                } else {
                    // Kontrollera om bilen finns och skicka den eller ett 404-svar.
                    res.status(404).send('Car not found');
                }
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});

// Hantera POST-förfrågningar till '/cars' för att lägga till en ny bil.
server.post('/cars', (req, res) => {
    try {
        // Hämta bil-data från req.body.
        const newCar = req.body;
        const sql = 'INSERT INTO cars(regNum, model, manufact, manufactYear, color, fuel) VALUES (?, ?, ?, ?, ?, ?)';

        // Kör SQL-insert-frågan med bilens data.
        db.run(sql, Object.values(newCar), (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                // Skicka ett svar att en ny bil har lagts till.
                res.status(200).send('A new car has been added to the database');
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});

// Hantera PUT-förfrågningar till '/cars' för att uppdatera en befintlig bil.
server.put('/cars', (req, res) => {
    try {
        // Hämta uppdaterade bil-data från förfrågningens kropp.
        const updatedCar = req.body;
        // Skapa ett objekt med bilens uppdaterade data.
        const id = updatedCar.id;
        const car = {
            regNum: updatedCar.regNum, 
            model: updatedCar.model, 
            manufact: updatedCar.manufact, 
            manufactYear: updatedCar.manufactYear, 
            color: updatedCar.color, 
            fuel: updatedCar.fuel
        };
        // Bygg en sträng för SQL-uppdateringsfrågan.
        let updateString = '';
        const columnsArray = Object.keys(car);
        columnsArray.forEach((column, i) => {
            updateString += `${column} = '${car[column]}'`;
            if (i !== columnsArray.length - 1) updateString += ', ';
        });
        const sql = `UPDATE cars SET ${updateString} WHERE id = ${id}`;
        // Kör SQL-uppdateringsfrågan.
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                // Skicka ett svar att bilen har uppdaterats.
                res.status(200).send('A car has been updated');
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});

// Hantera DELETE-förfrågningar till '/cars/:id' för att radera en bil.
server.delete('/cars/:id', (req, res) => {
    try {
        // Hämta bilens ID från URL-parametrarna.
        const id = req.params.id;
        const sql = `DELETE FROM cars WHERE id = ${id}`;
        
        // Kör SQL-delete-frågan.
        db.run(sql, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Something broke!');
            } else {
                // Skicka ett svar att bilen har raderats.
                res.status(200).send(`A car with the id: ${id} has been deleted`);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error occurred');
    }
});
