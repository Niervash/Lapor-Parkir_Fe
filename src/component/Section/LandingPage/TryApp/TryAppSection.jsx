import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GetItem } from "../../../../config/SetItem";

export const TryAppSection = () => {
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

    fetchData(); // Call the function
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
    <section className="bg-whites">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
            Lapor Sekarang
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg">
            Lapor Parkir Merupakan Platform Pelaporan Parkir Liar,
            <br /> Coba sekarang.
          </p>
          {isLoggedIn ? (
            <button
              onClick={handleDashboardClick}
              className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              <div className="flex items-center">
                <MdDashboard className="mr-2" />
                <span className="font-semibold">Dashboard</span>
              </div>
            </button>
          ) : (
            <Link
              type="button"
              to={"/login"}
              className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
