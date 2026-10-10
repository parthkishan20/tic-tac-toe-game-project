# Tic Tac Toe Game

Welcome to our browser-based Tic Tac Toe game! Enjoy hours of fun with this classic game implemented using JavaScript, HTML, and CSS.

### Play Now

Click [here](https://parthkishan20.github.io/tic-tac-toe/) to play Tic Tac Toe online!

### Features

- **Interactive Gameplay**: Take turns marking X's and O's on the grid.
- **Error Handling**: Get feedback for invalid moves.
- **Responsive Design**: Enjoy gameplay on any device.

### How to Play

1. Type a name for each player, or keep the defaults "Player 1" and "Player 2". Player 1 plays **X** and Player 2 plays **O**.
2. Click **Start game**.
3. Take turns clicking empty cells, or use Tab and Enter. The game detects wins and draws and highlights the winning line.
4. Click **New game** to reset the board and play another round.

### Getting Started

There is no build step or dependencies. Clone the repo and serve the root folder with any static server:

```sh
git clone https://github.com/parthkishan20/tic-tac-toe.git
cd tic-tac-toe
python3 -m http.server 8000
```

Then open http://localhost:8000. Refresh the page after making changes.

### Project Structure

```
index.html            # Page markup: intro, player names, game board
scripts/
  app.js              # Shared game state, DOM references, event listeners
  config.js           # Saves player names as they are typed
  game.js             # Turn handling, win/draw detection, game over
styles/
  styles.css          # Color tokens, fonts, page layout, buttons
  configuration.css   # Player name rows
  game.css            # Status line and game board
test.js               # Win/draw check tests: node test.js
```

Explore the code to understand how the game works. Challenge yourself to understand DOM manipulation and event handling.

### Contributions

We welcome feedback and contributions! Feel free to suggest improvements or report bugs.

Thank you for playing Tic Tac Toe with us! Have fun and happy gaming!
