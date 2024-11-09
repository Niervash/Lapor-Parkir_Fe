const resetHandlePetugas = (setFormData, setSuccess) => {
  setFormData({
    latitude: "",
    longitude: "",
    identitas_Petugas: "",
    lokasi: "",
    bukti: null,
  });

  setSuccess("Data petugas berhasil dihapus!");

  return true;
};

const Waktuset = (setWaktu, setFormData) => {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Makassar",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  setWaktu(formattedTime);
  setFormData((prev) => ({
    ...prev,
    waktu: formattedTime,
  }));
};

const Hariset = (setHari, setFormData) => {
  const now = new Date();
  const formattedDay = now.toLocaleDateString("id-ID", {
    weekday: "long", // Menghasilkan nama hari dalam bentuk panjang
    timeZone: "Asia/Makassar",
  });
  setHari(formattedDay);
  setFormData((prev) => ({
    ...prev,
    hari: formattedDay,
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

export { resetHandlePetugas, PaginationPages, Waktuset, Hariset };
