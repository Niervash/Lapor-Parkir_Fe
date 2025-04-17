import React from "react";

export const ProfileBox = ({ foto_profil, nama, role }) => {
  return (
    <div>
      <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 overflow-hidden break-words bg-white border-0  shadow-3xl rounded-2xl bg-clip-border">
        <div class="flex flex-wrap -mx-3">
          {/* Profil Picture */}
          <div class="flex-none w-auto max-w-full px-3 ">
            <div class="relative ml-3 inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-10 w-12 rounded-xl">
              <img
                src={foto_profil}
                alt="profile_image"
                class="w-full shadow-2xl mt-2 rounded-xl"
              />
            </div>
          </div>
          {/* Profil Name */}
          <div class="flex-none w-auto max-w-full px-3">
            <div class="h-full">
              <h5 class=" font-bold">{nama}</h5>
              <p class="mb-0 font-semibold leading-normal text-sm">{role}</p>
            </div>
          </div>
          <div class="w-full max-w-full px-3 mx-auto sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
            <div class="relative right-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
