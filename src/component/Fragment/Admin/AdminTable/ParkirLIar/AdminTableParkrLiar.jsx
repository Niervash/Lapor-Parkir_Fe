import React from "react";
import { BiSolidDetail } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const AdminTableParkrLiar = ({ items, onModalToggle, onDelete }) => {
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/admin/parkir liar/detail/${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="mb-0 text-xs font-semibold leading-tight bg-white uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Jenis Kendaraan
            </th>
            <th scope="col" className="px-6 py-3">
              Tanggal dan Waktu
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
              Deskripsi Masalah
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
              className="odd:bg-white odd:bg-gray-900 even:bg-gray-50 border-b"
            >
              <td className="px-6 py-4">{item.jenis_kendaraan}</td>
              <td className="px-6 py-4">
                {new Date(item.tanggaldanwaktu).toLocaleString()}
              </td>
              <td className="px-6 py-4">{item.latitude}</td>
              <td className="px-6 py-4">{item.longitude}</td>
              <td className="px-6 py-4">{item.lokasi}</td>
              <td className="px-6 py-4">{item.deskripsi_masalah}</td>
              <td className="px-6 py-4 flex items-center space-x-4">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDeleteForever className="text-xl" />
                </button>
                <button
                  onClick={() => handleDetailClick(item.id)}
                  className="text-green-600 hover:text-green-400"
                >
                  <BiSolidDetail className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
