Tic-Tac-Toe

Overview
    Tic-Tac-Toe is a classic two-player game where players alternate marking spaces in a 3×3 grid. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins the game. This application allows two players to enter their names, play the game, and keep track of the game history.

Features
    Two-player Mode: Allows two players to enter their names and alternate turns.
    Game History: The game keeps a history of past games and displays them in a list.
    Local Storage: The game history is saved in the browser's local storage, so it persists across sessions.
    Clear History: Allows users to clear the game history.
    Responsive UI: The game adapts to different screen sizes and provides an intuitive interface.

How to Play
    Enter Player 1 and Player 2 names in the input fields.
    Click "Start Game" to begin.
    Players alternate turns clicking on the grid cells. Player 1 will play as "X" and Player 2 as "O".
    The game announces the winner once a player gets three marks in a row or declares a draw if no more moves are available.
    After the game, the result is stored in the history, and players can choose to view the history or start a new game.

File Structure
    HTML:
        Basic structure of the game and its menu.
        Divided into sections for the menu, game board, and game history.

    CSS (style.css):
        Provides styling for the Tic-Tac-Toe grid, menu, and history.
        Ensures responsive design and user-friendly layout.

    JavaScript (script.js):
        Handles game logic, including checking for a win or draw, switching players, and managing the game history.
        Utilizes localStorage for saving game history.

Installation & Setup
    Clone or download this repository.
    Open the index.html file in your browser to start playing the game.

Game Controls
    Start Game: Begins the game with the names entered.
    Back to Menu: Allows users to return to the menu from the game screen.
    View Game History: Displays a list of previous games with results.
    Clear History: Clears the stored game history.

Technologies Used
    HTML5
    CSS3
    JavaScript (ES6)
    Local Storage

Future Enhancements
    Implement an AI player for single-player mode.
    Add animations and sound effects.
    Allow users to select a custom grid size (e.g., 4x4, 5x5).

License
    This project is licensed under the MIT License. See the LICENSE file for more details.