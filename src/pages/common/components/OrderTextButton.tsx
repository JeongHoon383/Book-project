interface OrderTextButtonProps {
  onClick: () => void;
}

export const OrderTextButton: React.FC<OrderTextButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="text-sm md:text-base py-2 w-full bg-green-500 text-white rounded-lg"
    >
      바로구매
    </button>
  );
};
