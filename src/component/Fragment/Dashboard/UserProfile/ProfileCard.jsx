import React, { useEffect, useState } from "react";
import { StatsCardDashboard } from "../../statistikCard/StatsCardDashboard";
import { BioProfilView } from "../../ProfilBox/BioProfil/BioProfilView";
import { ProfilBoxView } from "../../ProfilBox/ProfilBoxview/ProfilBoxView";
import { EditButtonView } from "../../ProfilBox/EditButton/EditButtonView";
import defaultProfile from "../../../../../public/Logo/profil.jpg";
import { GetUserLoged } from "../../../../config/Auth/Auth";

export const ProfileCard = () => {
  const [cardsData, setCardsData] = useState(null);
  const [profilePicture, setProfilepicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUserLoged();
        setCardsData(result);
        setProfilepicture(result.foto_profil || defaultProfile);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-center">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full mx-auto mt-60 ">
        {/* Profil Box */}
        <ProfilBoxView
          foto_profil={profilePicture}
          nama={cardsData.nama}
          role={cardsData.role}
        />
      </div>
      <div className="w-full p-6 mx-auto">
        {/* Bio Profil */}
        <BioProfilView
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
