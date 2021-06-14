const mongoose = require('mongoose');

const questionsSchema = mongoose.Schema({
    question: {type: String, required: true},
    choice1: {type: String, required: true},
    choice2: {type: String, required: true},
    choice3: {type: String, required: true},
    choice4: {type: String, required: true},
    answer: {type: Number, required: true},
    time: {type: Number, required: true},
    language: {type: String, required: true},
});

module.exports = mongoose.model('question', questionsSchema);