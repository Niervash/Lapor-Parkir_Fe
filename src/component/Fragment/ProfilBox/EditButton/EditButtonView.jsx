import React from "react";

export const EditButtonView = () => {
  return (
    <div class="flex flex-wrap -mx-3 ">
      <div classN="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0 ">
        <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div class="flex space-x-4 ">
            <button
              type="button"
              class="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
            >
              Edit
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
  );
};
