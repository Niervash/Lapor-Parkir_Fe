import React, { useState, useEffect } from "react";
import { TableList } from "../../../../bases/TableList/TableList";
import { PaginationViewBeranda } from "../../../pagination/PaginationViewBeranda/PaginationViewBeranda";
import { GetDataPetugas } from "../../../../../config/User/Pelaporan/PetugasLIar/PetugasLiar";
import { GetItem } from "../../../../../config/SetItem";

export const TablePetugasBeranda = ({ Tittle }) => {
  const [tabledata, setTableData] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Jumlah item per halaman
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Id_Pengguna } = await GetItem();
        console.log(Id_Pengguna);

        const response = await GetDataPetugas(Id_Pengguna);
        console.log(response.data.rows);

        setTableData(response.data.rows);
      } catch (error) {
        setError("Gagal memuat data petugas liar.");
        setToastMessage("Gagal memuat data petugas liar.");
        setToastType("error");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hitung indeks item yang akan ditampilkan
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tabledata.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 text-lg mb-2">No results found</p>
        <p className="text-gray-500 text-sm">
          Adjust your filters and try again.
        </p>
      </div>
    );
  }

  if (currentItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 text-lg mb-2">No results found</p>
        <p className="text-gray-500 text-sm">Try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-solid shadow-xl border-black-125 rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 mb-0 rounded-t-4">
          <div className="flex justify-between">
            <h6 className="mb-2 font-bold text-gray-500">{Tittle}</h6>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="items-center w-full mb-4 align-top border-collapse border-gray-200">
            <tbody>
              {currentItems.map((item, index) => (
                <TableList
                  key={index}
                  title={"IDENTITAS PETUGAS"}
                  cat={item.identitas_petugas || "N/A"}
                  lat={item.latitude || "N/A"}
                  long={item.longitude || "N/A"}
                  pred={item.status || "N/A"}
                  post={item.status_post || "N/A"}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationViewBeranda
        itemsPerPage={itemsPerPage}
        totalItems={tabledata.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
