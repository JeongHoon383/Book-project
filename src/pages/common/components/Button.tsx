interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm md:text-base border border-borderGray p-2 md:px-4 rounded-lg"
    >
      {text}
    </button>
  );
};
