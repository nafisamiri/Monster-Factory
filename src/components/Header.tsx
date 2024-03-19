import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4 text-black">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Monster Factory</h1>
        </div>

        <Link
          href="https://github.com/nafisamiri/Monster-Factory"
          target="_blank"
          rel="noopender noreferrer"
        >
          <div className="flex items-center hover:bg-gray-200 p-2 rounded-md">
            <span className="mr-2">GitHub</span>
            <FaExternalLinkAlt className="text-xl" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
