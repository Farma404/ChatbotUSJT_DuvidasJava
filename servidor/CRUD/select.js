function selecionar(campos, object){

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
        const highScore = HighScore.find(camposObj, {_id: 0, __v: 0}).catch((err) => {
            console.log(err);
        });

        return highScore;
    }
}

module.exports = selecionar;