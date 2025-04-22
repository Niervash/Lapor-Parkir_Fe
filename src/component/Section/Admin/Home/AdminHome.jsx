import React, { useState, useEffect } from "react";
import { DetailBoxPetugas } from "../../../Fragment/DetailUser/DetailBox/DetailboxPetugas/DetailBoxPetugas";
import { StatsCardDashboard } from "../../../Fragment/statistikCard/StatsCardDashboard";
import { AdminOverviewCard } from "../../../Fragment/Admin/OverviewCardAdmin/AdminOverviewCard";
import defaultProfile from "../../../../../public/Logo/profil.jpg";
import { GetUserLoged } from "../../../../config/Auth/Auth";

export const AdminHome = () => {
  const [cardsData, setCardsData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUserLoged();
        setCardsData(result);
        if (result?.profilePicture) {
          setProfilePicture(result.profilePicture);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 mx-auto">
      {/* Start Content Here */}
      <div className="ml-0 mr-0 mt-4 pt-10 md:pb-10 pb:-6 relative flex flex-col flex-auto min-w-0 p-4 mx-6 overflow-hidden break-words bg-indigo-200 border-0 shadow-3xl rounded-2xl bg-clip-border">
        <div className="flex flex-wrap -mx-3 md:ml-4 ml-1">
          {/* Profil Picture */}
          <div className="flex-none w-auto max-w-full px-3">
            <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-19 w-19 rounded-xl">
              <img
                src={defaultProfile}
                alt="profile_image"
                className="w-full shadow-2xl rounded-xl"
              />
            </div>
          </div>
          {/* Profil Name */}
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="mb-1 font-bold">{cardsData?.nama}</h5>
              <p className="mb-0 font-semibold leading-normal text-sm">
                {cardsData?.role}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
            <div className="relative right-0"></div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 pb-4 mx-auto">
        {/* Main Content */}
        <div className="mb-4">
          <StatsCardDashboard />
        </div>
        <div className="ml-2 mt-6">
          {/* <p className="leading-normal font-bold uppercase text-sm mb-6">
            OVERVIEW
          </p> */}
          {/* Card Content */}
          {/* <AdminOverviewCard /> */}
        </div>
      </div>
    </div>
  );
};
