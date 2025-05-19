export enum Letter {
  Cherry = 'C',
  Lemon = 'L',
  Orange = 'O',
  Watermelon = 'W'
}

export const LETTER_REWARDS: Record<Letter, number> = {
  [Letter.Cherry]: 10,
  [Letter.Lemon]: 20,
  [Letter.Orange]: 30,
  [Letter.Watermelon]: 40
};

export interface SpinResult {
  letters: [Letter, Letter, Letter];
  win: boolean;
  reward: number;
  credits: number;
}
