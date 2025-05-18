import React, { useEffect, useState, useRef } from "react";
import { formattedDateSet } from "../../../../../../config/Common-Function";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  ApprovePetugas,
  RejectPetugas,
  DeletePetugas,
} from "../../../../../../config/Admin/Detail/buttonFunction";
import { useNavigate } from "react-router-dom";

export const AdminDetailBoxPetugas = ({
  id_pl,
  identitas_petugas,
  nama,
  tanggaldanwaktu,
  latitude,
  longitude,
  lokasi,
  akurasi,
  status,
  status_post,
  hari,
  onSuccess,
}) => {
  const [statusliar, setStatusLiar] = useState("");
  const [statusTidakliar, setStatusTidakLiar] = useState("");
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const statusLaporanColors = {
    accept: "bg-green-700 text-white shadow-xl",
    reject: "bg-red-500 text-white shadow-xl",
    pending: "bg-orange-500 text-white shadow-xl",
  };

  const prediksiLaporan = {
    liar: "bg-red-700 text-white shadow-xl",
    "tidak liar": "bg-green-400 text-white shadow-xl",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setStatusLiar("Liar");
    setStatusTidakLiar("Tidak Liar");
  }, []);

  const getStatusColor = (status) => {
    const lowerStatus = status?.toLowerCase() || "";
    return statusLaporanColors[lowerStatus] || "bg-gray-100 text-gray-800";
  };

  const getPrediksiStatusColor = (status) => {
    const dropStatus = status?.toLowerCase() || "";
    return prediksiLaporan[dropStatus] || "bg-gray-100 text-gray-800";
  };

  const handleAction = async (actionFunc, successMessage, actionType) => {
    setIsProcessing(true);
    try {
      await actionFunc();
      setPopupMessage(successMessage);
      setShowSuccessPopup(true);

      // Close confirmation popup
      if (actionType === "approve") setShowApproveConfirm(false);
      if (actionType === "reject") setShowRejectConfirm(false);
      if (actionType === "delete") setShowDeleteConfirm(false);

      // Refresh data or navigate after delay
      setTimeout(() => {
        setShowSuccessPopup(false);
        if (onSuccess) onSuccess();
        if (actionType === "delete") {
          navigate(-1); // Go back to previous page
        }
      }, 2000);
    } catch (error) {
      console.error(`Gagal ${actionType} data`, error);
      setPopupMessage(`Gagal ${actionType} data`);
      setShowErrorPopup(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const ApproveFunc = async () => {
    handleAction(
      () => ApprovePetugas(id_pl, { status_post: "Approve" }),
      "Status berhasil diubah menjadi Approve",
      "approve"
    );
  };

  const RejectFunc = async () => {
    handleAction(
      () => RejectPetugas(id_pl, { status_post: "Reject" }),
      "Status berhasil diubah menjadi Reject",
      "reject"
    );
  };

  const DeleteFunc = async () => {
    handleAction(() => DeletePetugas(id_pl), "Data berhasil dihapus", "delete");
  };

  return (
    <div className="flex flex-wrap -mx-3 relative">
      {/* Background blur ketika popup aktif */}
      {(showApproveConfirm ||
        showRejectConfirm ||
        showDeleteConfirm ||
        showSuccessPopup ||
        showErrorPopup) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      <div className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0">
        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-6">
            <p className="leading-normal font-bold uppercase text-sm">
              DETAIL INFORMATION
            </p>
            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />

            <div class="flex flex-wrap -mx-3 mb-4">
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="nama"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Nama Petugas
                  </label>
                  {nama && (
                    <input
                      value={nama.toUpperCase()}
                      type="text"
                      name="nama"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="username"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Identitas Petugas
                  </label>
                  {identitas_petugas && (
                    <input
                      value={identitas_petugas}
                      type="text"
                      name="username"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="email"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Tanggal Dan Waktu
                  </label>
                  {formattedDateSet(tanggaldanwaktu) && (
                    <input
                      type="email"
                      name="email"
                      value={formattedDateSet(tanggaldanwaktu)}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="city"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Hari Pelaporan
                  </label>
                  {hari && (
                    <input
                      type="text"
                      name="city"
                      value={hari}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="first name"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Latitude
                  </label>
                  {latitude && (
                    <input
                      type="text"
                      name="first name"
                      value={latitude}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="last name"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Longitude
                  </label>
                  {longitude && (
                    <input
                      type="text"
                      name="last name"
                      value={longitude}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                <div class="mb-4">
                  <label
                    for="address"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Lokasi
                  </label>
                  {lokasi && (
                    <input
                      type="text"
                      name="address"
                      value={lokasi}
                      className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      required
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Akurasi Pelaporan
                  </label>
                  <div
                    className={`p-2 rounded-md bg-gray-700 text-white shadow-xl text-center font-medium`}
                  >
                    {akurasi ? Number(akurasi).toFixed(1) : "-"} %
                  </div>
                </div>
              </div>

              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Status Laporan
                  </label>
                  <div
                    className={`p-2 rounded-md ${getStatusColor(
                      status_post
                    )} text-center font-medium`}
                  >
                    {status_post || "-"}
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Status
                  </label>
                  <div
                    className={`p-2 rounded-md ${getPrediksiStatusColor(
                      status
                    )} text-center font-medium`}
                  >
                    {status || "-"}
                  </div>
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0"></div>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-4 shrink-0 md:w-full md:flex-0">
                <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-600 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85 disabled:opacity-50"
                  >
                    <FaRegTrashAlt className="mr-2" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRejectConfirm(true)}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85 disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApproveConfirm(true)}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85 disabled:opacity-50"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Confirmation Popup */}
      {showApproveConfirm && (
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <h3
                className={`${
                  isMobile ? "text-md" : "text-lg"
                } font-medium text-gray-900 mb-2 text-center`}
              >
                Konfirmasi Approve
              </h3>
              <p
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } text-gray-600 text-center mb-4 sm:mb-6`}
              >
                Apakah Anda yakin ingin menyetujui laporan ini?
              </p>
              <div className="flex space-x-3 sm:space-x-4 w-full">
                <button
                  onClick={() => setShowApproveConfirm(false)}
                  disabled={isProcessing}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50`}
                >
                  Batal
                </button>
                <button
                  onClick={ApproveFunc}
                  disabled={isProcessing}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50`}
                >
                  {isProcessing ? "Memproses..." : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Popup */}
      {showRejectConfirm && (
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
                Konfirmasi Reject
              </h3>
              <p
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } text-gray-600 text-center mb-4 sm:mb-6`}
              >
                Apakah Anda yakin ingin menolak laporan ini?
              </p>
              <div className="flex space-x-3 sm:space-x-4 w-full">
                <button
                  onClick={() => setShowRejectConfirm(false)}
                  disabled={isProcessing}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50`}
                >
                  Batal
                </button>
                <button
                  onClick={RejectFunc}
                  disabled={isProcessing}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50`}
                >
                  {isProcessing ? "Memproses..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
                Apakah Anda yakin ingin menghapus data ini? Aksi ini tidak dapat
                dibatalkan.
              </p>
              <div className="flex space-x-3 sm:space-x-4 w-full">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isProcessing}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50`}
                >
                  Batal
                </button>
                <button
                  onClick={DeleteFunc}
                  disabled={isProcessing}
                  className={`${
                    isMobile ? "px-3 py-1.5 text-sm" : "px-4 py-2"
                  } flex-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50`}
                >
                  {isProcessing ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
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
                Berhasil!
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

      {/* Error Popup */}
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
                onClick={() => setShowErrorPopup(false)}
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
    </div>
  );
};
