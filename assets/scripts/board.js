'use strict';

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let stillPlaying = true;
let currentPlayer = 'X';

let winnerCallback = function(){}; // Called as a function when the game is drawn or has a winner
let turn = function(){}; // Called as a function when each turn is over

let game = {
  game: {
    cell: {
      index: '',
      value: '',
    },
    over: false,
  },
}; // using to patch a game

const setWinnerFunction = function(winner) {
  winnerCallback = winner; // Saves a callback we can call when the game is over
};

const setTurn = function(callback) {
  turn = callback; // Saves a callback we can call at the end of each turn
};

const isTileAvailable = function (index) {
  // Checks if the game is still running and if the array index is '' (no move made there yet)
  return stillPlaying && gameBoard[index] === '';
};

const getTileValue = function (index) {
  // Gets the current value of the tile
  return gameBoard[index];
};

// Provided function
const allThree = function(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
};

// Provided function
const winnerIs = function(player) {
  // ROWS BELOW
  return allThree(player, getTileValue('0'), getTileValue('1'), getTileValue('2')) ||
         allThree(player, getTileValue('3'), getTileValue('4'), getTileValue('5')) ||
         allThree(player, getTileValue('6'), getTileValue('7'), getTileValue('8')) ||
  // COLUMNS BELOW
         allThree(player, getTileValue('0'), getTileValue('3'), getTileValue('6')) ||
         allThree(player, getTileValue('1'), getTileValue('4'), getTileValue('7')) ||
         allThree(player, getTileValue('2'), getTileValue('5'), getTileValue('8')) ||
  // DIAGONALS BELOW
         allThree(player, getTileValue('0'), getTileValue('4'), getTileValue('8')) ||
         allThree(player, getTileValue('2'), getTileValue('4'), getTileValue('6'));
};

// Checks if the tile is not blank
const checkTile = function (tile) {
    return tile !== '';
};

// Checks if the game is a draw if every element passes the checkTile method
const isDraw = function() {
  return gameBoard.every(checkTile);
};

// Called each time a player makes a move
const makeMove = function (index) {
  gameBoard[index] = currentPlayer; // Make the next move in the game
  if (winnerIs(currentPlayer)) { // Check if anyone has won the game
    stillPlaying = false; // Used to stop input because the game is over
    winnerCallback(currentPlayer); // Lets the winner callback run, with winning player
    game.game.over = true; // changes game's over string to true
  } else if(isDraw()) { // Check if the game is a draw
    stillPlaying = false; // Used to stop input because the game is over
    winnerCallback(null); // Lets the winning callback run, with no winning player
    game.game.over = true; // changes game's over string to true
  } else { // If no one has won, switch to the next players turn
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    turn(currentPlayer); // THIS LINKS TO TURN ANNOUNCEMENT
  }
};

// Provided function
const getWinner = function() {
  if (winnerIs('X')) {
    return 'X';
  }
  if (winnerIs('O')) {
    return 'O';
  }
  return null;
};

const resetBoard = function () {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  stillPlaying = true;
  currentPlayer = 'X';
};

module.exports = {
  isTileAvailable,
  makeMove,
  getTileValue,
  winnerIs,
  getWinner,
  setWinnerFunction,
  setTurn,
  resetBoard,
};
