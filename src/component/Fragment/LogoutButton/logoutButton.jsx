import React from "react";
import { ImExit } from "react-icons/im";
import Cookies from "js-cookie";
import { setLogout } from "../../../config/SetItem";

export const LogoutButton = () => {
  const handleLogout = () => {
    setLogout();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 sm:w-auto hover:text-red-700 focus:ring-gray-100"
    >
      <ImExit className="mr-2" /> Logout
    </button>
  );
};
