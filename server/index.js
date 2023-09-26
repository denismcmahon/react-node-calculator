require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const math = require('mathjs');
const Calculation = require('./models/calculation');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});