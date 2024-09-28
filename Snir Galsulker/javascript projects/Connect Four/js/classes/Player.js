class Player {
  constructor(name, wins) {
    this.name = name;
    this.wins = wins;
  }
  toJSON() {
    return {
      name: this.name,
      wins: this.wins,
    };
  }
  addWin() {
    this.wins++;
  }
}

export default Player;
