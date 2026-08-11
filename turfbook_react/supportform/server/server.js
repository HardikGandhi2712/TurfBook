const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const csvPath = path.join(__dirname, "sports_arena_tickets.csv");
const backupPath = path.join(__dirname, "sports_arena_tickets_backup.csv");
const dbPath = path.join(__dirname, "support.db");

const db = new sqlite3.Database("support.db", (err) => {
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

app.get("/export", (req, res) => {

    db.all("SELECT * FROM tickets", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No tickets available to export"
            });
        }

        const headers = [
            "id",
            "name",
            "phone",
            "email",
            "category",
            "bookingId",
            "venue",
            "sport",
            "transactionId",
            "amount",
            "paymentMethod",
            "equipment",
            "quantity",
            "device",
            "browser",
            "username",
            "issue",
            "description",
            "status",
            "createdAt"
        ];

        const escapeCSV = (value) => {
            if (value === null || value === undefined) {
                return "";
            }

            value = String(value);

            if (
                value.includes(",") ||
                value.includes('"') ||
                value.includes("\n")
            ) {
                return `"${value.replace(/"/g, '""')}"`;
            }

            return value;
        };

        const csvRows = rows.map(ticket => {
            return headers
                .map(header => escapeCSV(ticket[header]))
                .join(",");
        });

        const csvContent = [
            headers.join(","),
            ...csvRows
        ].join("\n");

        fs.writeFile(
            "sports_arena_tickets.csv",
            csvContent,
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.send("Tickets exported successfully to CSV");
            }
        );
    });
});

app.get("/import", (req, res) => {

    fs.readFile(
        "sports_arena_tickets.csv",
        "utf8",
        (err, data) => {

            if (err) {
                return res.status(500).json({
                    message: "Cannot read sports_arena_tickets.csv"
                });
            }

            const lines = data
                .trim()
                .split("\n");

            if (lines.length < 2) {
                return res.status(400).json({
                    message: "CSV file contains no ticket data"
                });
            }

            const headers = lines[0].split(",");

            const parseCSVValue = (value) => {
                value = value.trim();

                if (
                    value.startsWith('"') &&
                    value.endsWith('"')
                ) {
                    value = value.slice(1, -1);
                    value = value.replace(/""/g, '"');
                }

                return value;
            };

            const tickets = lines.slice(1).map(line => {

                const values = line.split(",");

                const ticket = {};

                headers.forEach((header, index) => {
                    ticket[header] = parseCSVValue(
                        values[index] || ""
                    );
                });

                return ticket;
            });

            const sql = `
                INSERT INTO tickets
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
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;

            db.serialize(() => {

                tickets.forEach(ticket => {

                    db.run(sql, [
                        ticket.name,
                        ticket.phone,
                        ticket.email,
                        ticket.category,
                        ticket.bookingId,
                        ticket.venue,
                        ticket.sport,
                        ticket.transactionId,
                        ticket.amount || null,
                        ticket.paymentMethod,
                        ticket.equipment,
                        ticket.quantity || null,
                        ticket.device,
                        ticket.browser,
                        ticket.username,
                        ticket.issue,
                        ticket.description,
                        ticket.status || "Unresolved",
                        ticket.createdAt
                    ]);

                });

                res.json({
                    message:
                        `${tickets.length} tickets imported successfully from CSV`
                });
            });
        }
    );
});


app.put("/update-csv/:id", (req, res) => {

    const ticketId = req.params.id;
    const newStatus = req.body.status;

    fs.readFile(csvPath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to read CSV file: " + err.message
            });
        }

        const lines = data.trim().split("\n");

        if (lines.length < 2) {
            return res.status(400).json({
                message: "CSV file is empty"
            });
        }

        const headers = lines[0].split(",");

        const idIndex = headers.indexOf("id");
        const statusIndex = headers.indexOf("status");

        if (idIndex === -1 || statusIndex === -1) {
            return res.status(400).json({
                message: "Required columns not found in CSV"
            });
        }

        let updated = false;

        for (let i = 1; i < lines.length; i++) {

            const values = lines[i].split(",");

            if (values[idIndex] === ticketId) {

                values[statusIndex] = newStatus;

                lines[i] = values.join(",");

                updated = true;
                break;
            }
        }

        if (!updated) {
            return res.status(404).json({
                message: "Ticket not found in CSV"
            });
        }

        fs.writeFile(
            csvPath,
            lines.join("\n"),
            "utf8",
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Unable to update CSV: " + err.message
                    });
                }

                res.json({
                    message: "Ticket status updated successfully in CSV"
                });
            }
        );
    });
});

app.get("/rename-csv", (req, res) => {
    const newName = req.query.name;

    if (!newName) {
        return res.status(400).json({
            message: "Please provide a new file name"
        });
    }

    const fileName = newName.endsWith(".csv")
        ? newName
        : newName + ".csv";

    const newPath = path.join(__dirname, fileName);

    fs.rename(csvPath, newPath, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to rename CSV: " + err.message
            });
        }

        res.json({
            message: `CSV file renamed to ${fileName} successfully`
        });
    });
});

app.delete("/delete-csv", (req, res) => {

    fs.unlink(
        backupPath,
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Unable to delete CSV: " + err.message
                });
            }

            res.json({
                message: "CSV backup deleted successfully"
            });
        }
    );
});

app.listen(3001, () => {
    console.log("Server Running on http://localhost:3001");
});