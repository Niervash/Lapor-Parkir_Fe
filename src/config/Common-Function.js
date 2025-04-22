import { GetItem } from "./SetItem";

const resetHandlePetugas = (setters) => {
  const {
    setLatitude,
    setLongitude,
    setIdentitaspetugas,
    setLokasi,
    setBukti,
  } = setters;

  setLatitude("");
  setLongitude("");
  setIdentitaspetugas("");
  setLokasi("");
  setBukti(null);

  setSuccessMessage("Data Pelaporan berhasil Reset!");
};

const resetHandleParkir = (setters) => {
  const {
    setLatitude,
    setLongitude,
    setDeskripsiMasalah,
    setJenisKendaraan,
    setLokasi,
    setBukti,
    setSuccessMessage,
  } = setters;

  setLatitude("");
  setLongitude("");
  setDeskripsiMasalah("");
  setJenisKendaraan("");
  setLokasi("");
  setBukti(null);

  setSuccessMessage("Data Pelaporan berhasil Reset!");
};

const Waktuset = (setWaktu) => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Format timestamp yang benar untuk PostgreSQL
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  setWaktu(formattedDateTime); // Contoh output: "2023-11-15 03:50:00"
};

const Hariset = (setHari) => {
  const now = new Date();
  const formattedDay = now.toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Makassar",
  });
  setHari(formattedDay);
};

const PaginationPages = (data, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(
    (data && Array.isArray(data) ? data.length : 0) / itemsPerPage
  );

  const currentItems = (data && Array.isArray(data) ? data : []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    totalPages,
    currentItems,
  };
};

export {
  resetHandlePetugas,
  PaginationPages,
  Waktuset,
  Hariset,
  resetHandleParkir,
};
