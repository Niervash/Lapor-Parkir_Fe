import React from "react";
import { AdminLayout } from "../../../../Layout/adminLayout";
import { AdminParkirLiarSection } from "../../../../Section/Admin/Pelaporan/ParkirLiar/AdminParkirLiarSection";

export const AdminParkirLiarPage = () => {
  return (
    <AdminLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Parkir Liar"
      Breadcrumb="Admin"
      ParkirAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <AdminParkirLiarSection />
    </AdminLayout>
  );
};
