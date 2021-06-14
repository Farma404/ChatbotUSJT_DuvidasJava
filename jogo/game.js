const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = [];
var MAX_QUESTIONS = 1;
const lang = localStorage.getItem('language');
const diff = localStorage.getItem('difficulty');
let questions = [];

axios.get(`/selectquestion?language=${lang}`).then((response) => {
    questions = response.data;

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
            MAX_QUESTIONS = 3;
            SCORE_POINTS = 80;
        }
        else if(diff === "medio"){
            MAX_QUESTIONS = 10;
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
        question.innerHTML = currentQuestion.question

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
                if(diff === "facil" || diff === "medio"){
                    incrementScore(currentQuestion.time);
                }
                else{
                    incrementScore(currentQuestion.time - (currentQuestion.time * 0.2));
                }
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

        if(diff === "facil"){
            score += SCORE_POINTS;
        }
        else{
            score += addScore;
        }
        scoreText.innerText = score
    }

    startGame()
});