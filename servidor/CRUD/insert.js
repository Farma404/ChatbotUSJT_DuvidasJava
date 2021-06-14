function inserir(newValues, object){

    if(object === "question"){
        const Question = require('./model/question');
        let question = new Question(newValues);
        return question.save().catch((err) => {
            console.log(err);
        });
    }

    else if(object === "highScore"){
        const HighScores = require('./model/highScore');
        return new Promise((resolve, reject) => {
            HighScores.collection.insertMany(newValues, (err, docs) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs);
                }
            }, {});
        });
    }
}

module.exports = inserir;