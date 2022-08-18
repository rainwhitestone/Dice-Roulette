"use strict";
//---for submit stuff
const myInput = document.getElementById("my-input");
const myButton = document.getElementById("my-button");
const content0 = document.getElementById("my-content");
const myInput2 = document.getElementById("my-input2");
const myButton2 = document.getElementById("my-button2");
const content1 = document.getElementById("my-content2");
//-------------------
const diceEl = document.querySelector(".dice");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

myButton.addEventListener("click", function (event) {
  const myInputValue = myInput.value;
  content0.innerHTML = myInputValue;
  myButton.classList.add("hidden");
  myInput.classList.add("hidden");
});

myButton2.addEventListener("click", function (event) {
  const myInputValue = myInput2.value;
  content1.innerHTML = myInputValue;
  myButton2.classList.add("hidden");
  myInput2.classList.add("hidden");
});

let playing, scores, activeplayer, currentScore;

function init() {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");

  player1EL.classList.remove("player--active");
  player0EL.classList.add("player--active");
  diceEl.classList.add("hidden");
  document.querySelector(".message").innerHTML =
    "<p>Roll the dice, save your score with 'Hold'. If you roll '1' you lose all unsaved scores.</p> <p>First to reach 💯 wins! (⊙_⊙;)</p>";
}

init();

function switchAndSave() {
  currentScore = 0;
  document.getElementById(`current--${activeplayer}`).textContent =
    currentScore;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
  if (playing) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNumber}.png`;

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      switchAndSave();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    if (scores[activeplayer] >= 100) {
      //end of the game
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");

      document.querySelector(".message").textContent =
        document.querySelector(activeplayer === 0 ? ".name0" : ".name1")
          .textContent + " wins";
    } else {
      switchAndSave();
    }
  }
});

btnNew.addEventListener("click", init);

console.log(content0.innerHTML);
