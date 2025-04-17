import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// Import Halaman

import { DashboardPelaporPage } from "./component/pages/Pelapor/DashboardPelaporPage/DashboardPelaporPage";
import HomePelaporPage from "./component/pages/Pelapor/HomePelaporPage/HomePelaporPage";
import { ParkirLiarpage } from "./component/pages/Pelapor/MenuPelaporanPage/ParkirLiar/ParkirLiarpage";
import { PetugasLiarpage } from "./component/pages/Pelapor/MenuPelaporanPage/PetugasLiar/PetugasLiarpage";
import { EditProfileUser } from "./component/pages/Pelapor/EditProfileUserPage/EditProfileUser";
import { LoginPage } from "./component/pages/auth/LoginPage/LoginPage";
import { RegisterPage } from "./component/pages/auth/RegisterPage/RegisterPage";
import { ToastNotif } from "./component/bases/Toast/ToastNotif";
import ProtectedRoute from "./content/ProtectedRoute";
import DataDisplay from "./component/Section/test";
import axios from "axios";
import { Test } from "./component/Section/test2";
import { Test3 } from "./component/Section/test3";
import { AdminHomeView } from "./component/pages/Admin/Home/AdminHomeView";
import { AdminLayout } from "./component/Layout/adminLayout";
import { DetailPetugasliarPage } from "./component/pages/Pelapor/DetailPelaporanUserPage/Petugasliar/DetailPetugasliarPage";
import { DetailParkirliarPage } from "./component/pages/Pelapor/DetailPelaporanUserPage/Parkirliar/DetailParkirliarPage";
import { AdminParkirLiarPage } from "./component/pages/Admin/Pelaporan/ParkirLiar/AdminParkirLiarPage";
import { AdminPetugasLiarPage } from "./component/pages/Admin/Pelaporan/PetugasLiar/AdminPetugasLiarPage";
import { AdminProfile } from "./component/pages/Admin/Profil/AdminProfile";
import { LandingPage } from "./component/pages/LandingPage/LandingPage";
import { AdmindetailParkirLiarPage } from "./component/pages/Admin/DetailPelaporan/ParkirLiar/AdmindetailParkirLiarPage";
import { AdmindetailPetugasLiarPage } from "./component/pages/Admin/DetailPelaporan/PetugasLiar/AdmindetailPetugasLiarPage";
import { SIgnInPage } from "./component/pages/Authorization/Sign_In/SIgnInPage";
import { SIgnUpPage } from "./component/pages/Authorization/Sign_Up/SIgnUpPage";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SIgnInPage />,
  },
  {
    path: "/register",
    element: <SIgnUpPage />,
  },
  // User Dashboard
  {
    path: "/user dashboard",
    element: (
      <ProtectedRoute requiredRole="user">
        <DashboardPelaporPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user dashboard/home",
    element: (
      <ProtectedRoute requiredRole="user">
        <HomePelaporPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user dashboard/parkir liar",
    element: (
      <ProtectedRoute requiredRole="user">
        <ParkirLiarpage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user dashboard/parkir liar/detail/:id",
    element: (
      <ProtectedRoute requiredRole="user">
        <DetailParkirliarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user dashboard/petugas liar",
    element: (
      <ProtectedRoute requiredRole="user">
        <PetugasLiarpage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user dashboard/petugas liar/detail/:id",
    element: (
      <ProtectedRoute requiredRole="user">
        <DetailPetugasliarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user dashboard/edit profile",
    element: (
      <ProtectedRoute requiredRole="user">
        <EditProfileUser />
      </ProtectedRoute>
    ),
  },
  // Admin Routes
  {
    path: "/admin/home",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminHomeView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/parkir liar",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminParkirLiarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/petugas liar",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminPetugasLiarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit profile",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/parkir liar/detail/:id",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdmindetailParkirLiarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/petugas liar/detail/:id",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdmindetailPetugasLiarPage />
      </ProtectedRoute>
    ),
  },
  // Test Routes
  {
    path: "/test",
    element: <ToastNotif />,
  },
  {
    path: "/DataDisplay",
    element: <DataDisplay />,
  },
  {
    path: "/DataDisplay2",
    element: <Test />,
  },
  {
    path: "/DataDisplay5",
    element: <Test3 />,
  },
  {
    path: "/DataDisplay3",
    element: <AdminLayout />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
