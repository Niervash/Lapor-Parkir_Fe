import React, { useState, useEffect } from "react";
import FileInput from "../../../bases/FileInput/FileInput";
import { ButtonReset } from "../../../bases/ButtonReset/ButtonReset";
import {
  Hariset,
  resetHandleParkir,
  Waktuset,
} from "../../../../config/Common-Function";
import { AddDataParkir } from "../../../../config/User/Pelaporan/ParkirLIar/ParkirLIar";
import ParkirLiarmaps from "../../maps/parkirliarmaps/parkirliarmaps";
import { toast } from "sonner";

export const ModalParkirLiar = ({ isOpen, onClose }) => {
  const [tanggaldanwaktu, setWaktu] = useState("");
  const [hari, setHari] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bukti, setBukti] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [deskripsi_masalah, setDeskripsiMasalah] = useState("");
  const [jenis_kendaraan, setJenisKendaraan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    Hariset(setHari);
    Waktuset(setWaktu);
  }, []);

  const handleReset = () => {
    resetHandleParkir({
      setLatitude,
      setLongitude,
      setDeskripsiMasalah,
      setJenisKendaraan,
      setLokasi,
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
    if (
      !latitude ||
      !longitude ||
      !deskripsi_masalah ||
      !lokasi ||
      !jenis_kendaraan ||
      !tanggaldanwaktu ||
      !hari
    ) {
      toast.error("Harap isi semua field yang diperlukan!");
      return;
    }

    setIsLoading(true);

    try {
      await AddDataParkir({
        latitude,
        longitude,
        deskripsi_masalah,
        lokasi,
        bukti,
        jenis_kendaraan,
        tanggaldanwaktu,
        hari,
      });

      setSuccessMessage("Pelaporan berhasil!");
      setIsLoading(false);
      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
        handleReset();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Gagal menambahkan pelaporan.");
      setIsLoading(false);
      toast.error("Gagal mengirim pelaporan parkir liar!", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <div>
      {/* Background blur effect - only shown when main modal is open and no other modals */}
      {isOpen && !isLoading && !showSuccessPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
          onClick={onClose}
        ></div>
      )}

      {/* Loading overlay with blur effect */}
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
                Data parkir liar berhasil dilaporkan. Laporan akan segera
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

      {/* Main modal - only shown when no other modals are active */}
      {isOpen && !isLoading && !showSuccessPopup && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
          onClick={onClose}
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-bold text-gray-600">
                  Laporkan Parkir Liar
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-full border border-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
              <div className="flex justify-center items-center h-[50vh] p-5 z-40">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border">
                  <ParkirLiarmaps onLocationClick={handleLocationClick} />
                </div>
              </div>

              <form className="p-4 md:p-5" onSubmit={submitHandel}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="jenis_kendaraan"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Jenis Kendaraan
                    </label>
                    <select
                      id="jenis_kendaraan"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50 "
                      value={jenis_kendaraan}
                      onChange={(e) => setJenisKendaraan(e.target.value)}
                      disabled={isLoading} // Disable when loading
                    >
                      <option value="">Pilih Kendaraan</option>
                      <option value="Motor">Motor</option>
                      <option value="Mobil">Mobil</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="Lokasi"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Lokasi
                    </label>
                    <select
                      id="lokasi"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50 "
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      disabled={isLoading} // Disable when loading
                    >
                      <option value="">Pilih Lokasi</option>
                      <option value="Jl. H. Agus Salim">
                        Jl. H. Agus Salim
                      </option>
                      <option value="Jl. Imam Bonjol">Jl. Imam Bonjol</option>
                      <option value="Jl. Ir Soekrano">Jl. Ir Soekrano</option>
                      <option value="Jl. Jendral Sudirman">Jl. Merpati</option>
                      <option value="Jl. Merpati">Jl. Merpati</option>
                      <option value="Jl. Nuri">Jl. Nuri</option>
                      <option value="Jl. Sisingamangaraja">
                        Jl. Sisingamangaraja
                      </option>
                      <option value="Kantor wali kota">Kantor wali kota</option>
                      <option value="Other">Other</option>
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
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="Identitas_Petugas"
                      className="block mb-2 text-sm font-medium text-gray-900 text-black"
                    >
                      Deskripsi Masalah
                    </label>
                    <select
                      id="deskripsi_masalah"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50"
                      value={deskripsi_masalah}
                      onChange={(e) => setDeskripsiMasalah(e.target.value)}
                      disabled={isLoading} // Disable when loading
                    >
                      <option value="">Pilih Deskripsi</option>
                      <option value="Parkir Di Trototar">
                        Parkir Di Trototar
                      </option>
                      <option value="Parkir di tempat penyeberangan pejalan kaki">
                        Parkir di tempat penyeberangan pejalan kaki
                      </option>
                      <option value="Parkir di zona larangan parkir">
                        Parkir di zona larangan parkir
                      </option>
                      <option value="Parkir menghalangi tempat umum">
                        Parkir menghalangi tempat umum
                      </option>
                      <option value="Parkir menghalangi lalu lintas">
                        Parkir menghalangi lalu lintas
                      </option>
                      <option value="Parkir di jalur khusus pejalan kaki">
                        Parkir di jalur khusus pejalan kaki
                      </option>
                      <option value="Parkir di jalur khusus pesepeda">
                        Parkir di jalur khusus pesepeda
                      </option>
                    </select>
                  </div>
                  <div className="col-span-2 ">
                    <label
                      htmlFor="Waktu"
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
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                      value={hari}
                      readOnly
                    />
                  </div>
                  <div className="col-span-2 mb-2">
                    <FileInput
                      onChange={handleFileChange}
                      disabled={isLoading} // Pass disabled prop to FileInput
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
                    Submit Pelaporan
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
