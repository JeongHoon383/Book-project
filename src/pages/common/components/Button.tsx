interface ButtonProps {
  text: string;
  size?: number;
  color?: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs border border-borderGray p-2 rounded-lg"
    >
      {text}
    </button>
  );
};
