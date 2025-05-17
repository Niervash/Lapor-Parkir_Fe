import React, { useState } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { formattedDateSet } from "../../../../config/Common-Function";

export const Petugaspetugasliar = ({ items, onModalToggle }) => {
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/user dashboard/petugas liar/detail/${id}`);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-lg">
      <table className="w-full text-sm text-left  text-gray-500">
        <thead className="mb-0 text-xs font-semibold leading-tight bg-white uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tanggal dan Waktu
            </th>
            <th scope="col" className="px-6 py-3">
              hari
            </th>
            <th scope="col" className="px-6 py-3">
              Latitude
            </th>
            <th scope="col" className="px-6 py-3">
              Longitude
            </th>
            <th scope="col" className="px-6 py-3">
              Lokasi
            </th>
            <th scope="col" className="px-6 py-3">
              Identitas Petugas
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Prediction
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:bg-gray-900 even:bg-gray-50 border-b "
            >
              <td className="px-6 py-4">
                {formattedDateSet(item.tanggaldanwaktu)}
              </td>
              <td className="px-6 py-4">{item.hari}</td>
              <td className="px-6 py-4">{item.latitude}</td>
              <td className="px-6 py-4">{item.longitude}</td>
              <td className="px-6 py-4">{item.lokasi}</td>
              <td className="px-6 py-4">{item.identitas_petugas}</td>
              {/* apabila status acc maka hijau apabila pending orange apabila rejecte merah */}
              <td
                className={`px-2.5 mt-10 ml-2 md:mt-3 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ${
                  item.status_post === "Pending"
                    ? "bg-yellow-500"
                    : item.status_post === "Reject"
                    ? "bg-red-500"
                    : item.status_post === "Approve"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                {item.status_post}
              </td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleDetailClick(item.id)}
                  className="text-green-600 hover:text-green-400 md:mr-5 text-xl flex justify-center"
                >
                  <BiSolidDetail />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
