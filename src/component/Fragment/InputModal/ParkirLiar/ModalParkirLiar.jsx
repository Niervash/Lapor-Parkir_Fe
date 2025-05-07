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
      toast.success("Pelaporan parkir liar berhasil dikirim!");
      setTimeout(() => {
        onClose();
        handleReset();
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Gagal menambahkan pelaporan.");
      toast.error("Gagal mengirim pelaporan parkir liar!");
    }
  };

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
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-bold text-gray-600">
                Laporkan Parkir Liar
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-full border border-2 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                    <option value="Kantor wali kota">Other</option>
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
                  <FileInput onChange={handleFileChange} />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="inline-block px-4 py-2 mb-4 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                >
                  Submit Pelaporan
                </button>
                <ButtonReset
                  className="inline-block px-5 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  onReset={handleReset}
                />
              </div>
              {successMessage && (
                <p className="text-green-500 text-center">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
