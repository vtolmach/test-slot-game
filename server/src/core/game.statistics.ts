import { SpinResult } from './game.types';

interface StatGame {
  gameId: number;
  wins: SpinResult[];
  spins: number;
  rerols: number;
  withdrawn: number;
}

export default class GameStatistics {
  public wins: SpinResult[] = [];
  public spins: number = 0;
  public withdrawn: number = 0;
  public rerols: number = 0;
  public gameId: number = 0;
  public games: StatGame[] = [];
  constructor() {
  }

  endGame() {
    this.games.push({
      gameId: this.gameId,
      wins: this.wins,
      spins: this.spins,
      rerols: this.rerols,
      withdrawn: this.withdrawn
    });
    this.gameId = 0;
    this.spins = 0;
    this.rerols = 0;
    this.wins = [];
    this.withdrawn = 0;
  }

  report() {

    let bets = 0;
    let rerols = 0;
    let rewards = 0;
    let withdrawn = 0;
    for (let game of this.games) {
      bets += game.spins;
      rerols += game.rerols;
      withdrawn += game.withdrawn;
      for ( let win of game.wins ) {
        rewards += win.reward;
      }
    }

    return {
      totalGames: this.games.length,
      totalBets: bets,
      totalRewards: rewards,
      totalWithdrawn: withdrawn,
      totalRerols: rerols,
      total: bets - withdrawn
    }
  }
}