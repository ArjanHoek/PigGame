'use strict';

// Select elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Functions
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  const currentPlayer = activePlayer;
  const nextPlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${nextPlayer}`)
    .classList.add('player--active');

  activePlayer = nextPlayer;
};

const updateScore = player => {
  document.querySelector(`#score--${player}`).textContent = score[player];
};

// Rolling the dice
btnRollEl.addEventListener('click', function () {
  if (playing) {
    const random = Math.ceil(Math.random() * 6);
    diceEl.setAttribute('src', `dice-${random}.png`);
    diceEl.classList.remove('hidden');

    if (random !== 1) {
      currentScore += random;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding the score
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    updateScore(activePlayer);

    if (score[activePlayer] >= 100) {
      playing = false;
      const winner = document.querySelector(`.player--${activePlayer}`);

      winner.classList.add('player--winner');
      winner.classList.remove('player--active');
      diceEl.classList.add('hidden');

      return;
    }

    switchPlayer();
  }
});

// Start new game
btnNewEl.addEventListener('click', function () {
  score[0] = 0;
  score[1] = 0;
  updateScore(0);
  updateScore(1);

  currentScore = 0;
  document
    .querySelectorAll('.current-score')
    .forEach(el => (el.textContent = currentScore));

  document.querySelector('.player--winner').classList.remove('player--winner');

  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  playing = true;
});
