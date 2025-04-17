import React from "react";

export const AdminCard = () => {
  return (
    <div class=" ml-0 mr-0 mt-4 pt-10 md:pb-10 pb:-6  relative flex flex-col flex-auto min-w-0 p-4 mx-6 overflow-hidden break-words bg-white border-0  shadow-3xl rounded-2xl bg-clip-border">
      <div class="flex flex-wrap -mx-3 md:ml-4 ml-1 ">
        {/* Profil Picture */}
        <div class="flex-none w-auto max-w-full px-3"></div>
        {/* Profil Name */}
        <div class="flex-none w-auto max-w-full px-3 my-auto">
          <div class="h-full">
            <h5 class="mb-1 font-bold">Sayo Kravits</h5>
            <p class="mb-0 font-semibold leading-normal text-sm">
              Public Relations
            </p>
          </div>
        </div>
        <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
          <div class="relative right-0"></div>
        </div>
      </div>
    </div>
  );
};
