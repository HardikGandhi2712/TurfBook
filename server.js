const express = require('express');
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(express.static('public'));

const usersFile = path.join(__dirname, "users.json");

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    if (!fs.existsSync(usersFile)) {
        return res.json({
            success: false,
            message: "Invalid Username or Password"
        });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.json({
            success: false,
            message: "Invalid Username or Password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
        res.json({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } else {
        res.json({
            success: false,
            message: "Invalid Username or Password"
        });
    }
});

app.post("/register", async (req, res) => {
    const { name, username, password, email, avatar } = req.body;
    let users = [];
    
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
    }
    
    const existingUser = users.find(user => user.username === username);
    
    if (existingUser) {
        return res.json({
            success: false,
            message: "Username already exists."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        name,
        username,
        password: hashedPassword,
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
    console.log(`🚀 Server Running on http://localhost:${port}`);
});