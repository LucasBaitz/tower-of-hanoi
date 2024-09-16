import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-gray-950 text-gray-300 flex align-middle items-center p-2 px-5 rounded-full">
      <p className="text-gray-400 text-xs md:text-sm">
        Created by{" "}
        <Link
          href="https://github.com/LucasBaitz"
          className="text-gray-200 hover:text-gray-100 underline"
        >
          Lucas Baitz
        </Link>
      </p>
      <p className="ml-2 text-xl">👋</p>
    </footer>
  );
};

export default Footer;
