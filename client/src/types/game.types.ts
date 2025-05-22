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
  [Letter.Watermelon]: 40,
};

export interface SpinResponse {
  letters: [Letter, Letter, Letter];
  win: boolean;
  reward: number;
  credits: number;
  status: GameStatus;
}

export interface CashOutResponse {
  status: GameStatus,
  credits: number,
  cachedOut: number
}

export interface CashOutResponse {
  status: GameStatus,
  credits: number,
  cachedOut: number
}

export interface StartResponse {
  status: GameStatus,
  credits: number
}

export interface StateResponse {
  status: GameStatus;
  credits: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export enum GameStatus {
  Initial = 'initial',
  Playing = 'playing',
  Started = 'started',
  Error = 'error',
}


