require('dotenv').config()
const { Telegraf } = require ('telegraf');

const bot = new Telegraf(process.env.TOKEN);

const startMessage = 'Bem Vindo!';

const sorryMessage = 'Lamento mas ainda não sei nada a respeito.'

const baseMessage = [
    {
        chave: 'if',
        valor: 'Um if é uma estrutura de seleção.'
    }
]

bot.start((ctx) => {
    ctx.reply(StartMessage);
})

bot.on('text', (ctx) =>{
    try{
        const resp = base.find(item => {
            return ctx.message.text.toLowerCase().includes(item.chave)
        })

        ctx.reply(resp.valor);
    }
    catch (err){
        ctx.reply(sorryMessage);
    }
})

bot.launch();
process.once('SIGINT',  () => bot.stop ("SIGINT"));
process.once('SIGTERM', () => bot.stop ("SIGTERM"));