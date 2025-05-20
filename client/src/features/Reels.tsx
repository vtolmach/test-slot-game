import { Letter } from '../types/game.types';
import '../App.css';
import { useEffect, useState } from "react";

export interface ReelsProps {
    letters: Letter[];
    spinning: boolean;
}

const timeout = ( time: number) => new Promise(resolve => setTimeout(resolve, time));

export const Reels = ({ letters = [] }: ReelsProps) => {

    const [animatedLetters, setAnimatedLetters] = useState<(Letter | '?')[]>([])
    useEffect(() => {

        const animate = async  ()=> {
            const letters_: (Letter | '?')[] = new Array<Letter>(3);
            letters_.fill('?');
            setAnimatedLetters(letters_);
            for (const index in letters) {
                await timeout(1000);
                letters_[index] = letters[index];
                setAnimatedLetters([...letters_]);
            }
        };
        animate();
    }, [letters]);


    return (
        <div className="reels">
            {animatedLetters.map((value, index) => (
                <div
                    key={index}
                    className={`reel`} >
                    {value}
                </div>
            ))}
        </div>
    );
};