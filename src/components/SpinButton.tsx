interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSpinning: boolean;
}

export default function SpinButton({ onClick, disabled, isSpinning }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-10 py-3 rounded-full text-lg font-bold text-white
        transition-all transform
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed scale-95"
            : "bg-gray-900 hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        }
        ${isSpinning ? "animate-pulse" : ""}
      `}
    >
      {isSpinning ? "Draait..." : "Draai!"}
    </button>
  );
}
