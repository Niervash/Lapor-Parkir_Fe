import React from "react";
import PelaporLayout from "../../../../Layout/PelaporLayout";
import { DetailPetugasSection } from "../../../../Section/DashboardPelapor/Detail/DetailPetugas/DetailPetugasSection";

export const DetailPetugasliarPage = () => {
  return (
    <PelaporLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Detail"
      Breadcrumb="Petugas Liar"
      PetugasAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <DetailPetugasSection />
    </PelaporLayout>
  );
};
