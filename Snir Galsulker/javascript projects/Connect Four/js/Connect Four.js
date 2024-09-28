import MainMenuModal from "./classes/MainMenuModal.js";
import Modal from "./classes/MainMenuModal.js";
import GameInformation from "./classes/GameInformation.js";

// Game state constants to represent if the game is stopped or running
const gameState = {
  gameStop: 0,
  gameRunning: 1,
  gameover: -1,
};

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLS = 7;

const P1_COLOR = "red";
const P2_COLOR = "blue";

let style;

let menuModal = null;

let gameInfo;

// Initial empty board state represented by a 2D array
let board = [];

// Game status object to track the current turn, number of wins for each player, and game state
let gameStatus = {
  turn: 1,
  p1Wins: 0,
  p2Wins: 0,
  gameState: gameState.gameStop,
};

// Get references to DOM elements
let timerElement = document.getElementById("timer");

// Variables to hold interval ID and start time
let intervalId;
let startTime;

// Initialize game status and board state
function init() {
  gameStatus.turn = 1;
  gameStatus.p1Wins = 0;
  gameStatus.p2Wins = 0;
  gameStatus.gameState = gameState.gameStop;

  gameInfo = new GameInformation();

  // Initialize board to empty state and build the HTML code of grid board
  let boradHTML = "";
  board = [];
  for (let col = 0; col < NUMBER_OF_COLS; col++) {
    board[col] = [];
    boradHTML += `
          <div class="col">
            <div class="insertcol"></div>`;
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      board[col][row] = 0;
      boradHTML += `<div></div>`;
    }
    boradHTML += `
          </div>`;
  }

  let tableBoard = document.getElementById("tableBoard");
  tableBoard.innerHTML = boradHTML;
}

// Function to be called when the page loads, sets up the game and event listeners
window.onPageLoad = function onPageLoad() {
  style = document.createElement("style");
  document.head.appendChild(style);

  menuModal = new MainMenuModal(
    () => {
      startGame();
    },
    { isGameExsist: false }
  );

  menuModal.show();
  // Define the playTurn function to be called when a column is clicked
  let playTurn = function () {
    // Only insert a disc if the game is currently running
    if (gameStatus.gameState == gameState.gameRunning) {
      insertDisc(this); // 'this' refers to the clicked column element
    }
  };

  init(); // Initialize game

  // Add click event listeners to each column element
  let elements = document.getElementsByClassName("col");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", playTurn, false);
  }
};

// Function to insert a disc into the selected column
function insertDisc(colElement) {
  let parent = colElement.parentNode;

  // Find the column index
  let colIndex = Array.prototype.indexOf.call(parent.children, colElement);
  for (var i = board[colIndex].length; i > 0; i--) {
    // Place the disc in the first empty spot in the column and later check the if there is win condition after this player move
    if (board[colIndex][NUMBER_OF_ROWS - i] == 0) {
      board[colIndex][NUMBER_OF_ROWS - i] = gameStatus.turn;

      //Check if this move is win condition if true end the game
      let someoneWin = isThisMoveIsWinCondition(colIndex, NUMBER_OF_ROWS - i);

      if (gameStatus.turn == 1) {
        if (!someoneWin) {
          gameStatus.turn = 2;
          style.innerHTML = `#tableBoard .col:hover .insertcol { background-color: ${P2_COLOR} !important; }`;
        }
        colElement.children[i].style.backgroundColor = "red";
      } else {
        if (!someoneWin) {
          gameStatus.turn = 1;
          style.innerHTML = `#tableBoard .col:hover .insertcol { background-color: ${P1_COLOR} !important; }`;
        }
        colElement.children[i].style.backgroundColor = "blue";
      }

      //Check if this move is win condition if true end the game
      if (someoneWin) gameStatus.gameState = gameState.gameover;

      break;
    }
  }
  console.log(style);
}

function isThisMoveIsWinCondition(col, row) {
  let p = board[col][row];

  let iHorizontal = 1;
  let iVertical = 1;
  let iDiagonalA = 1;
  let iDiagonalB = 1;

  if (p != 0) {
    // Check Horizontal direction
    for (let r = row + 1; r < board[col].length && p == board[col][r]; r++) {
      iHorizontal++;
    }
    for (let r = row - 1; r > -1 && p == board[col][r]; r--) {
      iHorizontal++;
    }

    // Check Vertical direction
    for (let c = col + 1; c < NUMBER_OF_COLS && p == board[c][row]; c++) {
      iVertical++;
    }
    for (let c = col - 1; c > -1 && p == board[c][row]; c--) {
      iVertical++;
    }

    // Check Diagonal A direction
    for (
      let c = col - 1, r = row - 1;
      c > -1 && r > -1 && p == board[c][r];
      c--, r--
    ) {
      iDiagonalA++;
    }
    for (
      let c = col + 1, r = row + 1;
      c > NUMBER_OF_COLS && r > NUMBER_OF_ROWS && p == board[c][r];
      c++, r++
    ) {
      iDiagonalA++;
    }

    // Check Diagonal B direction
    for (
      let c = col - 1, r = row + 1;
      c > -1 && r < NUMBER_OF_ROWS && p == board[c][r];
      c--, r++
    ) {
      iDiagonalB++;
    }
    for (
      let c = col + 1, r = row - 1;
      c < NUMBER_OF_COLS && r > -1 && p == board[c][r];
      c++, r--
    ) {
      iDiagonalB++;
    }
  }

  const winConditions = [iHorizontal, iVertical, iDiagonalA, iDiagonalB];

  return winConditions.some((condition) => condition >= 4);
}

// TODO: create direction check

// Function to start the game by setting the game state to running and start timer
window.startGame = function startGame() {
  gameStatus.gameState = gameState.gameRunning;
  resetTimer(); // make sure timer is reaset
  startTimer(); // start timer
};

// Function to start the timer
function startTimer() {
  startTime = new Date().getTime(); // Record the start time

  // Call updateTimer function every second
  intervalId = setInterval(updateTimer, 1000);
}

// Function to update the timer display
function updateTimer() {
  let currentTime = new Date().getTime(); // Get the current time
  let elapsedTime = currentTime - startTime; // Calculate elapsed time

  // Calculate hours, minutes, and seconds
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  // Update the timer display
  timerElement.textContent =
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;
}

// Function to reset the timer
function resetTimer() {
  clearInterval(intervalId); // Clear the interval
  timerElement.textContent = "00:00:00"; // Reset the timer display
}
