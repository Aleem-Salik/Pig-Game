'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');
const btnRollEl = document.querySelector('.btn--roll');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let playing, currentScore, activePlayer, scores;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
};

init();

const switchingPlayers = function () {
  // Resetting the current scores
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Switching the active Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // Generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   Displaying Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //   Check for rolled 1
    if (dice !== 1) {
      // Setting the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchingPlayers();
    }
  }
});

// Holding the scores
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // Displaying the Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Checking for a winner
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchingPlayers();
    }
  }
});

// Sterting New game
btnNewEl.addEventListener('click', init);
