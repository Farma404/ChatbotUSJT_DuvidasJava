const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const gameName = "ProgQuizGame"
const queries = {};
const gameURL = process.env.gameURL || "http://127.0.0.1:5500/jogo/index.html";

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Este bot implementa um quiz com questões sobre Java e MySQL, para iniciar basta digitar no chat \"@usjt_duvidas_prog_java_bot\" ou \"/start\" no chat de Duvidas de programação (Java)."));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));


bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    }
    else{
        queries[query.id] = query;
        let gameurl = gameURL;
        bot.answerCallbackQuery(query.id, {
            callback_query_id: query.id,
            url:gameurl
        })
    }
});

bot.on("inline_query", function(iq){
    bot.answerInlineQuery(iq.id, [{type: "game", id: "0", game_short_name: gameName}]);
});