import { Reels } from './Reels';
import { useState, useEffect } from 'react';
import { GameApi } from "../api/game-api.ts";
import { SpinButton } from "./SpinButton.tsx";
import { CashOutButton } from "./CashOutButton.tsx";
import { Letter } from "../types/game.types.ts";
import { StartButton } from "./StartButton.tsx";

export const SlotMachine = () => {
    const [credits, setCredits] = useState(0);
    const [status, setStatus] = useState('initial');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [letters, setLetters] = useState<Letter[]>([]);
    useEffect(() => {
        setLoading(true);
        GameApi.currentState().then((result) => {
                setStatus(result.status);
                setCredits(result.credits);
            }
        ).catch((e) => {
            console.error(e);
            setMessage('Something went wrong')
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (status === 'initial') {
            setMessage('You can start the game.');
        } else if (status === 'playing') {
            setMessage('Move forward!');
        }
    }, [status]);


    return (
        <div className="container">
            <div className="slotMachine">
                <div className="credits">
                    Credits: {credits}
                </div>
                <Reels letters={letters} spinning={false}/>
                <div className="message">
                    {(spinning && 'Spinning...' ) || (loading && 'Loading...' ) || message }
                </div>
                <div>
                    <StartButton onStart={() => {
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
                    }} hidden={status !== 'initial'} disabled={loading} />
                    <CashOutButton hidden={status === 'initial'} onCashOut={() => {
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
                    }} disabled={loading}/>
                    <SpinButton onSpin={() => {
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
                    }} disabled={loading || status === 'initial'} spinning={spinning}/>
                </div>

            </div>
        </div>
    )
}