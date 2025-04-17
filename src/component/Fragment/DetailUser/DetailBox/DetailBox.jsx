import React from "react";

export const DetailBox = () => {
  return (
    <div class="flex flex-wrap -mx-3 ">
      <div class="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0 ">
        <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-6">
            <p class="leading-normal font-bold uppercase text-sm">
              DETAIL INFORMATION
            </p>
            <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            <div class="flex flex-wrap -mx-3 mb-4">
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="username"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Tanggal Dan Waktu
                  </label>
                  <input
                    type="text"
                    name="username"
                    value="lucky.jesse"
                    class="focus:shadow-primary-outline  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="email"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Hari
                  </label>
                  <input
                    type="email"
                    name="email"
                    value="jesse@example.com"
                    class="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
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
                  <input
                    type="text"
                    name="first name"
                    value="Jesse"
                    class="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
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
                  <input
                    type="text"
                    name="last name"
                    value="Lucky"
                    class="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <p class="leading-normal font-bold uppercase text-sm">
              Contact Information
            </p>
            <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            <div class="flex flex-wrap -mx-3">
              <div class="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                <div class="mb-4">
                  <label
                    for="address"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Lokasi
                  </label>
                  <input
                    type="text"
                    name="address"
                    value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    class="focus:shadow-primary-outline  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="city"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Identitas Petugas
                  </label>
                  <input
                    type="text"
                    name="city"
                    value="New York"
                    class="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                <div class="mb-4">
                  <label
                    for="country"
                    class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    name="country"
                    value="United States"
                    class="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div class="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0"></div>
            </div>

            <div class="flex flex-wrap -mx-3">
              <div class="w-full max-w-full px-4 shrink-0 md:w-full md:flex-0">
                <div class="flex space-x-4">
                  <button
                    type="button"
                    class="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Save
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
