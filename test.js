// Run with: node test.js
const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.runInNewContext(fs.readFileSync(__dirname + "/scripts/game.js", "utf8"), ctx);

function check(board, round) {
  ctx.gameData = board;
  ctx.currentRound = round;
  return ctx.checkForGameOver();
}

assert.strictEqual(check([[1, 1, 1], [2, 2, 0], [0, 0, 0]], 5), 1, "row");
assert.strictEqual(check([[1, 2, 1], [1, 2, 0], [0, 2, 0]], 6), 2, "column");
assert.strictEqual(check([[1, 2, 0], [2, 1, 0], [0, 0, 1]], 5), 1, "diagonal");
assert.strictEqual(check([[1, 1, 2], [0, 2, 0], [2, 0, 1]], 6), 2, "anti-diagonal");
assert.strictEqual(check([[1, 2, 1], [1, 2, 2], [2, 1, 1]], 9), -1, "draw");
assert.strictEqual(check([[1, 2, 1], [1, 2, 2], [2, 1, 0]], 8), 0, "still playing");
assert.strictEqual(check([[1, 2, 1], [1, 1, 2], [2, 2, 1]], 9), 1, "win on last move beats draw");

console.log("All tests passed");
