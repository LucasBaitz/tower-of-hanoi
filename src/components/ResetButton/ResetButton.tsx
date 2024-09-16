import { RotateCcw } from "lucide-react";
import React, { useState } from "react";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  const [isRotated, setIsRotated] = useState<boolean>(false);

  const handleClick = () => {
    onClick();
    setIsRotated((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex align-middle bg-slate-800 bg-opacity-65 border-slate-950 items-center border rounded-xl p-2 mb-5 duration-150 hover:scale-110 ${
        isRotated ? "rotate-full" : "rotate-0"
      }`}
    >
      Reset
      <RotateCcw className="ml-2" />
    </button>
  );
};

export default ResetButton;
