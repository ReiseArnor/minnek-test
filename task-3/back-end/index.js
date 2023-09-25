require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./models");
db.sequelize.sync();

// CORS
const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['x-access-token', 'Content-Type', 'User-Agent']
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
require('./routes/auth')(app);
require('./routes/dog')(app);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
