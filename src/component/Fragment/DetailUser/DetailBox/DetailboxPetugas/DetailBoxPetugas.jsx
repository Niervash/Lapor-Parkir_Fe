import React, { useEffect, useState } from "react";
import { formattedDateSet } from "../../../../../config/Common-Function";

export const DetailBoxPetugas = ({
  nama,
  identitas_petugas,
  tanggaldanwaktu,
  latitude,
  longitude,
  lokasi,
  status,
  akurasi,
  status_post,
  hari,
}) => {
  const [statusliar, setStatusLiar] = useState("");
  const [statusTidakliar, setStatusTidakLiar] = useState("");
  const [currentStatusPost, setCurrentStatusPost] = useState(status_post);

  const statusLaporanColors = {
    approve: "bg-green-700 text-white shadow-xl",
    reject: "bg-red-500 text-white shadow-xl",
    pending: "bg-orange-500 text-white shadow-xl",
  };

  const prediksiLaporan = {
    liar: "bg-red-700 text-white shadow-xl",
    "tidak liar": "bg-green-400 text-white shadow-xl",
  };

  useEffect(() => {
    setStatusLiar("Liar");
    setStatusTidakLiar("Tidak Liar");
  }, []);

  // Effect untuk memantau perubahan pada prop status_post
  useEffect(() => {
    setCurrentStatusPost(status_post);
  }, [status_post]);

  const getStatusColor = (status) => {
    const lowerStatus = status?.toLowerCase() || "";
    return statusLaporanColors[lowerStatus] || "bg-gray-100 text-gray-800";
  };

  const getPrediksiStatusColor = (status) => {
    const dropStatus = status?.toLowerCase() || "";
    return prediksiLaporan[dropStatus] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex flex-wrap -mx-3 ">
      <div className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0 ">
        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-6">
            <p className="leading-normal font-bold uppercase text-sm">
              DETAIL INFORMATION
            </p>
            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="nama"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="first name"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="last name"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
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
                      readOnly
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
                      currentStatusPost
                    )} text-center font-medium`}
                  >
                    {currentStatusPost || "-"}
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
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};