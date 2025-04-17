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

  // Format tanggal dan waktu sesuai kebutuhan
  const day = String(now.getDate()).padStart(2, "0"); // Hari (DD)
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan (MM)
  const year = now.getFullYear(); // Tahun (YYYY)
  const hours = String(now.getHours()).padStart(2, "0"); // Jam (HH)
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Menit (MM)

  // Gabungkan dalam format yang diinginkan
  const formattedDateTime = `${day}/${month}/${year}, ${hours}:${minutes}`;
  setWaktu(formattedDateTime);
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
