
export interface SpinButtonProps {
    onSpin: () => void;
    disabled: boolean;
    spinning: boolean;
}

export const SpinButton = ({ onSpin, disabled, spinning }: SpinButtonProps) => {
    return (
        <button
            className="button"
            onClick={onSpin}
            disabled={disabled}
        >
            {spinning ? 'Spinning...' : 'Pull Lever (1 credit)'}
        </button>
    );
}; 