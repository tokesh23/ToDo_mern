const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/Todoroutes");

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT  // Fallback to 8080 if not set
const MONGO_URI = process.env.MONGO_URI; // Get MongoDB URI from .env

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Add middleware to parse JSON bodies

// Test route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Use routes
app.use("/api", routes);
