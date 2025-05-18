import React, { useEffect, useState } from "react";
import { GetDetailPetugas } from "../../../../../config/User/Pelaporan/PetugasLIar/PetugasLiar";
import { formattedDateSet } from "../../../../../config/Common-Function";
import { exportReport } from "../../../../../config/PdfReport/pdf";

export const DetailBoxParkir = ({
  jenis_kendaraan,
  tanggaldanwaktu,
  latitude,
  longitude,
  lokasi,
  nopol,
  status,
  deskripsi_masalah,
  hari,
  status_post,
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

  //  const handleExport = () => {
  //   const reportEl = document.getElementById("reportContent");
  //   reportEl.classList.add("pdf-mode");
  //   setTimeout(() => {
  //     exportReport("reportContent");
  //     reportEl.classList.remove("pdf-mode");
  //   }, 300);
  // };

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0">
        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-6">
            {/* <button   // button for report
              onClick={handleExport}
              type="button"
              className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
            >
              Export to PDF
            </button> */}
            {/* <div id="reportContent"> */}
            <p className="leading-normal font-bold uppercase text-md">
              DETAIL INFORMATION
            </p>

            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="jenis_kendaraan"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Jenis Kendaraan
                  </label>
                  <input
                    value={jenis_kendaraan}
                    type="text"
                    readOnly
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="nopol"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Nomor Polisi
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={nopol.toUpperCase()}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>

              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="latitude"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={latitude}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>

              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="longitude"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={longitude}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="lokasi"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Lokasi
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={lokasi}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="deskripsi_masalah"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Deskripsi Masalah
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={deskripsi_masalah}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
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
                    htmlFor="hari"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Hari Pelaporan
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={hari}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="tanggal"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Tanggal Dan Waktu
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formattedDateSet(tanggaldanwaktu)}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
