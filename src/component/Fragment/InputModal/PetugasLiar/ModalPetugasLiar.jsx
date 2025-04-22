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

export const ModalPetugasLiar = ({ isOpen, onClose }) => {
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");
  const [bukti, setBukti] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [identitas_petugas, setIdentitaspetugas] = useState("");
  const [lokasi, setLokasi] = useState("");

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

  async function submitHandel(e) {
    e.preventDefault();

    if (!bukti) {
      alert("Harap unggah bukti terlebih dahulu!");
      return;
    }
    if (!latitude || !longitude || !identitas_petugas || !lokasi || !hari) {
      alert("Harap isi semua field yang diperlukan!");
      return;
    }
    console.log("File siap diunggah:", bukti);
    try {
      await AddDataPetugas({
        lokasi,
        latitude,
        longitude,
        identitas_petugas,
        waktu,
        hari,
        bukti,
      });
      setSuccessMessage("Pelaporan berhasil!");
    } catch (error) {
      console.error("Error response:", error.response);
      setSuccessMessage("Gagal menambahkan pelaporan.");
    }
  }

  return (
    <div>
      <div
        className={`${
          isOpen
            ? "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
            : "hidden"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        onClick={onClose}
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-bold text-gray-600 ">Tambah Data</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-full border border-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
            <div className="flex justify-center items-center h-[50vh] p-5 w-full z-0">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-2 border-gray-100">
                <Petugasliarmaps onLocationClick={handleLocationClick} />{" "}
              </div>
            </div>
            <form className="p-4 md:p-5" onSubmit={submitHandel}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lokasi"
                    className="block mb-2 text-sm font-medium text-gray-900 text-black"
                  >
                    Lokasi
                  </label>
                  <select
                    id="lokasi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50 "
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
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
                    htmlFor="identitas_petugas"
                    className="block mb-2 text-sm font-medium text-gray-900 text-black"
                  >
                    Identitas Petugas
                  </label>
                  <select
                    id="identitas_petugas"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 text-black focus:ring-gray-50 focus:border-gray-50"
                    value={identitas_petugas}
                    onChange={(e) => setIdentitaspetugas(e.target.value)}
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
                    value={waktu}
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
                  <FileInput onChange={handleFileChange} />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="inline-block px-4 py-2 mb-4  font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85 "
                >
                  Submit Pelaporan
                </button>
                <ButtonReset
                  className="inline-block px-5 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  onReset={handleReset}
                ></ButtonReset>
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
