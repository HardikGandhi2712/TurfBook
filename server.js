const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(express.static('public'));

const usersFile = path.join(__dirname, "users.json");

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
    const user = users.find(
        u => u.username === username && u.password === password
    );
    if (user) {
        res.json({
            success: true,
            message: "Login Successful",
            user
        });
    } else {
        res.json({
            success: false,
            message: "Invalid Username or Password"
        });
    }
});


app.post("/register", (req, res) => {
    const { name, username, password, email, avatar } = req.body;
    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
    }
    const existingUser = users.find(
        user => user.username === username
    );
    if (existingUser) {
        return res.json({
            success: false,
            message: "Username already exists."
        });
    }
    users.push({
        name,
        username,
        password,
        email,
        avatar
    });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({
        success: true,
        message: "Registration Successful!"
    });
});


    app.listen(port, () => {
        console.log(
            `🚀 Server Running on http://localhost:${port}`
        );

    });