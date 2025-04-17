import React from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

export const PaginationViewBeranda = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 3; // Jumlah maksimum tombol halaman yang ditampilkan di mobile

  // Fungsi untuk menghasilkan tombol halaman
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`min-w-8 rounded-md py-1 px-2 border text-center text-sm transition-all shadow-sm ${
            currentPage === i
              ? "bg-blue-500 text-white border-blue-500"
              : "border-slate-300 text-slate-600 hover:text-white hover:bg-blue-500 hover:border-blue-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span key="start-ellipsis" className="px-2 py-1 text-slate-600">
          ...
        </span>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="end-ellipsis" className="px-2 py-1 text-slate-600">
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pt-3 flex justify-center items-center space-x-1">
      {/* Tombol First */}
      <button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:pointer-events-none disabled:opacity-50"
      >
        <FaAngleDoubleLeft />
      </button>

      {/* Tombol Previous */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:pointer-events-none disabled:opacity-50"
      >
        <FaAngleLeft />
      </button>

      {/* Tombol Halaman */}
      {renderPageNumbers()}

      {/* Tombol Next */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-300 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:pointer-events-none disabled:opacity-50"
      >
        <FaAngleRight />
      </button>

      {/* Tombol Last */}
      <button
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-300 py-1 px-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:pointer-events-none disabled:opacity-50"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};
