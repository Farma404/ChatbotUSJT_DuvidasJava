function language(lang){
    localStorage.setItem('language', lang);
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

function difficulty(dif){
    localStorage.setItem('difficulty', dif);
    return window.location.assign('game.html');
}

function fechar(){
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';
}