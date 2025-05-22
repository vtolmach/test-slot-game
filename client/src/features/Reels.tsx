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
            const progress: (Letter | '?')[] = new Array<Letter>(3);
            progress.fill('?');
            setAnimatedLetters(progress);
            for (const index in letters) {
                await timeout(1000);
                progress[index] = letters[index];
                setAnimatedLetters([...progress]);
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