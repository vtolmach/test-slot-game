
export interface StartButtonProps {
    onStart: () => void;
    hidden: boolean;
    disabled: boolean;
}

export const StartButton = ({ onStart, hidden, disabled }: StartButtonProps) => {
    return (
        (!hidden && <button
            className="button startButton"
            onClick={onStart}
            disabled={disabled}
        >Start Game</button>)
    );
};