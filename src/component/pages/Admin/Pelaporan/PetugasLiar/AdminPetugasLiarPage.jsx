import React from "react";
import { AdminLayout } from "../../../../Layout/adminLayout";
import { AdminPetugasLiarSection } from "../../../../Section/Admin/Pelaporan/PetugasLiar/AdminPetugasLiarSection";

export const AdminPetugasLiarPage = () => {
  return (
    <AdminLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Petugas Liar"
      Breadcrumb="Admin"
      PetugasAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <AdminPetugasLiarSection />
    </AdminLayout>
  );
};
