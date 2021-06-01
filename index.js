//----------------------------------------------------------------------------------//
//-------Ainda em criação, necessária correção do CRUD e colocação no HEROKU-------//
//--------------------------------------------------------------------------------//
require('dotenv').config()
const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const server = express();
const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const port = process.env.PORT || 5000;
const gameName = "ProgQuizGame"
const queries = {};
server.use(express.static(path.join(__dirname, 'jogo')));

/*const Question = require('./jogo/model/java1')
var question;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log("Conexão OK")
}).catch(() => {
    console.log("failed")
})

Question.find({}).then(doc => {
    question = doc;
    console.log(question);
})*/

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Este bot implementa um quiz com questões sobre Java e MySQL, para iniciar basta digitar no chat \"@usjt_duvidas_prog_java_bot\" ou \"/start\" no chat de Duvidas de programação (Java)."));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));


bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    }
    else{
        queries[query.id] = query;
        let gameurl = "http://127.0.0.1:5500/jogo/index.html";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url:gameurl
        })
    }
});

bot.on("inline_query", function(iq){
    bot.answerInlineQuery(iq.id, [{type: "game", id: "0", game_short_name: gameName}]);
});