

export interface CashOutButtonProps {
    onCashOut: () => void;
    disabled: boolean;
    hidden: boolean
}

export const CashOutButton = ({ onCashOut, disabled, hidden }: CashOutButtonProps) => {
    return (
        (!hidden && <button
            className="button dangerButton"
            onClick={onCashOut}
            disabled={disabled}
        > Cash Out </button>)
    );
};