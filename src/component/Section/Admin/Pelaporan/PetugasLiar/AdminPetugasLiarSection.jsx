import React, { useState, useEffect, useRef } from "react";
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
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 5;

  // State untuk popup
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Ref untuk interval dan data terakhir
  const pollingInterval = useRef(null);
  const lastUpdateTime = useRef(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Mulai polling saat komponen mount
    startPolling();

    return () => {
      window.removeEventListener("resize", handleResize);
      // Bersihkan interval saat komponen unmount
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const startPolling = () => {
    // Cek data setiap 10 detik
    pollingInterval.current = setInterval(fetchData, 2000);
  };

  const loadingButt = async () => {
    setIsLoading(true);
  };

  const fetchData = async () => {
    try {
      const { Id_Pengguna } = await GetItem();
      const response = await GetDataPetugas();

      // Jika ada data baru
      if (
        !lastUpdateTime.current ||
        new Date(response.lastUpdated) > new Date(lastUpdateTime.current)
      ) {
        // Update waktu terakhir update
        lastUpdateTime.current = response.lastUpdated;

        // Update state hanya jika benar-benar ada perubahan
        if (JSON.stringify(response.data) !== JSON.stringify(data)) {
          setData(response.data || []);

          // Tampilkan notifikasi jika ada data baru dan user tidak sedang melakukan operasi lain
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      if (!isDeleting) {
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await DeleteLaporanPetugas(itemToDelete);
      const newData = data.filter((item) => item.id !== itemToDelete);
      setData(newData);
      setPopupMessage("Data petugas liar berhasil dihapus!");
      setShowSuccessPopup(true);

      // Reset ke halaman sebelumnya jika data di halaman kosong
      if (newData.length > 0 && currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setPopupMessage("Gagal menghapus data petugas liar");
      setShowErrorPopup(true);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    // Fetch data pertama kali
    fetchData();
    loadingButt();
  }, []);

  const totalPages = Math.ceil(
    (data && Array.isArray(data) ? data.length : 0) / itemsPerPage
  );
  const currentItems = (data && Array.isArray(data) ? data : []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full px-4 sm:px-6 py-4 mx-auto relative min-h-[300px]">
      {/* Background blur ketika popup aktif */}
      {(showDeleteConfirm || showSuccessPopup || showErrorPopup) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      <StatsCardDashboard />

      <div className="mt-8 sm:mt-12 overflow-x-auto">
        <div className="min-w-full">
          {/* Loading State */}
          {isLoading && !isDeleting ? (
            <div className="flex flex-col items-center justify-center py-36">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Memuat data petugas liar...</p>
            </div>
          ) : /* Empty State */
          data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Tidak ada data
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-md px-4">
                Belum ada data petugas liar yang tercatat. Data akan muncul di
                sini setelah ada laporan.
              </p>
              <button
                onClick={loadingButt}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Coba Muat Ulang
              </button>
            </div>
          ) : (
            <>
              <AdminTablePetugasLiar
                items={currentItems}
                isMobile={isMobile}
                onModalToggle={() => setIsModalOpen(!isModalOpen)}
                onDelete={handleDeleteClick}
              />

              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  isMobile={isMobile}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popup Konfirmasi Delete - Responsive */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white rounded-lg shadow-xl p-6 w-full ${
              isMobile ? "max-w-xs" : "max-w-md"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                } bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4`}
              >
                <svg
                  className={`${
                    isMobile ? "w-8 h-8" : "w-10 h-10"
                  } text-red-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <h3
                className={`${
                  isMobile ? "text-md" : "text-lg"
                } font-medium text-gray-900 mb-2 text-center`}
              >
                Konfirmasi Hapus
              </h3>
              <p
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } text-gray-600 text-center mb-4 sm:mb-6`}
              >
                Apakah Anda yakin ingin menghapus data petugas liar ini?
              </p>
              <div className="flex space-x-3 sm:space-x-4 w-full">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50`}
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50`}
                >
                  {isDeleting ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Sukses - Responsive */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white rounded-lg shadow-xl p-6 w-full ${
              isMobile ? "max-w-xs" : "max-w-md"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                } bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4`}
              >
                <svg
                  className={`${
                    isMobile ? "w-8 h-8" : "w-10 h-10"
                  } text-green-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3
                className={`${
                  isMobile ? "text-md" : "text-lg"
                } font-medium text-gray-900 mb-2 text-center`}
              >
                {popupMessage.includes("baru") ? "Data Baru!" : "Berhasil!"}
              </h3>
              <p
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } text-gray-600 text-center mb-4 sm:mb-6`}
              >
                {popupMessage}
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className={`${
                  isMobile ? "px-4 py-1.5 text-sm" : "px-4 py-2"
                } w-full sm:w-auto bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Error - Responsive */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white rounded-lg shadow-xl p-6 w-full ${
              isMobile ? "max-w-xs" : "max-w-md"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                } bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4`}
              >
                <svg
                  className={`${
                    isMobile ? "w-8 h-8" : "w-10 h-10"
                  } text-red-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h3
                className={`${
                  isMobile ? "text-md" : "text-lg"
                } font-medium text-gray-900 mb-2 text-center`}
              >
                Gagal!
              </h3>
              <p
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } text-gray-600 text-center mb-4 sm:mb-6`}
              >
                {popupMessage}
              </p>
              <button
                onClick={() => {
                  setShowErrorPopup(false);
                  fetchData();
                }}
                className={`${
                  isMobile ? "px-4 py-1.5 text-sm" : "px-4 py-2"
                } w-full sm:w-auto bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors`}
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
