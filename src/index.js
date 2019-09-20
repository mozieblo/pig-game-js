let activePlayer, score, roundScore, game;

// SHOW DICES
const displayDices = () => {
    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';
};

// HIDE DICES
const noneDices = () => {
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
};

// RANDOM NUMBER
const randomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
};

// START GAME
const init = () => {
        game = true;
        activePlayer = 0;
        score = [0, 0];
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById(`score-0`).textContent = '0';
        document.getElementById(`score-1`).textContent = '0';
        document.querySelector(`.player-0-panel`).classList.remove('winner');
        document.querySelector(`.player-1-panel`).classList.remove('winner');
        document.querySelector(`.player-0-panel`).classList.remove('active');
        document.querySelector(`.player-1-panel`).classList.remove('active');
        document.querySelector(`.player-0-panel`).classList.add('active'); 
        document.querySelector(`#name-0`).textContent = `Player 1`;
        document.querySelector(`#name-1`).textContent = `Player 2`;
        document.querySelector('.final-score').value = '';
        document.querySelector('.final-score').disabled = false;
        noneDices();
};

init();

document.querySelector(`.btn-new`).addEventListener('click', init);

// ROLL DICES
document.querySelector(`.btn-roll`).addEventListener('click', () => {
    if (game) {
        document.querySelector('.final-score').disabled = true;

        const dice1 = randomNumber();
        const dice2 = randomNumber();
    
        document.getElementById(`dice-1`).src = `images/dice-${dice1}.png`
        document.getElementById(`dice-2`).src = `images/dice-${dice2}.png`

        if (dice1 === 6 && dice2 === 6) {
            roundScore = 0;
            score[activePlayer] = 0;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];
            alert('Ops! Double six')
            changeActivePlayer();
        } else if (dice1 !== 1 && dice2 !== 1) { 
            roundScore += dice1 + dice2;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            displayDices();
        } else {
            roundScore = 0;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            changeActivePlayer();
        }    
    }    
});

// HOLD SCORE
document.querySelector(`.btn-hold`).addEventListener('click', () => {
    if (game) {
        
        // GET WINNING SCORE
        const inputValue = document.querySelector('.final-score').value;
        let winningScore;
        
        if (inputValue) {
            winningScore = inputValue
        } else {
            winningScore = 100;
        }
        
        // HOLD SCORE
        score[activePlayer] += roundScore
        roundScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];
             
        // CHECK IF WON
        if (score[activePlayer] >= winningScore) {
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
            noneDices();
            game = false;
        } else {
            changeActivePlayer();
        }
    }  
});

// CHANGE PLAYER
const changeActivePlayer = () => {

    if (activePlayer === 0) {
        document.querySelector(`.player-0-panel`).classList.remove('active');
        document.querySelector(`.player-1-panel`).classList.add('active');
        noneDices();
        activePlayer = 1 
    } else {
        document.querySelector(`.player-1-panel`).classList.remove('active');
        document.querySelector(`.player-0-panel`).classList.add('active');
        noneDices();
        activePlayer = 0;  
    }    
};

