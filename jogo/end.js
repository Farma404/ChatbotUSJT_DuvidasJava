const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const language = localStorage.getItem('language');


axios.get('/selectscore').then((response) => {

    const highScores = response.data || [];
    finalScore.innerText = mostRecentScore;

    username.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !username.value
    })

    saveHighScore = e =>{
        e.preventDefault();

        const score = {
            score: parseInt(mostRecentScore),
            name: username.value,
            language: language
        }

        highScores.push(score)

        highScores.sort((a, b) => {
            return b.score - a.score
        })

        highScores.splice(5);

        const highScoresObj = Object.assign({}, highScores) || {};
        
        axios.delete('/score/delete').catch(() => {}).finally(() => {
            axios.post('/insertscore', highScoresObj).then((response) => {
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                window.location.assign('index.html');
            });
        });
    }
});