// Elements
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const historyDiv = document.getElementById("history");
const playerForm = document.getElementById("playerForm");
const viewHistoryBtn = document.getElementById("viewHistoryBtn");
const backToMenu = document.getElementById("backToMenu");
const backToMenuFromHistory = document.getElementById("backToMenuFromHistory");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const gameHistoryList = document.getElementById("gameHistoryList");
const currentPlayerText = document.getElementById("currentPlayer");
const cells = Array.from(document.querySelectorAll(".cell"));

let boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "X";
let player1 = "";
let player2 = "";
let history = JSON.parse(localStorage.getItem("gameHistory")) || [];

// Initialize
function init() {
  displayHistory();
  bindEvents();
}

// Event Binding
function bindEvents() {
  playerForm.addEventListener("submit", startGame);
  viewHistoryBtn.addEventListener("click", viewHistory);
  backToMenu.addEventListener("click", returnToMenu);
  backToMenuFromHistory.addEventListener("click", returnToMenu);
  clearHistoryBtn.addEventListener("click", clearHistory);
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
}

// Start Game
function startGame(event) {
  event.preventDefault();
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
  currentPlayer = "X";
  boardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayerText.innerText = `${player1}'s turn (X)`;
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("disabled");
  });
  menu.style.display = "none";
  game.style.display = "block";
}

// Handle Cell Click
function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");
  const row = Math.floor(index / 3); // השורה בלוח
  const col = index % 3; // העמודה בלוח

  if (boardState[row][col] === "") {
    boardState[row][col] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add("disabled");
    if (checkWin()) {
      recordGame(`${currentPlayer === "X" ? player1 : player2} wins!`);
      setTimeout(
        () => alert(`${currentPlayer === "X" ? player1 : player2} wins!`),
        100
      );
    } else if (boardState.flat().every((cell) => cell !== "")) {
      recordGame("Draw!");
      setTimeout(() => alert("It's a draw!"), 100);
    } else {
      switchPlayer();
    }
  }
}

// Switch Player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerText.innerText = `${
    currentPlayer === "X" ? player1 : player2
  }'s turn (${currentPlayer})`;
}

// Check Win
function checkWin() {
  const winPatterns = [
    // Rows
    [boardState[0][0], boardState[0][1], boardState[0][2]],
    [boardState[1][0], boardState[1][1], boardState[1][2]],
    [boardState[2][0], boardState[2][1], boardState[2][2]],

    // Columns
    [boardState[0][0], boardState[1][0], boardState[2][0]],
    [boardState[0][1], boardState[1][1], boardState[2][1]],
    [boardState[0][2], boardState[1][2], boardState[2][2]],

    // Diagonals
    [boardState[0][0], boardState[1][1], boardState[2][2]],
    [boardState[0][2], boardState[1][1], boardState[2][0]],
  ];

  return winPatterns.some((pattern) => {
    return pattern.every((cell) => cell === currentPlayer);
  });
}

// Record Game in History
function recordGame(result) {
  let stringDate = getNowLocalDateString();
  history.push(
    `${player1} vs ${player2}: ${result} at <span class="small"> ${stringDate}</span>`
  );
  localStorage.setItem("gameHistory", JSON.stringify(history));
  setTimeout(returnToMenu, 500);
}

function getNowLocalDateString() {
  let nowDate = Date(Date.now());
  let stringDate = nowDate.toLocaleString("en-US");
  return stringDate;
}

// View History
function viewHistory() {
  displayHistory();
  menu.style.display = "none";
  historyDiv.style.display = "block";
}

// Display History
function displayHistory() {
  gameHistoryList.innerHTML = "";
  history.forEach((game, index) => {
    const li = document.createElement("li");
    li.innerText = game;
    gameHistoryList.appendChild(li);
  });
}

// Clear History
function clearHistory() {
  history = [];
  localStorage.removeItem("gameHistory");
  displayHistory();
}

// Return to Menu
function returnToMenu() {
  game.style.display = "none";
  historyDiv.style.display = "none";
  menu.style.display = "block";
}

// Initialize Game
init();
