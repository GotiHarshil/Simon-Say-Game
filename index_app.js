let gameSeq = [];
let userSeq = [];

let btns = ['red', 'yellow', 'green', 'purple'];

let h3 = document.querySelector('h3');

let allBtns = document.querySelectorAll('.btn');

let started = false;
let level = 0;

let highScore = 0;


document.addEventListener('keypress', function() {
    if(started == false){
        console.log('The game is started');
        started = true;
        levelUp();
    }

    
});


// Flashes
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

function overFlash() {
    let body = document.querySelector('body');

    body.classList.add('gameOver');
    setTimeout(function () {
        body.classList.remove('gameOver');
    }, 500);
}



// levelUp
function levelUp() {
        level++;
        h3.innerText = `level ${level}`;
        userSeq=[];
    
        //random btn choose
        let randIdx = Math.floor(Math.random() * 4);
        let randColor = btns[randIdx];
        console.log(randColor);
        let randBtn = document.querySelector('.'+randColor);
    
        console.dir(randBtn);
        gameSeq.push(randColor);
        gameFlash(randBtn);
    
    
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

// Game Over
function gameOver(btn){
    h3.innerHTML = `Game Over! Your score is ${level}. <br>Press any key to play again`;
    highScore = Math.max(highScore, level); 
    reset();
    
    overFlash();

    // alert(`Your highest score is ${highScore}`);
}


//check for match
function checkAns(){
    if(userSeq.length == gameSeq.length){
        setTimeout( levelUp ,1000);
        
    }

    console.log(userSeq);
    console.log(gameSeq);

}

function btnPressed() {  
    
    if(this.id === gameSeq[userSeq.length]){
        userSeq.push(this.id);
    }else{
        gameOver();
        return;
    }
    
    userFlash(this);
    
    checkAns();
}


for(btn of allBtns){
    btn.addEventListener('click', btnPressed);
}


// Restart
let restartBtn = document.querySelector('.restart');

restartBtn.addEventListener('click', function() {
    reset();
    h3.innerText = "Press any key to start the game";
});

document.querySelector('.button_top').addEventListener('click', function(event) {
    event.stopPropagation();
    reset();
    h3.innerText = "Press any key to start the game";
});