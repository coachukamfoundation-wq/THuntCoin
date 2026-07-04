require("dotenv").config();

const database = require("./database");
const bot = require("./bot");

require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ===========================
// THuntCoin Backend
// ===========================

app.get("/", (req, res) => {

    res.json({

        app: process.env.APP_NAME,
        status: "Running",
        version: "1.0",
        message: "🚀 Welcome to THuntCoin Backend"

    });

});

// ===========================
// Telegram Status
// ===========================

app.get("/telegram", (req, res) => {

    res.json({

        connected: true,
        botConfigured: !!process.env.BOT_TOKEN,
        miniApp: process.env.APP_URL

    });

});

// ===========================
// Health Check
// ===========================

app.get("/health", (req, res) => {

    res.json({

        status: "OK",
        uptime: process.uptime()

    });

});

// ===========================
// Start Server
// ===========================

app.listen(PORT, () => {

    console.log(`✅ THuntCoin Backend running on port ${PORT}`);

});
