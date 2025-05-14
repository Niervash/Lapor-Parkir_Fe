import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableParkirLiar } from "../../../../Fragment/Table/TableParkirLiar/TableParkirLiar";
import { Breadcrumbs } from "../../../../Fragment/BreadCrumbs/BreadCrumbs";
import { IoIosAdd } from "react-icons/io";
import { ButtonInput } from "../../../../bases/buttoninput/buttoninput";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";
import { ModalParkirLiar } from "../../../../Fragment/InputModal/ParkirLiar/ModalParkirLiar";
import { ToastNotif } from "../../../../bases/Toast/ToastNotif";
import { StatsCardDashboard } from "../../../../Fragment/statistikCard/StatsCardDashboard";
import { getAlldataParkir } from "../../../../../config/User/Pelaporan/ParkirLIar/ParkirLIar";
import { GetItem } from "../../../../../config/SetItem";

export const ParkirLiar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isparkirLiarModalOpen, setIsModalParkirLiarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // State untuk trigger refresh
  const itemsPerPage = 10;

  const fetchData = async () => {
    const { Id_Pengguna } = await GetItem();
    console.log(Id_Pengguna);
    try {
      const response = await getAlldataParkir(Id_Pengguna);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleSuccessSubmit = () => {
    setRefreshKey((prev) => prev + 1); // Trigger refresh
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

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

  const handleModalParkir = () => {
    setIsModalParkirLiarOpen(!isparkirLiarModalOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <StatsCardDashboard />
      <div className="mt-4">
        <ButtonInput
          text="Tambah Data"
          onClick={handleModalParkir}
          className="shadow-xl "
          icon={<IoIosAdd />}
        />
        {data.length > 0 ? (
          <>
            <TableParkirLiar
              items={currentItems}
              onModalToggle={handleModalToggle}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-gray-600 text-lg mb-2 mt-20">
              No data available
            </p>
            <p className="text-gray-500 text-sm">Please add new data.</p>
          </div>
        )}
        {showToast && (
          <ToastNotif
            message={toastMessage}
            type={toastType}
            onClose={handleCloseToast}
          />
        )}
        <ModalParkirLiar
          isOpen={isparkirLiarModalOpen}
          onClose={handleModalParkir}
          onSuccess={handleSuccessSubmit} // Kirim callback
        />
      </div>
    </div>
  );
};
