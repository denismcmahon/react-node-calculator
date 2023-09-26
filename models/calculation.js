const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
    calculation: {
        required: true,
        type: String
    },
    result: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Calculation', calculationSchema);