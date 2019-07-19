/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. 
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
After that, it's the next player's turn
- The player can choose to 'Hold', which means that his 
ROUND score gets added to his GLBAL score. After that, 
it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins 
the game

*/

let scores, roundScore, activePlayer, gamePlaying, lastDice;

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

const nextPlayer = () => {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //to start at 0
    roundScore = 0;
    //change user interface according to turn
    //start at 0 on each
    document.getElementById(`current-0`).textContent = `0`;
    document.getElementById(`current-1`).textContent = `0`;
    /*change active player 
    (could do .remove/.add, but .toggle better)*/
    document.querySelector('.player-0-panel').classList.toggle(`active`);
    document.querySelector('.player-1-panel').classList.toggle(`active`);
    //hide dice when player changes
    document.querySelector('.dice').style.display = `none`;
}


document.querySelector('.btn-roll').addEventListener(`click`, 
    function(){
        if(gamePlaying) {
             //random number
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            //display result
            document.getElementById('dice-1').style.display = `block`;
            document.getElementById('dice-2').style.display = `block`;
            document.getElementById('dice-1').src = `dice-${dice1}.png`;
            document.getElementById('dice-2').src = `dice-${dice2}.png`;
            //update round score if num != 1
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            `${roundScore += dice1 + dice2}`;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }
        if (dice1 === 6 || dice2 === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = '0';
            nextPlayer();
        } else if (dice1 !== 1 || dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        lastDice = dice1 + dice2;
    }
});
       

document.querySelector('.btn-hold').addEventListener(`click`, 
    function() {
        if (gamePlaying) {
            // Add current score to global score
            scores[activePlayer] += roundScore;
            // Update the UI
            document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
            
            const input = document.querySelector('.final-score').value;
            let winningScore;
            // Undefined, 0, null or "" are coerced to false
            // Anything else is coerced to true
            if(input) {
                winningScore = input;
            } else {
                winningScore = 100;
            }
            // Check if player won the game
            if (scores[activePlayer] >= winningScore) {
                document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
                document.getElementById('dice-1').style.display = `none`;
                document.getElementById('dice-2').style.display = `none`;
                document.querySelector(`.player-${activePlayer}-panel`).classList.add(`winner`);
                document.querySelector(`.player-${activePlayer}-panel`).classList.remove(`active`);
                gamePlaying = false;
            } else {
                //Next player
                nextPlayer();
            }
        }
});


document.querySelector('.btn-new').addEventListener(`click`, init);