import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableParkirLiar } from "../../../../Fragment/Table/TableParkirLiar/TableParkirLiar";
import { Breadcrumbs } from "../../../../Fragment/BreadCrumbs/BreadCrumbs";
import { IoIosAdd } from "react-icons/io";
import { ButtonInput } from "../../../../bases/buttoninput/buttoninput";
import { Pagination } from "../../../../bases/Dashboard/Pagination/Pagination";
import { ModalParkirLiar } from "../../../../Fragment/InputModal/ParkirLiar/ModalParkirLiar";
import { ToastNotif } from "../../../../bases/Toast/ToastNotif";
import { getAlldataParkir } from "../../../../../config/network-data";

export const ParkirLiar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isparkirLiarModalOpen, setIsModalParkirLiarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const user = JSON.parse(sessionStorage.getItem("user")); // Ambil userId dari session
  const userId = user ? user.idPengguna : null;

  const fetchData = async () => {
    if (userId) {
      try {
        const response = await getAlldataParkir(userId);
        setData(response);

        if (!error) {
          setToastMessage("Data berhasil ditambahkan!");
          setToastType("success");
          setShowToast(true);
        } else {
          setToastMessage(
            typeof data === "string"
              ? data
              : "Fetching data gagal. Silakan coba lagi."
          );
          setToastType("error");
          setShowToast(true);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setToastMessage("Failed to fetch data. Please try again later.");
        setToastType("error");
        setShowToast(true);
      }
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

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
        />
      </div>
    </div>
  );
};
