const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());//middlewares

let users = [];//local storage

app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = { id: Date.now(), name, email };
    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});