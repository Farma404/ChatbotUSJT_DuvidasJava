const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionsCounter = 0
let availableQuestions = []
var MAX_QUESTIONS = 1
const lang = localStorage.getItem('language')
const diff = localStorage.getItem('difficulty')

let questions = [
    {
        question: "No que diz respeito à criação de métodos em Java, o qualificador ou modificador define a visibilidade e pode ser de três tipos básicos:\n\nI. é visível apenas pela própria classe. É o qualificador mais restritivo.\nII. é visível pela própria classe, por suas subclasses e pelas classes do mesmopacote.\nIII. é visível por qualquer classe, sendo o qualificador mais aberto no sentido de quequalquer classe pode usar esse método.”\n\nOs métodos definidos em I, II e III são respectivamente denominados:",
        choice1: "private, protected e public.",
        choice2: "private, public e protected.",
        choice3: "public, protected e private",
        choice4: "protected, public e private.",
        answer: 1,
        time: 5,
    },
    {
        question: "Qual será a saída no seguinte código Java:\n\npublic class Main {\npublic static void main(String[] args) {\nint x = 5;\nint y = 7;\nif (x < y) {\ny = y-(x-3);\nSystem.out.println(x+y);\n}\nelse {\nSystem.out.println(y-7);\n}\n}\n}",
        choice1: "10",
        choice2: "12",
        choice3: "0",
        choice4: "-1",
        answer: 1,
        time: 5,
    },
    {
        question: "Sobre a linguagem Java, em relação à entrada/saída e operadores, assinale a alternativa INCORRETA.",
        choice1: "As condições em instruções if podem ser formadas utilizando-se os operadores de igualdade (== e !=) e relacionais (>, <, >= e <=).",
        choice2: "Uma instrução if começa com a palavra-chave if, seguida por uma condição entre parênteses, e espera uma instrução no seu corpo.",
        choice3: "Uma barra (/) em uma string é um caractere de escape. O Java o combina com o próximo caractere para formar uma sequência de escape. A sequência de escape /n representa o caractere de nova linha.",
        choice4: "Variáveis do tipo char representam caracteres individuais, como uma letra maiúscula (por exemplo, A), um dígito (por exemplo, 7), um caractere especial (por exemplo, * ou %), ou uma sequência de escape (por exemplo, tab, \"\\t\").",
        answer: 3,
        time: 5,
    },
    {
        question: "Assinale a linha em Java que não apresenta erro de sintaxe.",
        choice1: "return int salario;",
        choice2: "return salario;",
        choice3: "return Int salario, Char nome;",
        choice4: "return char nome;",
        answer: 4,
        time: 5,
    },
    {
        question: "Em Java, a estrutura de repetição que permite que um conjunto de instruções não seja executada nenhuma vez é representada por:",
        choice1: "while.",
        choice2: "switch.",
        choice3: "do...while.",
        choice4: "case.",
        answer: 1,
        time: 5,
    },
    {
        question: "Qual o código utilizado para exibir \"Hello World\" no Java?",
        choice1: "echo(\"Hello World\");",
        choice2: "Console.WriteLine(\"Hello World\");",
        choice3: "print(\"Hello World\");",
        choice4: "System.out.println(\"Hello World\");",
        answer: 4,
        time: 5,
    },
    {
        question: "Como criar uma variável com número inteiro de valor 7 no Java?",
        choice1: "num x = 7;",
        choice2: "x = 7;",
        choice3: "int x = 7;",
        choice4: "float x = 7;",
        answer: 3,
        time: 5,
    },
    {
        question: "No Java, qual tipo de dado não é primitivo:",
        choice1: "int",
        choice2: "String",
        choice3: "boolean",
        choice4: "char",
        answer: 2,
        time: 5,
    },
    {
        question: "Assinale a linha em Java que NÃO apresenta erro de sintaxe.",
        choice1: "return int salario;",
        choice2: "return salario;",
        choice3: "return Int salario, Char nome;",
        choice4: "return char nome;",
        answer: 2,
        time: 5,
    },
    {
        question: "No Java, o bloco de loop que executa exatamente 20 vezes as instruções contidas no bloco é:",
        choice1: "for (int i = 0 ; i > 20 ; i--)",
        choice2: "for (int i = 41 ; i > 0 ; i = i - 2)",
        choice3: "for (int i = 0 ; i < 20 ; i++)",
        choice4: "for (int i = 0 ; i <= 20 ; i++)",
        answer: 3,
        time: 5,
    },
    {
        question: "Sobre JAVA, é correto afirmar:",
        choice1: "É uma leitura programática orientada a objetos",
        choice2: "É uma lista de programação orientada a objetos",
        choice3: "É uma linguagem de programação orientada a objetos",
        choice4: "É uma lista tecnológica de programação destinada a usuários.",
        answer: 3,
        time: 5,
    },
    {
        question: "Acerca da programação orientada a objetos, usando Java, analise a seguinte assertiva: “O Java contém três tipos de instruções de seleção”. Assinale-as.",
        choice1: "if; for; while.",
        choice2: "if; while; do while.",
        choice3: "while; switch; else.",
        choice4: "if; if ... else; switch.",
        answer: 4,
        time: 5,
    },
]

var SCORE_POINTS = 0;
var bSec = 0;
var bMin = 0;
var aSec = 0;
var aMin = 0;

startGame = () => {
    console.log(lang + " - " + diff)
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    
    if(diff === "facil"){
        MAX_QUESTIONS = 8;
        SCORE_POINTS = 80;
    }
    else if(diff === "medio"){
        MAX_QUESTIONS = 8;
        SCORE_POINTS = 100;
    }
    else if(diff === "dificil"){
        MAX_QUESTIONS = 8;
        SCORE_POINTS = 120
    }

    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    var data = new Date();
    bSec = data.getSeconds();
    bMin = data.getMinutes();

    questionCounter++
    progressText.innerText = `Pergunta ${questionCounter}/${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(currentQuestion.time)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        }, 1000)
    })
})

incrementScore = time => {
    var data = new Date();
    var total = 0;
    var addScore = SCORE_POINTS;
    aSec = data.getSeconds();
    aMin = data.getMinutes();

    if(bMin !== aMin){
        total = 60 - bSec + aSec;
        var dMin = aMin - bMin;
        if(dMin > 1){
            total = total + ((dMin - 1) * 60)
        }
    }
    else{
        total = aSec - bSec;
    }

    if(total > time){
        var porcento = ((total * 100) / time) - 100;

        if(porcento < 75){
            addScore = Math.trunc(SCORE_POINTS - (SCORE_POINTS * (porcento / 100)));
        }
        else{
            addScore = Math.trunc(SCORE_POINTS - (SCORE_POINTS * 0.75));
        }
    }

    score += addScore;
    scoreText.innerText = score
}

startGame()