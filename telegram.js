const TelegramBot = require("node-telegram-bot-api");
const gameName = "ProgQuizGame"
const queries = {};
const token = process.env.TOKEN;
const gameURL = process.env.gameURL || "http://127.0.0.1:5500/jogo/index.html";
const botURL = process.env.botURL || `http://127.0.0.1:5500/telegram/${token}`;
let bot;

if(process.env.NODE_ENV === "production"){
    bot = new TelegramBot(token);

    bot.setWebHook(botURL);
}
else{
    bot = new TelegramBot(token, { polling: true });
}


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

module.exports = bot;