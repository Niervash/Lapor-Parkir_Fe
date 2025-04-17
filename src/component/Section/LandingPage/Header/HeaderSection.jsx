import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { GetItem } from "../../../../config/SetItem";

export const HeaderSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Tokens, setUserToken] = useState("");
  const [role, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Tokens, role } = await GetItem();
        if (Tokens) {
          setIsLoggedIn(true);
          setUserRole(role);
          setUserToken(Tokens);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Panggil function
  }, []);

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      if (role === "user") {
        navigate("/user dashboard/home");
      } else if (role === "admin") {
        navigate("/admin/home");
      }
    } else {
      console.error("User is not logged in");

      navigate("/login");
    }
  };

  return (
    <header className="fixed w-full z-50 shadow-lg">
      <nav className="bg-white border-gray-200 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Lapor <span className="text-blue-500">Parkir</span>
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="flex text-white bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
                >
                  <div className="flex items-center ">
                    <MdDashboard className="mr-2" />
                    <span className="font-semibold">Dashboard</span>
                  </div>
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="flex text-white bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none"
              >
                Sign In
              </Link>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#home"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
