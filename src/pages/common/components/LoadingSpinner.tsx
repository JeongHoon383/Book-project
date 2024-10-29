// components/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  size?: number; // 스피너 크기 조정
  color?: string; // 스피너 색상 조정
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = "#36d7b7",
}) => {
  return (
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
  );
};
