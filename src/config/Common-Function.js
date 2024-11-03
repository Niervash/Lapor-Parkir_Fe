const resetHandlePetugas = (setFormData, setSuccess) => {
  setFormData({
    latitude: "",
    longitude: "",
    identitas_Petugas: "",
    lokasi: "",
    bukti: null,
    tanggalDanWaktu: "",
  });

  setSuccess("Data petugas berhasil dihapus!");

  return true;
};

const dateFormatted = (setTanggalDanWaktu, setFormData) => {
  const now = new Date();
  const formattedDate = now.toLocaleString("id-ID", {
    timeZone: "Asia/Makassar",
    hour12: false,
  });
  setTanggalDanWaktu(formattedDate);
  setFormData((prev) => ({
    ...prev,
    TanggalDanWaktu: formattedDate,
  }));
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

export { resetHandlePetugas, dateFormatted, PaginationPages };
