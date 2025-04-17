import React from "react";
import { BiSolidDetail } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const AdminTablePetugasLiar = ({ items, onModalToggle, onDelete }) => {
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/admin/petugas liar/detail/${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs font-semibold uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Tanggal dan Waktu
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Hari
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Latitude
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Longitude
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Lokasi
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Identitas Petugas
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Prediction
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.tanggaldanwaktu).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hari}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.latitude}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.longitude}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.lokasi}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.identitas_petugas}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <MdDeleteForever className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDetailClick(item.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <BiSolidDetail className="text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
