import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { IsLogout } from "../../../config/network-data";

export const SpeedDial = ({ setIsLoggedIn }) => {
  const handleLogout = async () => {
    try {
      const response = await IsLogout();
      console.log(response);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed end-4 bottom-4 sm:end-6 sm:bottom-6 group">
      <button
        type="button"
        onClick={handleLogout}
        className="flex justify-center rounded-full items-center w-12 h-12 sm:w-[52px] sm:h-[52px] text-sky-600 hover:text-white bg-white dark:bg-gray-700 drop-shadow-md dark:text-white dark:hover:bg-slate-600 hover:bg-sky-500 dark:hover:text-white focus:outline-none"
      >
        <FaPowerOff size={20} className="sm:text-lg" />
        <span className="sr-only">Logout</span>
      </button>
    </div>
  );
};
