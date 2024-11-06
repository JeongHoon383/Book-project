interface OrderTextButtonProps {
  onClick: () => void;
}

export const OrderTextButton: React.FC<OrderTextButtonProps> = ({
  onClick,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="px-4 py-2 w-full bg-green-500 text-white rounded"
      >
        바로구매
      </button>
    </div>
  );
};
