require('dotenv').config()
const { Telegraf } = require ('telegraf');

const bot = new Telegraf(process.env.TOKEN);

const startMessage = 'Bem Vindo!';
const sorryMessage = 'Lamento mas ainda não sei nada a respeito.'
const helpMessage = 'Sou fácil de usar, basta perguntar!'
const settingMessage = 'Ainda não possuo configurações para ajustar.'

const baseMessage = [
    {
        chave: 'if',
        valor: 'Um if é uma estrutura de seleção que executará um comando caso sua condição seja satisfeita.\n\nExemplo de uso:\nif(<condição>){\n<comando a ser executado>\n}',
    },
    {
        chave: 'else',
        valor: 'O comando else será executado caso a condição prescrita no "if" não seja satisfeita.\n\nExemplo de uso:\nif(<condição>){\n<comando a ser executado>\n}\n\nelse{\n<comando a ser executado>\n}'
    }
]

bot.start((ctx) => {
    ctx.reply(startMessage);
})
bot.help((ctx) => {
    ctx.reply(helpMessage);
})
bot.settings((ctx) => {
    ctx.reply(settingMessage);
})

bot.on('text', (ctx) => {
    //console.log(ctx);
    try{
        const resp = baseMessage.find(item => {
            return ctx.message.text.toLowerCase().includes(item.chave);
        })
        ctx.reply(resp.valor);
    }
    catch (err){
        //console.log(err);
        ctx.reply(sorryMessage);
    }
})

bot.launch();
process.once('SIGINT',  () => bot.stop ("SIGINT"));
process.once("SIGTERM", () => bot.stop ("SIGTERM"));