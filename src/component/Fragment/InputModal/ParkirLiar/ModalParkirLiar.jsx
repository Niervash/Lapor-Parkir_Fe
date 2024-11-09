import React, { useState, useEffect } from "react";
import FileInput from "../../../bases/FileInput/FileInput";
import { ButtonReset } from "../../../bases/ButtonReset/ButtonReset";
import {
  resetHandlePetugas,
  Hariset,
  Waktuset,
} from "../../../../config/Common-Function";
import { addDataParkir } from "../../../../config/network-data";
import ParkirLiarmaps from "../../maps/parkirliarmaps/parkirliarmaps";

export const ModalParkirLiar = ({ isOpen, onClose }) => {
  const [waktu, SetWaktu] = useState(" ");
  const [hari, SetHari] = useState(" ");
  const [successMessage, setSuccessMessage] = useState(" ");
  const [bukti, setBukti] = useState("null"); // Initialize Bukti as null

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    deskripsi_masalah: "",
    lokasi: "",
    jenis_kendaraan: "",
    waktu: "",
    hari: "",
  });

  useEffect(() => {
    Hariset(SetHari, setFormData);
    Waktuset(SetWaktu, setFormData);
  }, []);

  const handleReset = () => {
    resetHandlePetugas(setFormData, setSuccessMessage);
    setBukti(null); // Reset Bukti to null
  };

  const handleLocationClick = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleFileChange = (file) => {
    setBukti(file); // Update Bukti state when file is selected
    setFormData((prev) => ({
      ...prev,
      bukti: file.name, // Update Bukti field in formData
    }));
  };

  async function submitHandel(e) {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (bukti) {
      formDataToSend.append("bukti", bukti); // Append file if it exists
    }

    try {
      const response = await addDataParkir(formDataToSend);
      setSuccessMessage("Pelaporan berhasil!");
      handleReset(); // Reset form after successful submission
    } catch (error) {
      setSuccessMessage("Gagal menambahkan pelaporan.");
    }
  }
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
                <ParkirLiarmaps onLocationClick={handleLocationClick} />
              </div>
            </div>
            <form className="p-4 md:p-5" onSubmit={submitHandel}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="jenis_kendaraan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jenis Kendaraan
                  </label>
                  <select
                    id="jenis_kendaraan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.jenis_kendaraan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jenis_kendaraan: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih Kendaraan</option>
                    <option value="Motor">Motor</option>
                    <option value="Mobil">Mobil</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="Lokasi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lokasi
                  </label>
                  <select
                    id="lokasi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.lokasi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lokasi: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih Lokasi</option>
                    <option value="Jl. H. Agus Salim">Jl. H. Agus Salim</option>
                    <option value="Jl. Imam Bonjol">Jl. Imam Bonjol</option>
                    <option value="Jl. Ir Soekrano">Jl. Ir Soekrano</option>
                    <option value="Jl. Jendral Sudirman">Jl. Merpati</option>
                    <option value="Jl. Merpati">Jl. Merpati</option>
                    <option value="Jl. Nuri">Jl. Nuri</option>
                    <option value="Jl. Sisingamangaraja">
                      Jl. Sisingamangaraja
                    </option>
                    <option value="Kantor wali kota">Kantor wali kota</option>
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
                    readOnly
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
                    readOnly
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="Identitas_Petugas"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Deskripsi Masalah
                  </label>
                  <select
                    id="deskripsi_masalah"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.deskripsi_masalah}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deskripsi_masalah: e.target.value,
                      })
                    }
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Waktu
                  </label>
                  <input
                    type="text"
                    id="waktu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    value={waktu}
                    readOnly
                  />
                </div>
                <div className="col-span-2 ">
                  <label
                    htmlFor="hari"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Hari
                  </label>
                  <input
                    type="text"
                    id="hari"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    value={hari}
                    readOnly
                  />
                </div>
                <div className="col-span-2 mb-2">
                  <FileInput
                    htmlFor="bukti"
                    id="bukti"
                    accept="image/*"
                    Label="Bukti"
                    onChange={handleFileChange} // Use handleFileChange function
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
                />
              </div>
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
