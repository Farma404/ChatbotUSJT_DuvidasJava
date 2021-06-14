require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connections = require("./servidor/CRUD/connect");
const telegram = require("./telegram")
const inserir = require("./servidor/CRUD/insert");
const selecionar = require("./servidor/CRUD/select");
const deletar = require("./servidor/CRUD/delete");
const server = express();
const port = process.env.PORT || 5500;

server.use("/jogo", express.static(path.join(__dirname, 'jogo')));
server.use(bodyParser.json());

server.post("/insertquestion", (req, res) => {
    inserir(req.body, "question").then((doc) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(400);
    });
});

server.post("/insertscore", (req, res) => {
    const highScores = Object.values(req.body);
    inserir(highScores, "highScore").then((doc) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(400);
    });
});

server.get("/selectquestion", (req, res) => {
    let campos = req.query || [];
    selecionar(campos, "question").then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.sendStatus(400);
    });
});

server.get("/selectscore", (req, res) => {
    let campos = req.query || [];
    selecionar(campos, "highScore").then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.sendStatus(400);
    });
});

server.delete("/score/delete", (req, res) => {
    let campos = req.query || [];
    deletar(campos, "highScore").then((result) =>{
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(400);
        console.log(err);
    });
})

server.listen(port, () => {
    console.log(`Ouvindo na porta ${port}`);
});