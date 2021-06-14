const highScoresList = document.querySelector('#highScoresList')

axios.get('/selectscore').then((response) => {
    const highScores = response.data || [];
    highScoresList.innerHTML = highScores.map(score => {
        return`<li class="high-score">${score.name}, ${score.language} - ${score.score}</li>`
    }).join('')
});