import React from "react";
import { AdminLayout } from "../../../Layout/adminLayout";
import { AdminPetugasLiarSection } from "../../../Section/Admin/Pelaporan/PetugasLiar/AdminPetugasLiarSection";
import { AdminProfileSection } from "../../../Section/Admin/Profile/AdminProfileSection";

export const AdminProfile = () => {
  return (
    <AdminLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68"
      LabelsBreadcrumb="Profile"
      Breadcrumb="Admin"
      ProfilAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <AdminProfileSection />
    </AdminLayout>
  );
};
