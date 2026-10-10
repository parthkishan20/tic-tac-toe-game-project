function updatePlayerName(event) {
  const inputElement = event.target;
  const playerIndex = inputElement.dataset.playerid - 1;

  // an empty field falls back to the default name shown as the placeholder
  players[playerIndex].name = inputElement.value.trim() || inputElement.placeholder;

  if (!gameIsOver && playerIndex === activePlayer) {
    showActivePlayer();
  }
}
