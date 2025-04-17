import React, { useEffect, useState } from "react";
import { IoLogIn } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import hero from "../../../../../public/Logo/hero.png";
import { LogoutButton } from "../../../Fragment/LogoutButton/logoutButton";
import { ImExit } from "react-icons/im";
import { GetItem } from "../../../../config/SetItem";

export const HomeSection = () => {
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
    <section className="bg-white" id="home">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Lapor Parkir Liar <br />
            dengan Mudah!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Platform ini memudahkan Anda untuk melaporkan kasus parkir liar di
            daerah Anda. Cukup isi form yang disediakan untuk memberikan
            informasi yang diperlukan.
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 sm:w-auto hover:text-blue-700 focus:ring-gray-100"
                  aria-label="Go to Dashboard"
                >
                  <CiLogin className="mr-2" /> Dashboard
                </button>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 sm:w-auto hover:text-blue-700 focus:ring-gray-100"
                  aria-label="Sign In"
                >
                  <CiLogin className="mr-2" /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200"
                  aria-label="Sign Up"
                >
                  <IoLogIn className="mr-2" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="Illustration of parking report system" />
        </div>
      </div>
    </section>
  );
};
