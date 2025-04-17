import React from "react";

export const AdminDetailBoxParkir = ({
  jenis_kendaraan,
  tanggaldanwaktu,
  latitude,
  longitude,
  lokasi,
  status,
  deskripsi_masalah,
  hari,
  status_post,
}) => {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0">
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
                    htmlFor="username"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Jenis Kendaraan
                  </label>
                  {jenis_kendaraan && (
                    <input
                      value={jenis_kendaraan}
                      type="text"
                      name="username"
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Tanggal Dan Waktu
                  </label>
                  {new Date(tanggaldanwaktu).toLocaleString() && (
                    <input
                      type="email"
                      name="email"
                      value={new Date(tanggaldanwaktu).toLocaleString()}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="first name"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Latitude
                  </label>
                  {latitude && (
                    <input
                      type="text"
                      name="first name"
                      value={latitude}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="last name"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Longitude
                  </label>
                  {longitude && (
                    <input
                      type="text"
                      name="last name"
                      value={longitude}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
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
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Lokasi
                  </label>
                  {lokasi && (
                    <input
                      type="text"
                      name="address"
                      value={lokasi}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Deskripsi Masalah
                  </label>
                  {deskripsi_masalah && (
                    <input
                      type="text"
                      name="city"
                      value={deskripsi_masalah}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Hari Pelaporan
                  </label>
                  {hari && (
                    <input
                      type="text"
                      name="city"
                      value={hari}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Status Pelaporan
                  </label>
                  {status_post && (
                    <input
                      type="text"
                      name="city"
                      value={status_post}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                  >
                    Status
                  </label>
                  {status && (
                    <input
                      type="text"
                      name="country"
                      value={status}
                      className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0"></div>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-4 shrink-0 md:w-full md:flex-0">
                <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    type="button"
                    className="inline-block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-600 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Deleted
                  </button>
                  <button
                    type="button"
                    className="inline-block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="inline-block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
