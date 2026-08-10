const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("server/support.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }
});

db.run(`
CREATE TABLE IF NOT EXISTS tickets(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    category TEXT,
    bookingId TEXT,
    venue TEXT,
    sport TEXT,
    transactionId TEXT,
    amount REAL,
    paymentMethod TEXT,
    equipment TEXT,
    quantity INTEGER,
    device TEXT,
    browser TEXT,
    username TEXT,
    issue TEXT,
    description TEXT,
    status TEXT DEFAULT 'Unresolved',
    createdAt TEXT
)
`);

app.post("/insertTickets", (req, res) => {
    
    const {
        name,
        phone,
        email,
        category,
        bookingId,
        venue,
        sport,
        transactionId,
        amount,
        paymentMethod,
        equipment,
        quantity,
        device,
        browser,
        username,
        issue,
        description
    } = req.body;

    db.run(
        `INSERT INTO tickets
        (
            name,
            phone,
            email,
            category,
            bookingId,
            venue,
            sport,
            transactionId,
            amount,
            paymentMethod,
            equipment,
            quantity,
            device,
            browser,
            username,
            issue,
            description,
            status,
            createdAt
        )

        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

        [
            name,
            phone,
            email,
            category,
            bookingId,
            venue,
            sport,
            transactionId,
            amount,
            paymentMethod,
            equipment,
            quantity,
            device,
            browser,
            username,
            issue,
            description,
            "Unresolved",
            new Date().toLocaleString()
        ],

        function (err) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.status(201).json({
                message: "Ticket Created Successfully",
                id: this.lastID
            });
        }
    );
});

app.get("/readTickets", (req, res) => {
    db.all("SELECT * FROM tickets", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        res.json(rows);
    });
});


app.put("/tickets/:id", (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    db.run(
        "UPDATE tickets SET status=? WHERE id=?",
        [status, id],
        function(err) {

            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Status Updated"
            });

        }
    );

});


app.delete("/tickets/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM tickets WHERE id=?",[id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json({
                message: "Ticket Deleted Successfully"
            });
        }
    );
});

app.listen(3001, () => {
    console.log("Server Running on http://localhost:3001");
});