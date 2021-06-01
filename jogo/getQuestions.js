require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const server = express();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("Conexão OK")
}).catch(() => {
    console.log("failed")
})

function buscar(){
    const Questions = require('./jogo/model/java1')
    Question.find({}).then(doc => {
        return doc;
    })
}