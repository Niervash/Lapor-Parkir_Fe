// src/components/pages/Pelapor/MenuPelaporanPage/ParkirLiar/ParkirLiarpage.js
import React from "react";
import PelaporLayout from "../../../../Layout/PelaporLayout";
import { ParkirLiar } from "../../../../Section/DashboardPelapor/Pelapor/parkirliar/ParkirLiar";

export const ParkirLiarpage = () => {
  return (
    <PelaporLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Parkir Liar"
      Breadcrumb="Dashboard"
      ParkirAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <ParkirLiar />
    </PelaporLayout>
  );
};
