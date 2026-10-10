const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let activePlayer = 0;
let currentRound = 1;
// true until the first game starts, so renaming a player does not overwrite the start hint
let gameIsOver = true;

const players = [
  {
    name: "Player 1",
    symbol: "X",
  },
  {
    name: "Player 2",
    symbol: "O",
  },
];

const gameAreaElement = document.getElementById("active-game");
const statusElement = document.getElementById("game-status");
const playerElements = document.querySelectorAll(".player");
const playerNameInputElements = document.querySelectorAll(".player input");
const startNewGameBtnElement = document.getElementById("start-game-btn");
const gameFieldElements = document.querySelectorAll("#game-board button");
const strikeLineElement = document.getElementById("strike-line");

for (const playerNameInputElement of playerNameInputElements) {
  playerNameInputElement.addEventListener("input", updatePlayerName);
}

startNewGameBtnElement.addEventListener("click", startNewGame);

for (const gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}
