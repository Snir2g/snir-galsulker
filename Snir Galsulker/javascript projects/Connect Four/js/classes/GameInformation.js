class GameInformation {
  constructor(playerA, playerB, lastWinner) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.lastWinner = lastWinner;
  }

  toJSON() {
    return {
      playerA: this.playerA,
      playerB: this.playerB,
      lastWinner: this.lastWinner,
    };
  }
}

export default GameInformation;
