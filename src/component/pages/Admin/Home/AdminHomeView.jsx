import React from "react";
import { AdminHome } from "../../../Section/Admin/Home/AdminHome";
import { AdminLayout } from "../../../Layout/adminLayout";

export const AdminHomeView = () => {
  return (
    <AdminLayout
      ClassName="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl"
      bgClass="bg-blue-500"
      LabelsBreadcrumb="Dashboard"
      Breadcrumb="Admin"
      DashboardAct="bg-blue-500/13 rounded-lg font-semibold "
    >
      <AdminHome />
    </AdminLayout>
  );
};
