import React from "react";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-gray-500 hover:text-gray-700">
      ✕
    </button>
  );
};
