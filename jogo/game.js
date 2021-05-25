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

let questions = [
    {
        question: "No que diz respeito à criação de métodos em Java, o qualificador ou modificador define a visibilidade e pode ser de três tipos básicos:\n\nI. é visível apenas pela própria classe. É o qualificador mais restritivo.\nII. é visível pela própria classe, por suas subclasses e pelas classes do mesmopacote.\nIII. é visível por qualquer classe, sendo o qualificador mais aberto no sentido de quequalquer classe pode usar esse método.”\nOs métodos definidos em I, II e III são respectivamente denominados:",
        choice1: "private, protected e public.",
        choice2: "private, public e protected.",
        choice3: "public, protected e private",
        choice4: "protected, public e private.",
        answer: 1,
    },
    {
        question: "test02 /a",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "test03 /d",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 4,
    },
    {
        question: "test04 /c",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

    console.log(localStorage.getItem('language'))
    console.log(localStorage.getItem('dificult'))
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

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
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()