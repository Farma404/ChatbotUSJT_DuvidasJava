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

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Este bot implementa um quiz com questões sobre Java e MySQL."));


bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    }
    else{
        queries[query.id] = query;
        let gameurl = "https://git.heroku.com/prog-quiz-game/index.html?id=" + query.id;
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url:gameurl
        })
    }
});

bot.on("inline_query", function(iq){
    bot.answerInlineQuery(iq.id, [{type: "game", id: "0", game_short_name: gameName}]);
});

/* HighScore Telegram

server.get("/highScore/:score", function(req, res, next){
    if(!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;

    if(query.message){
        options = {
            chat_id: query.message.message_id
        };
    }
    else{
        options = {
            inline_message_id: query.inline_message_id
        };
    }

    bot.setGameScore(query.from.id, parseInt(req.params.score), options, function(err, result){});
});


process.once('SIGINT',  () => bot.stop ("SIGINT"));
process.once("SIGTERM", () => bot.stop ("SIGTERM"));
*/