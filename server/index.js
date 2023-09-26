const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const math = require('mathjs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/calculate', (req, res) => {
    try {
        const { calculation } = req.body;
        let calcResult = math.evaluate(calculation);
        calcResult = math.round(calcResult, 14);
        console.log('DM ==> /calculate ==> calcResult: ');
        console.log(calcResult);
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