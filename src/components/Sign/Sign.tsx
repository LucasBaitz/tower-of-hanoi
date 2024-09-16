import React, { ReactNode } from "react";

interface SignProps {
  show: boolean;
  message: string | ReactNode;
}

const Sign: React.FC<SignProps> = ({ show, message }) => {
  const top = show ? "top-[20%]" : "top-[-1200px]";

  return (
    <div
      className={`absolute ${top} left-1/2 transform -translate-x-1/2 bg-green-500 border border-green-700   flex items-center justify-center text-2xl text-white rounded-lg shadow-lg transition-top duration-500 ease-in-out z-20`}
    >
      {message}
    </div>
  );
};

export default Sign;
