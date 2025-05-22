import { useState } from 'react';
import { GameStatus, Letter } from '../types/game.types.ts';
import GameApi from '../api/game-api.ts';

export const StateController = () => {
  const [credits, setCredits] = useState(0);
  const [status, setStatus] = useState(GameStatus.Initial);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);

  const actionCurrent = () => {
    setLoading(true);
    GameApi.currentState().then((result) => {
        setStatus(result.status);
        setCredits(result.credits);
      }
    ).catch((e) => {
      console.error(e);
      setStatus(GameStatus.Error);
      setMessage('Something went wrong');
    }).finally(() => setLoading(false));
  }

  const actionStart = () => {
    setLoading(true);
    GameApi.start().then(result => {
      setCredits(result.credits);
      setStatus(result.status);
      setLetters([]);
      setMessage('Game started');
    }).catch((e) => {
      console.error(e);
      setMessage('Something went wrong')
    }).finally(
      () => setLoading(false)
    );
  }

  const actionCashOut = () => {
    setLoading(true);
    GameApi.cashOut().then(result => {
      setCredits(result.credits);
      setStatus(result.status);
      setLetters([]);
      setMessage(`You cached out: ${result.credits}`);
    }).catch((e) => {
      console.error(e);
      setMessage('Something went wrong')
    }).finally(
      () =>  setLoading(false)
    );
  }

  const actionSpin = () => {
    setLoading(true);
    setSpinning(true);
    GameApi.spin().then(result => {
      setLetters(result.letters);
      setTimeout(() => {
        if (result.win) {
          setMessage(`Your win: ${result.reward} credits`);
        } else {
          setMessage(`You was close! Move forward!`);
        }
        setCredits(result.credits);
        setStatus(result.status);
        setLoading(false);
        setSpinning(false);
      }, 3000);
    }).catch((e) => {
      console.error(e);
      setMessage('Something went wrong');
      setLoading(false);
      setSpinning(false);
    })
  }

  return {
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
    setMessage
  }

}