const winningLines = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]],
];

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameAreaElement.classList.remove("is-over");

  for (const row of gameData) {
    row.fill(0);
  }
  for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.className = "";
    gameFieldElement.disabled = false;
    gameFieldElement.ariaLabel = `Row ${gameFieldElement.dataset.row}, column ${gameFieldElement.dataset.col}`;
    replayAnimation(gameFieldElement);
  }
}

function replayAnimation(element) {
  element.style.animation = "none";
  void element.offsetWidth; // force a reflow so the browser starts the CSS animation again
  element.style.animation = "";
}

function startNewGame() {
  resetGameStatus();
  showActivePlayer();
  replayAnimation(statusElement);
  startNewGameBtnElement.textContent = "New game";
}

function showActivePlayer() {
  statusElement.textContent = players[activePlayer].name + " to move";
  gameAreaElement.dataset.turn = players[activePlayer].symbol;
  playerElements.forEach((playerElement, index) =>
    playerElement.classList.toggle("is-active", index === activePlayer)
  );
}

function switchPlayer() {
  activePlayer = 1 - activePlayer;
  showActivePlayer();
  replayAnimation(statusElement);
}

function selectGameField(event) {
  if (gameIsOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }

  const symbol = players[activePlayer].symbol;
  selectedField.classList.add("mark-" + symbol.toLowerCase());
  selectedField.ariaLabel += ", " + symbol;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
    return;
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (const [[r1, c1], [r2, c2], [r3, c3]] of winningLines) {
    const value = gameData[r1][c1];
    if (value > 0 && value === gameData[r2][c2] && value === gameData[r3][c3]) {
      return value;
    }
  }
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameAreaElement.classList.add("is-over");
  for (const playerElement of playerElements) {
    playerElement.classList.remove("is-active");
  }

  if (winnerId > 0) {
    statusElement.textContent = players[winnerId - 1].name + " wins";
    const line = winningLines.find((cells) =>
      cells.every(([row, col]) => gameData[row][col] === winnerId)
    );
    for (const [row, col] of line) {
      gameFieldElements[row * 3 + col].classList.add("win");
    }
    // from the first cell's centre to the last one's, reaching 0.4 of a cell past each end
    const [[r1, c1], , [r3, c3]] = line;
    strikeLineElement.setAttribute("x1", c1 + 0.5 - (c3 - c1) * 0.2);
    strikeLineElement.setAttribute("y1", r1 + 0.5 - (r3 - r1) * 0.2);
    strikeLineElement.setAttribute("x2", c3 + 0.5 + (c3 - c1) * 0.2);
    strikeLineElement.setAttribute("y2", r3 + 0.5 + (r3 - r1) * 0.2);
  } else {
    statusElement.textContent = "It's a draw";
  }
  replayAnimation(statusElement);
}
