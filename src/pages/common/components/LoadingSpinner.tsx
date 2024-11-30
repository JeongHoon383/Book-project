import React from "react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  centered?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = "#36d7b7",
  centered = false,
}) => {
  return (
    <div
      className={`${
        centered
          ? "fixed inset-0 flex items-center justify-center z-50"
          : "flex justify-center items-center"
      }`}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `${size * 0.1}px solid ${color}`,
          borderTop: `${size * 0.1}px solid transparent`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
