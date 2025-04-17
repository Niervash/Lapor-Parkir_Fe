import React from "react";
import PelaporLayout from "../../../../Layout/PelaporLayout";
import { DetailParkirSection } from "../../../../Section/DashboardPelapor/Detail/DetailParkir/DetailParkirSection";

export const DetailParkirliarPage = () => {
  
  return (
    <PelaporLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Detail"
      Breadcrumb="Parkir Liar"
      ParkirAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <DetailParkirSection />
    </PelaporLayout>
  );
};
