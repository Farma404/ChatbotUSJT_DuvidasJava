const mongoose = require('mongoose');
const db = mongoose.connection;

function deletar(campos, object){

    if(object === "question"){
        const Question = require('./model/question');
        let camposObj = Object.assign({}, campos) || {};
        
        const questions = Question.find(camposObj, {_id: 0, __v: 0}).catch((err) => {
            console.log(err);
        });

        return questions;
    }

    else if(object === "highScore"){
        const HighScore = require('./model/highScore');
        let camposObj = Object.assign({}, campos) || {};

        return new Promise((resolve, reject) => {
            db.dropCollection("highscores", (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    }
}

module.exports = deletar;