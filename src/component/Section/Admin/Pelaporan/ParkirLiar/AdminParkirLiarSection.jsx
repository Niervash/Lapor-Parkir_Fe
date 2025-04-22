import React, { useState, useEffect } from "react";
import { StatsCardDashboard } from "../../../../Fragment/statistikCard/StatsCardDashboard";
import { AdminTableParkrLiar } from "../../../../Fragment/Admin/AdminTable/ParkirLIar/AdminTableParkrLiar";
import {
  DeleteLaporanParkir,
  GetDataParkir,
} from "../../../../../config/Admin/Pelaporan/ParkirLIar/ParkirLiar.admin";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";

export const AdminParkirLiarSection = ({ Id_Pengguna }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await GetDataParkir();
      console.log("awsd", response.data);
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
      await DeleteLaporanParkir(id);
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

  const currentItems =
    data && Array.isArray(data)
      ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <StatsCardDashboard />
      <div className="mt-16">
        <AdminTableParkrLiar
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
