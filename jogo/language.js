function language(lang){
    localStorage.setItem('language', lang);
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

function dificult(dif){
    localStorage.setItem('dificult', dif);
    return window.location.assign('game.html');
}

function fechar(){
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';
}