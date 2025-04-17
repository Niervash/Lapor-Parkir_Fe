import React from "react";
import PelaporLayout from "../../../../Layout/PelaporLayout";
import { PetugasLiar } from "../../../../Section/DashboardPelapor/Pelapor/petugasliar/PetugasLiar";

export const PetugasLiarpage = () => {
  return (
    <PelaporLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Petugas Liar"
      Breadcrumb="Dashboard"
      PetugasAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <PetugasLiar />
    </PelaporLayout>
  );
};
