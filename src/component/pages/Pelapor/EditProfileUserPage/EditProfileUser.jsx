import React from "react";
import PelaporLayout from "../../../Layout/PelaporLayout";
import { ProfileCard } from "../../../Fragment/Dashboard/UserProfile/ProfileCard";

export const EditProfileUser = () => {
  return (
    <PelaporLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68"
      LabelsBreadcrumb="Profile"
      Breadcrumb="Dashboard"
      ProfilAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <ProfileCard />
    </PelaporLayout>
  );
};
