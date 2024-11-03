import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableParkirLiar } from "../../../../Fragment/Table/TableParkirLiar/TableParkirLiar";
import { Breadcrumbs } from "../../../../Fragment/BreadCrumbs/BreadCrumbs";
import { IoIosAdd } from "react-icons/io";
import { ButtonInput } from "../../../../bases/buttoninput/buttoninput";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";
import { ModalParkirLiar } from "../../../../Fragment/InputModal/ParkirLiar/ModalParkirLiar";

export const ParkirLiar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isparkirLiarModalOpen, setIsModalParkirLiarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = JSON.parse(sessionStorage.getItem("user")); // Ambil userId dari session
  const idPengunna = user ? user.idPengguna : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!idPengunna) {
        console.error("No user ID found in session.");
        return; // Exit if userId is not available
      }

      try {
        const response = await axios.get(
          `https://laporparkir-application.onrender.com/parkir/${idPengunna}`
        );
        console.log(response);
        console.log(response.data); // Log untuk memeriksa hasil
        if (response.data && response.data.data) {
          setData(response.data.data); // Set data jika tersedia
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idPengunna]);

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

  const breadcrumbItems = [
    { label: "Dashboard" },
    { label: "Parkir Liar", link: "#" },
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
        <TableParkirLiar
          items={currentItems}
          onModalToggle={handleModalToggle}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ModalParkirLiar
          isOpen={isparkirLiarModalOpen}
          onClose={handleModalParkir}
        />
      </div>
    </div>
  );
};
