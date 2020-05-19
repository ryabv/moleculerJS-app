const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const Swimmer = require('./models/Swimmer');
const swimmerRoutes = require('./routes/swimmers');

const PORT = 3001;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(swimmerRoutes);

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:1234@cluster0-irjgd.mongodb.net/test',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
            }
        );

        app.listen(PORT, () => {
            console.log('Server has been started...');
        });
    } catch(e) {
        console.error(e);
    }
}

start();