import React from "react";
import PelaporLayout from "../../../Layout/PelaporLayout";
import HomeDashboard from "../../../Section/DashboardPelapor/Home/HomeDashboard";

const HomePelaporPage = () => {
  return (
    <PelaporLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Dashboard"
      Breadcrumb="Dashboard"
      DashboardAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <HomeDashboard />
    </PelaporLayout>
  );
};

export default HomePelaporPage;
