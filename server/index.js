const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const math = require('mathjs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/calculate', (req, res) => {
    try {
        const { calculation } = req.body;
        let calcResult = math.evaluate(calculation);
        calcResult = math.round(calcResult, 14);
        res.send({ 
            status: 'successful',
            result: calcResult
        });
    } catch(err) {
        res.send({ 
            status: 'failed',
            error: err.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});