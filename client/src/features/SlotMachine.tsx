import { Reels } from './Reels';
import { useEffect } from 'react';
import { SpinButton } from './SpinButton.tsx';
import { CashOutButton } from './CashOutButton.tsx';
import { GameStatus } from '../types/game.types.ts';
import { StartButton } from './StartButton.tsx';
import { StateController } from './StateController.ts';

export const SlotMachine = () => {
  const {
    actionCurrent,
    actionStart,
    actionCashOut,
    actionSpin,
    credits,
    status,
    message,
    loading,
    spinning,
    letters,
    setMessage,
  } = StateController();

  useEffect(() => {
    actionCurrent();
  }, []);

  useEffect(() => {
    if (status === GameStatus.Initial) {
      setMessage('You can start the game.');
    } else if (status === GameStatus.Playing) {
      setMessage('Move forward!');
    }
  }, [status]);


  return (
    <div className="container">
      <div className="slotMachine">
        <div className="credits">
          Credits: {credits}
        </div>
        <Reels letters={letters} spinning={false} />
        <div className="message">
          {(spinning && 'Spinning...') || (loading && 'Loading...') || message}
        </div>
        <div>
          <StartButton onStart={() => {
            actionStart();
          }} hidden={status !== GameStatus.Initial} disabled={loading} />
          <CashOutButton hidden={ ![GameStatus.Started, GameStatus.Playing].includes(status)} onCashOut={() => {
            actionCashOut();
          }} disabled={loading} />
          <SpinButton onSpin={() => {
            actionSpin();
          }} disabled={loading || [GameStatus.Error, GameStatus.Initial].includes(status) } spinning={spinning} />
        </div>

      </div>
    </div>
  );
};