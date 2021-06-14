const mongoose = require('mongoose');

const highScoreSchema = mongoose.Schema({
    name: {type: String, required: true},
    language: {type: String, required: true},
    score: {type: Number, required: true},
});

module.exports = mongoose.model('highScore', highScoreSchema);