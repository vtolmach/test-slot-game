import GameCore from '../src/core/game.core';
import { SpinResult } from '../src/core/game.types';
import GameStatistics from '../src/core/game.statistics'

describe('game test ', () => {
  it('emulate basic usage', () => {

    let result: SpinResult;
    let game: GameCore;
    let statistics = new GameStatistics();
    for (let i = 0; i < 100; i++) {
      game = new GameCore(10);
      statistics.gameId = i + 1;
      while (game.credits > 0) {
        result = game.spin();
        statistics.spins++;
        if(result.credits == 0) {
          break;
        }
        if(result.win) {
          statistics.wins.push(result);
        }
      }
      statistics.rerols = game.rerols;
      statistics.endGame();
    }

    console.log(statistics.report());

    expect({}).toEqual({})
  });

  it('emulate usage with withdraw', () => {

    let result: SpinResult;
    let game: GameCore;
    let statistics = new GameStatistics();
    for (let i = 0; i < 1000; i++) {
      game = new GameCore(10);
      statistics.gameId = i + 1;
      while (game.credits > 0) {
        result = game.spin();
        statistics.spins++;
        if(result.credits == 0) {
          break;
        }
        if(result.win) {
          statistics.withdrawn = game.credits
          game.credits = 0;
          statistics.wins.push(result);
          break;
        }
      }
      statistics.rerols = game.rerols;
      statistics.endGame();
    }

    console.log(statistics.report());

    expect({}).toEqual({})
  });
});