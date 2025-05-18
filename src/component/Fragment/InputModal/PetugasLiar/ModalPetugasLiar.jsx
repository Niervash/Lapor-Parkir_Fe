import React, { useState, useEffect } from "react";
import { Petugasliarmaps } from "../../maps/petugasliarmaps/petugasliarmaps";
import FileInput from "../../../bases/FileInput/FileInput";
import { ButtonReset } from "../../../bases/ButtonReset/ButtonReset";
import {
  resetHandlePetugas,
  Hariset,
  Waktuset,
} from "../../../../config/Common-Function";
import { toast } from "sonner";
import { AddDataPetugas } from "../../../../config/User/Pelaporan/PetugasLIar/PetugasLiar";

export const ModalPetugasLiar = ({ isOpen, onClose, onSuccess }) => {
  // State yang sudah ada
  const [hari, setHari] = useState("");
  const [tanggaldanwaktu, setWaktu] = useState("");
  const [bukti, setBukti] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [identitas_petugas, setIdentitaspetugas] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [nama, setNama] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Tambahkan state untuk error popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Hariset(setHari);
    Waktuset(setWaktu);
  }, []);

  const handleReset = () => {
    resetHandlePetugas({
      setLatitude,
      setLongitude,
      setIdentitaspetugas,
      setLokasi,
      setNama,
      setBukti,
      setSuccessMessage,
    });
  };

  const handleLocationClick = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBukti(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandel = async (e) => {
    e.preventDefault();

    if (!bukti) {
      toast.error("Harap unggah bukti terlebih dahulu!");
      return;
    }
    if (!latitude || !longitude || !identitas_petugas || !lokasi || !hari) {
      toast.error("Harap isi semua field yang diperlukan!");
      return;
    }

    setIsLoading(true);

    try {
      await AddDataPetugas({
        nama,
        lokasi,
        latitude,
        longitude,
        identitas_petugas,
        tanggaldanwaktu,
        hari,
        bukti,
      });

      setSuccessMessage("Pelaporan berhasil!");
      setIsLoading(false);
      setShowSuccessPopup(true);

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
        handleReset();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Gagal menambahkan pelaporan. Silakan coba lagi.");
      setIsLoading(false);
      setShowErrorPopup(true); // Tampilkan popup error
    }
  };

  return (
    <div>
      {/* Background blur effect */}
      {isOpen && !isLoading && !showSuccessPopup && !showErrorPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
          onClick={onClose}
        ></div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900">
                Memproses Laporan
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Harap tunggu sebentar...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-green-500"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Berhasil!
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Data petugas liar berhasil dilaporkan. Laporan akan segera
                diproses.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setShowSuccessPopup(false);
                  onClose();
                  handleReset();
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-red-500"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal!</h3>
              <p className="text-sm text-gray-600 text-center">
                {errorMessage}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setShowErrorPopup(false);
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main modal */}
      {isOpen && !isLoading && !showSuccessPopup && !showErrorPopup && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
          onClick={onClose}
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-lg font-bold text-gray-600 ">
                  Tambah Data
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-full border border-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={onClose}
                  disabled={isLoading}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex justify-center items-center h-[50vh] p-5 w-full z-0">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-2 border-gray-100">
                  <Petugasliarmaps onLocationClick={handleLocationClick} />
                </div>
              </div>
              <form className="p-4 md:p-5" onSubmit={submitHandel}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 ">
                    <label
                      htmlFor="hari"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Nama Petugas
                    </label>
                    <input
                      id="nama"
                      placeholder="Masukkan Nama Petugas"
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="lokasi"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Lokasi
                    </label>
                    <select
                      id="lokasi"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="">Pilih Lokasi</option>
                      <option value="Pusat Perbelanjaan">
                        Pusat Perbelanjaan
                      </option>
                      <option value="Gedung Perkantoran">
                        Gedung Perkantoran
                      </option>
                      <option value="Rumah Sakit">Rumah Sakit</option>
                      <option value="Universitas">Universitas</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="identitas_petugas"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Identitas Petugas
                    </label>
                    <select
                      id="identitas_petugas"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50"
                      value={identitas_petugas}
                      onChange={(e) => setIdentitaspetugas(e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="">Pilih Identitas Petugas</option>
                      <option value="Ada">Ada</option>
                      <option value="Tidak Ada">Tidak Ada</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="latitude"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      name="latitude"
                      id="latitude"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      placeholder="Enter Latitude"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="longitude"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      name="longitude"
                      id="longitude"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      placeholder="Enter Longitude"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-span-2 ">
                    <label
                      htmlFor="waktu"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Waktu
                    </label>
                    <input
                      type="text"
                      id="waktu"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      value={tanggaldanwaktu}
                      readOnly
                    />
                  </div>
                  <div className="col-span-2 ">
                    <label
                      htmlFor="hari"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Hari
                    </label>
                    <input
                      type="text"
                      id="hari"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black "
                      value={hari}
                      readOnly
                    />
                  </div>
                  <div className="col-span-2 mb-2">
                    <FileInput
                      onChange={handleFileChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className={`inline-block px-4 py-2 mb-4 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px ${
                      isLoading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 active:opacity-85"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      "Submit Pelaporan"
                    )}
                  </button>
                  <ButtonReset
                    className={`inline-block px-5 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 active:opacity-85"
                    }`}
                    onReset={handleReset}
                    disabled={isLoading}
                  />
                </div>
                {successMessage && (
                  <p className="text-green-500 text-center">{successMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
