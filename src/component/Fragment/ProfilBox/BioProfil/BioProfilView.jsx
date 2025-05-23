import React from "react";

export const BioProfilView = ({
  nama,
  email,
  jenis_kelamin,
  username,
  role,
}) => {
  const handlingButton = () => {
    console.log("Edit button clicked");
  };

  return (
    <div className="flex flex-wrap -mx-3 ">
      <div className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0 ">
        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-6">
            <p className="leading-normal font-bold uppercase text-sm">
              User Information
            </p>
            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={nama}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="jenis_kelamin"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Jenis Kelamin
                  </label>
                  <input
                    type="text"
                    name="jenis_kelamin"
                    value={jenis_kelamin}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
              <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 "
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={role}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 font-bold text-sm rounded-lg focus:ring-gray-50 focus:border-gray-300 block w-full p-2.5 bg-gray-200 border-gray-50 placeholder-black text-black"
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent" />

            {/* <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-4 shrink-0 md:w-full md:flex-0">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlingButton}
                    className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
