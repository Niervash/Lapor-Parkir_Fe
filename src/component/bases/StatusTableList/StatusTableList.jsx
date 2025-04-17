import React from "react";

export const StatusTableList = () => {
  return (
    <td class="p-2 text-sm leading-normal align-middle bg-transparent border-0 whitespace-nowrap ">
      <div class="flex-1 text-center">
        <p class="mb-0 text-xs font-semibold leading-tight ">STATUS :</p>
        <div class="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
          <span class="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
            Aprrove
          </span>
        </div>
      </div>
    </td>
  );
};
