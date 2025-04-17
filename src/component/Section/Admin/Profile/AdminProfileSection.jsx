import React, { useState, useEffect } from "react";
import { ProfileBio } from "../../../Fragment/Admin/Profile/ProfilBio/ProfileBio";
import { ProfileBox } from "../../../Fragment/Admin/Profile/Profilbox/ProfileBox";
import { GetUserLoged } from "../../../../config/Auth/Auth";
import defaultProfile from "../../../../../public/Logo/profil.jpg";
export const AdminProfileSection = () => {
  const [cardsData, setCardsData] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUserLoged();
        setCardsData(result);
        setProfilePicture(result.foto_profil || defaultProfile);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error); // Set error state if something goes wrong
        setLoading(false); // Set loading to false even if there's an error
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (!cardsData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">No user data available.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full mx-auto mt-60">
        {/* Profil Box */}
        <ProfileBox
          foto_profil={defaultProfile}
          nama={cardsData.nama}
          role={cardsData.role}
        />
      </div>
      <div className="w-full p-6 mx-auto">
        {/* Bio Profil */}
        <ProfileBio
          nama={cardsData.nama}
          email={cardsData.email}
          jenis_kelamin={cardsData.jenis_kelamin}
          username={cardsData.username}
          role={cardsData.role}
        />
      </div>
    </div>
  );
};
