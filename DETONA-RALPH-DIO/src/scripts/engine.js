const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('.time-left'),
        score: document.querySelector('.score'),
        lives: document.querySelector('.lives'),
    },
    values:{ 
        // timerID: setInterval(randomSquare, state.values.gameTic),  //comentado por que foi movido para o actions
        // gameTic : 1000,                                            //não precisa mais pois o timerID foi movido pro actions e fixado o intervalo
        hitPosition : 0,
        result: 0,
        currentTime: 60,
        Currentlives: 3,
        // countDownTimerID: setInterval(countDown, 1000),            //movido pro actions 
     },

    actions:{                                                         //movendo esses dois parâmetros para ficar mais organizado
        timerID: setInterval(randomSquare, 700),                    
        countDownTimerID: setInterval(countDown, 1000),   
            
    } 
};

function countLives(){
    if (state.values.Currentlives === 0) {
        gameOver();
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();    
    }
}

function playSound(audioName){
    let audio = new Audio(`/src/audios/${audioName}.m4a`);
    audio.volume = 0.05;
    audio.play();
}

function gameOver(){
    alert("Game Over! Your Score: " + state.values.result);
    location.reload();
}


function randomSquare(){
     state.view.squares.forEach((square)=>{
        square.classList.remove('enemy');
     });

     let randomNumber = Math.floor(Math.random() * 9);
     let randomSquare = state.view.squares[randomNumber]; 

     randomSquare.classList.add('enemy');
     state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//     state.values.timerID = setInterval(randomSquare, state.values.gameTic);
// }

function addListenerHitBox() {
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                playSound('hit');                                        
            } else {
                state.values.Currentlives--;
                state.view.lives.textContent = 'x' + state.values.Currentlives;
                playSound('Blip_Select2');
            };

            countLives();

            state.values.hitPosition = null;
        
        })
    })
}

function initialize(){

    addListenerHitBox();
}

initialize();



