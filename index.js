require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const math = require('mathjs');
const path = require("path");
const Calculation = require('./models/calculation');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html")
    );
});

app.post('/calculate', (req, res) => {
    try {
        const { calculation } = req.body;
        let calcResult = math.evaluate(calculation);
        calcResult = math.round(calcResult, 14);
        const calculationObj = new Calculation({
            calculation: calculation,
            result: calcResult
        });
        calculationObj.save();
        res.status(200).json({
            status : 'success',
            result : calcResult
        });
    } catch(err) {
        res.status(400).json({
            status : 'failed',
            error : err.message
        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Server running on port: ${port}`);
});