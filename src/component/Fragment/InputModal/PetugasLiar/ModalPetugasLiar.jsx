import React, { useState, useEffect } from "react";
import { Petugasliarmaps } from "../../maps/petugasliarmaps/petugasliarmaps";
import FileInput from "../../../bases/FileInput/FileInput";
import { ButtonReset } from "../../../bases/ButtonReset/ButtonReset";
import {
  dateFormatted,
  resetHandlePetugas,
} from "../../../../config/Common-Function";
import { addDataPetugas } from "../../../../config/network-data";
import { toast } from "sonner";

export const ModalPetugasLiar = ({ isOpen, onClose }) => {
  const [latitude, setLatitude] = useState("");
  const [TanggalDanWaktu, setTanggalDanWaktu] = useState("");
  const [longitude, setLongitude] = useState("");
  const [Identitas_Petugas, setIdentitasPetugas] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [bukti, setBukti] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [status] = useState("Liar");

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    Identitas_Petugas: "",
    lokasi: "",
    bukti: "",
    TanggalDanWaktu: "",
  });

  useEffect(() => {
    dateFormatted(setTanggalDanWaktu, setFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("lokasi", formData.lokasi);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("identitas_petugas", formData.Identitas_Petugas);
    data.append("tanggaldanwaktu", formData.TanggalDanWaktu);
    data.append("status", status); // Jika diharapkan di server
    if (formData.bukti) {
      data.append("bukti", formData.bukti);
    }

    await addDataPetugas(data);

    if (formData.bukti) {
      data.append("bukti", formData.bukti);
    }

    try {
      await addDataPetugas(data);
      toast.success("Data berhasil ditambahkan!");
      onClose(); // Close modal after successful submission
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambahkan data!");
    }
  };

  const handleReset = () => {
    resetHandlePetugas(setFormData);
  };

  return (
    <div>
      {/* Backdrop with blur effect */}
      <div
        className={`${
          isOpen
            ? "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
            : "hidden"
        }`}
        onClick={onClose} // Close the modal when clicking on the backdrop
      ></div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        onClick={onClose} // Close modal when clicking outside
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tambah Data
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
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
            <div className="flex justify-center items-center h-[50vh] w-full z-0">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <Petugasliarmaps /> {/* Adding Maps */}
              </div>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lokasi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lokasi
                  </label>
                  <select
                    id="lokasi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.lokasi}
                    onChange={(e) =>
                      setFormData({ ...formData, lokasi: e.target.value })
                    }
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
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="Identitas_Petugas"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Identitas Petugas
                  </label>
                  <select
                    id="Identitas_Petugas"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.Identitas_Petugas}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Identitas_Petugas: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih Identitas Petugas</option>
                    <option value="Ada">Ada</option>
                    <option value="Tidak Ada">Tidak Ada</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="latitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Latitude"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="longitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Longitude"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-2 ">
                  <label
                    htmlFor="tanggal_dan_waktu"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal dan Waktu
                  </label>
                  <input
                    type="text"
                    id="tanggal_dan_waktu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    value={TanggalDanWaktu}
                    readOnly
                  />
                </div>
                <div className="col-span-2 mb-2">
                  <FileInput
                    id="foto_profil"
                    type="file"
                    accept="image/*"
                    Label="Bukti"
                    onChange={(e) => setBukti(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit Pelaporan
                </button>
                <ButtonReset
                  className="focus:outline-none text-white bg-red-400 hover:bg-red-400 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onReset={handleReset}
                ></ButtonReset>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
