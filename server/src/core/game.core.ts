import { Letter, LETTER_REWARDS, SpinResult } from './game.types';

export default class GameCore {

  private static readonly STARTING_CREDITS = 10;
  private static readonly MEDIUM_THRESHOLD = 40;
  private static readonly HIGH_THRESHOLD = 60;
  private static readonly MEDIUM_REROLL_CHANCE = 0.3;
  private static readonly HIGH_REROLL_CHANCE = 0.6;
  private _credits: number = 0;
  private readonly LETTERS = Object.values(Letter);
  private cheat: boolean;
  private _rerols: number = 0;


  constructor(credits: number, cheat = true) {
    this.credits = credits;
    this.cheat = cheat;
  }

  public set credits(credits: number) {
    if (credits < 0) {
      throw new Error('Insufficient credits');
    }
    this._credits = credits;
  }

  public get credits(): number {
    return this._credits;
  }

  public get rerols(): number {
    return this._rerols;
  }

  private getRandomLetter(): Letter {
    const randomIndex = Math.floor(Math.random() * this.LETTERS.length);
    return this.LETTERS[randomIndex];
  }

  private generateLetters(): [Letter, Letter, Letter] {
    return [
      this.getRandomLetter(),
      this.getRandomLetter(),
      this.getRandomLetter()
    ];
  }

  private shouldReroll(): boolean {
    if (this.credits > GameCore.HIGH_THRESHOLD) {
      return Math.random() < GameCore.HIGH_REROLL_CHANCE;
    }
    if (this.credits > GameCore.MEDIUM_THRESHOLD) {
      return Math.random() < GameCore.MEDIUM_REROLL_CHANCE;
    }
    return false;
  }

  private calculateReward(letters: [Letter, Letter, Letter]): number {
    if (letters[0] === letters[1] && letters[1] === letters[2]) {
      return LETTER_REWARDS[letters[0]];
    }
    return 0;
  }

  public spin(): SpinResult {
    this.credits -= 1;
    let letters = this.generateLetters();
    let reward = this.calculateReward(letters);

    if(this.cheat) {
      while (reward > 0 && this.shouldReroll()) {
        this._rerols++;
        letters = this.generateLetters();
        reward = this.calculateReward(letters);
      }
    }

    if (reward > 0) {
      this.credits += reward;
    }

    return {
      letters,
      win: reward > 0,
      reward,
      credits: this.credits
    };
  }

}