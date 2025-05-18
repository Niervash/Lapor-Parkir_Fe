import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { AdminDetailBoxPetugas } from "../../../../Fragment/Admin/DetailTable/DetailBox/AdminDetailboxPetugas/AdminDetailBoxPetugas";
import logo from "../../../../../../public/assets/img/carousel-1.jpg";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  DeleteLaporanPetugas,
  GetDetailPetugas,
} from "../../../../../config/Admin/Pelaporan/PetugasLiar/PetugasLiar.admin";
import { useNavigate } from "react-router-dom";
import {
  ApprovePetugas,
  RejectPetugas,
} from "../../../../../config/Admin/Detail/buttonFunction";

// Toast notification component
const ToastNotification = ({ message, type, onClose }) => {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`${bgColor[type]} text-white px-6 py-3 rounded-md shadow-lg flex items-center justify-between min-w-64`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

// Confirmation modal component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-md ${confirmColor} hover:opacity-90`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const MapWithCenter = ({ latitude, longitude }) => {
  const map = useMap();
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.flyTo([latitude, longitude], 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [latitude, longitude, map]);
  return null;
};
export const AdminDetailPetugasLiarSection = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetDetailPetugas(id);
        setItem(response.data || {});
        toast.success("Fetching berhasil!");
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };
  const openModal = (action) => {
    let config = {};
    switch (action) {
      case "approve":
        config = {
          title: "Setujui Laporan",
          message: "Apakah anda yakin igin menerima pelaporan ini ?",
          confirmText: "Approve",
          confirmColor: "bg-green-500",
          onConfirm: ApproveFunc,
        };
        break;
      case "reject":
        config = {
          title: "Laporan Ditolak",
          message: "Apakah anda yakin igin menolak pelaporan ini ?",
          confirmText: "Reject",
          confirmColor: "bg-red-500",
          onConfirm: RejectFunc,
        };
        break;
      case "delete":
        config = {
          title: "Konfirmasi Hapus",
          message: "Apakah Anda yakin ingin menghapus data parkir liar ini?",
          confirmText: "Delete",
          confirmColor: "bg-red-600",
          onConfirm: DeleteFunc,
        };
        break;
      default:
        return;
    }
    setModalConfig(config);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const ApproveFunc = async () => {
    try {
      await ApprovePetugas(item.id, { status_post: "Approve" });
      showNotification("Status successfully changed to Approve", "success");
      closeModal();
      setTimeout(refreshPage, 100); // Refresh after 1.5 seconds
    } catch (error) {
      console.error("Failed to change status", error);
      showNotification("Failed to change status", "error");
      closeModal();
    }
  };

  const RejectFunc = async () => {
    console.log(item.id);
    try {
      await RejectPetugas(item.id, { status_post: "Reject" });
      showNotification("Status successfully changed to Reject", "success");
      closeModal();
      setTimeout(refreshPage, 100); // Refresh after 1.5 seconds
    } catch (error) {
      console.error("Failed to change status", error);
      showNotification("Failed to change status", "error");
      closeModal();
    }
  };

  const DeleteFunc = async () => {
    try {
      // Replace with your actual delete function
      // await DeleteParkir(id_k);
      await DeleteLaporanPetugas(item.id);
      showNotification("Report successfully deleted", "success");
      closeModal();
      setTimeout(() => navigate(-1), 1500); // Go back after 1.5 seconds
    } catch (error) {
      console.error("Failed to delete report", error);
      showNotification("Failed to delete report", "error");
      closeModal();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-center">Data tidak ditemukan</p>
      </div>
    );
  const latitude = item?.latitude ?? null;
  const longitude = item?.longitude ?? null;
  return (
    <div className="w-full px-6 mx-auto">
      {notification && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmColor={modalConfig.confirmColor}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-wrap mt-6 -mx-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Map Section */}
        <div className="w-full max-w-full px-3 lg:flex-none  mt-2 z-0">
          <div className="flex-auto p-4 rounded-2xl border-0 shadow-2xl bg-white">
            <h1 className="ml-5 mb-3 font-bold text-gray-500">MAPS</h1>
            {latitude !== null && longitude !== null ? (
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                className="h-96 rounded-2xl shadow-md"
              >
                <MapWithCenter latitude={latitude} longitude={longitude} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>Lokasi Pelanggaran " {[latitude, longitude]} "</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-gray-500 text-center">
                Koordinat tidak tersedia
              </p>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-full px-3 lg:flex-none mt-2">
          <div className="flex-auto p-4 rounded-2xl border-0 shadow-2xl bg-white">
            <h1 className=" ml-5 mb-3 font-bold text-gray-500 ">
              BUKTI PELANGGARAN
            </h1>
            {item.bukti ? (
              <img
                src={item.bukti}
                alt="Bukti Pelanggaran"
                className="h-96 w-full object-contain rounded-2xl shadow-md"
              />
            ) : (
              <p className="text-gray-500 text-center">
                Tidak ada bukti tersedia
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-4 pb-4 mx-auto">
        <AdminDetailBoxPetugas
          id_pl={item.id || "N/A"}
          akurasi={item.akurasi || "N/A"}
          nama={item.nama || "N/A"}
          identitas_petugas={item.identitas_petugas || "N/A"}
          tanggaldanwaktu={item.tanggaldanwaktu || "N/A"}
          latitude={latitude || "N/A"}
          longitude={longitude || "N/A"}
          lokasi={item.lokasi || "N/A"}
          status_post={item.status_post || "N/A"}
          status={item.status || "N/A"}
          hari={item.hari || "N/A"}
        />
      </div>
      <div className="w-full mt-4 pb-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border p-6">
          <div className="w-full max-w-full px-4 shrink-0 md:w-full md:flex-0">
            <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4">
              <button
                type="button"
                onClick={() => openModal("delete")}
                className="inline-block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-600 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => openModal("reject")}
                className="inline-block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => openModal("approve")}
                className="inline-block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
