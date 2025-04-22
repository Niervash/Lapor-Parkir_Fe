import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../../Fragment/BreadCrumbs/BreadCrumbs";
import { ButtonInput } from "../../../../bases/buttoninput/buttoninput";
import { IoIosAdd } from "react-icons/io";
import { Petugaspetugasliar } from "../../../../Fragment/Table/TablePetugasParkir/Petugaspetugasliar";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";
import { ModalPetugasLiar } from "../../../../Fragment/InputModal/PetugasLiar/ModalPetugasLiar";
import { PaginationPages } from "../../../../../config/Common-Function";
import { ToastNotif } from "../../../../bases/Toast/ToastNotif";
import { StatsCardDashboard } from "../../../../Fragment/statistikCard/StatsCardDashboard";
import { GetDataPetugas } from "../../../../../config/User/Pelaporan/PetugasLIar/PetugasLiar";
import { GetItem } from "../../../../../config/SetItem";
import { FaSearch } from "react-icons/fa";

export const PetugasLiar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ispetugasLiarModalOpen, setIsModalPpetugasLiarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchData = async () => {
    const { Id_Pengguna } = await GetItem();
    try {
      const response = await GetDataPetugas(Id_Pengguna);
      console.log(response.data.rows);
      setData(response.data.rows);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
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

  const handleModalpetugas = () => {
    setIsModalPpetugasLiarOpen(!ispetugasLiarModalOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 text-lg mb-2">No results found</p>
        <FaSearch />
        <p className="text-gray-500 text-sm">Try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <StatsCardDashboard />
      <div className="mt-4">
        <ButtonInput
          text="Tambah Data"
          onClick={handleModalpetugas}
          className="shadow-xl"
          icon={<IoIosAdd />}
        />
        {data.length > 0 ? (
          <>
            <Petugaspetugasliar
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
        <ModalPetugasLiar
          isOpen={ispetugasLiarModalOpen}
          onClose={handleModalpetugas}
        />
      </div>
    </div>
  );
};
