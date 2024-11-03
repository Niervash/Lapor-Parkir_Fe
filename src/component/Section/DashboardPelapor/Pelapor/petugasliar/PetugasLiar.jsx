// File: src/components/pages/PetugasLiar/PetugasLiar.js
import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../../Fragment/BreadCrumbs/BreadCrumbs";
import { ButtonInput } from "../../../../bases/buttoninput/buttoninput";
import { IoIosAdd } from "react-icons/io";
import { Petugaspetugasliar } from "../../../../Fragment/Table/TablePetugasParkir/Petugaspetugasliar";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";
import { ModalPetugasLiar } from "../../../../Fragment/InputModal/PetugasLiar/ModalPetugasLiar";
import { PaginationPages } from "../../../../../config/Common-Function";
import { getAlldataPetugas } from "../../../../../config/network-data";

export const PetugasLiar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isparkirLiarModalOpen, setIsModalParkirLiarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mendapatkan userId dari session
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user ? user.id : null;

  const fetchData = async () => {
    if (userId) {
      try {
        const response = await getAlldataPetugas(userId);
        setData(response);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // Setup pagination
  const { totalPages, currentItems } = PaginationPages(
    data,
    currentPage,
    itemsPerPage
  );

  // Handle modal toggle
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle modal parkir liar toggle
  const handleModalParkir = () => {
    setIsModalParkirLiarOpen(!isparkirLiarModalOpen);
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Dashboard" },
    { label: "Petugas Liar", link: "#" },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mt-4">
        <ButtonInput
          text="Tambah Data"
          onClick={handleModalParkir}
          className="shadow-xl"
          icon={<IoIosAdd />}
        />
        <Petugaspetugasliar
          items={currentItems}
          onModalToggle={handleModalToggle}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ModalPetugasLiar
          isOpen={isparkirLiarModalOpen}
          onClose={handleModalParkir}
        />
      </div>
    </div>
  );
};
