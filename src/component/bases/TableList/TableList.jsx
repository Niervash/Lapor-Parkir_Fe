import React from "react";

export const TableList = ({ className, title, cat, lat, long, pred, post }) => {
  return (
    <tr>
      <td className="p-2 align-middle bg-transparent border-0 w-3/10 whitespace-nowrap">
        <div className="flex items-center px-2 py-1">
          <div>
            <div className="inline-block w-3 h-3 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500"></div>
            {/* Pada bagian ini apabila merupakan pelanggaran maka berwarna merah sedangakan bukan pelanggaran berwarna hijau  */}
          </div>
          <div className="ml-6">
            <p className="mb-0 text-xs font-semibold leading-tight">
              {title}
            </p>
            <h6 className="mb-0 text-sm leading-normal">{cat}</h6>
          </div>
        </div>
      </td>
      <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
        <div className="text-center">
          <p className="mb-0 text-xs font-semibold leading-tight">LATITUDE :</p>
          <h6 className="mb-0 text-sm leading-normal">{lat}</h6>
        </div>
      </td>
      <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
        <div className="text-center">
          <p className="mb-0 text-xs font-semibold leading-tight">
            LONGITUDE :
          </p>
          <h6 className="mb-0 text-sm leading-normal">{long}</h6>
        </div>
      </td>
      <td className="p-2 text-sm leading-normal align-middle bg-transparent border-0 whitespace-nowrap">
        <div className="flex-1 text-center">
          <p className="mb-0 text-xs font-semibold leading-tight">
            VERIFICATION STATUS :
          </p>
          <h6 className="mb-0 text-sm leading-normal">{pred}</h6>
        </div>
      </td>
      <td className="p-2 text-sm leading-normal align-middle bg-transparent border-0 whitespace-nowrap">
        <div className="flex-1 text-center">
          <p className="mb-0 text-xs font-semibold leading-tight">STATUS :</p>
          <div className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
            <span
              className={`px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ${
                post === "Pending"
                  ? "bg-yellow-500"
                  : post === "Reject"
                  ? "bg-red-500"
                  : post === "Approve"
                  ? "bg-gradient-to-tl from-emerald-500 to-teal-400"
                  : "bg-gray-500"
              }`}
            >
              {post}
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};
