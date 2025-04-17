import React, { useState, useEffect } from "react";
import { AdminTablePetugasLiar } from "../../../../Fragment/Admin/AdminTable/PetugasLIar/AdminTablePetugasLiar";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";
import { StatsCardDashboard } from "../../../../Fragment/statistikCard/StatsCardDashboard";

import {
  DeleteLaporanPetugas,
  GetDataPetugas,
} from "../../../../../config/Admin/Pelaporan/PetugasLiar/PetugasLiar.admin";
import { GetItem } from "../../../../../config/SetItem";

export const AdminPetugasLiarSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ispetugasLiarModalOpen, setIsModalPetugasLiarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const { Id_Pengguna } = await GetItem();
      console.log(Id_Pengguna);
      const response = await GetDataPetugas();
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setToastMessage("Failed to fetch data");
      setToastType("error");
      setShowToast(true);
    }
  };
  const handleDelete = async (id) => {
    try {
      await DeleteLaporanPetugas(id);
      setData(data.filter((item) => item.id !== id));
      setToastMessage("Data deleted successfully");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting data:", error);
      setToastMessage("Failed to delete data");
      setToastType("error");
      setShowToast(true);
    }
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(
    (data && Array.isArray(data) ? data.length : 0) / itemsPerPage
  );
  const currentItems = (data && Array.isArray(data) ? data : []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalPetugas = () => {
    setIsModalPetugasLiarOpen(!ispetugasLiarModalOpen);
  };

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <StatsCardDashboard />
      <div className="mt-16">
        <AdminTablePetugasLiar
          items={currentItems}
          onModalToggle={handleModalToggle}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {/* Add Toast Component if needed */}
      {/* Example:
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={handleCloseToast}
      />
      */}
    </div>
  );
};
