import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { DetailBox } from "../../../../Fragment/DetailUser/DetailBox/DetailBox.jsx";
import carousel from "../../../../../../public/assets/img/carousel-1.jpg";
import { DetailBoxPetugas } from "../../../../Fragment/DetailUser/DetailBox/DetailboxPetugas/DetailBoxPetugas.jsx";
import { useParams } from "react-router-dom";
import { GetDetailPetugas } from "../../../../../config/User/Pelaporan/PetugasLIar/PetugasLiar";
import { ToastContainer, toast } from "react-toastify";

const MapWithCenter = ({ latitude, longitude }) => {
  const map = useMap();
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.flyTo([latitude, longitude], 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [latitude, longitude, map]);
  return null;
};

export const DetailPetugasSection = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0); // Untuk memicu efek refresh

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    try {
      const response = await GetDetailPetugas(id);
      setItem(response.data || {});
      // Hanya tampilkan toast saat pertama kali atau manual refresh
      if (refreshCount === 0) {
        toast.success("Data berhasil dimuat");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ambil data pertama kali
    fetchData();

    // Setup interval untuk refresh otomatis setiap 30 detik
    const interval = setInterval(() => {
      setRefreshCount((prev) => prev + 1); // Memicu useEffect
    }, 3000);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [id]);

  // Effect untuk handle refresh
  useEffect(() => {
    if (refreshCount > 0) {
      // Skip initial load
      fetchData();
    }
  }, [refreshCount]);

  // Fungsi untuk manual refresh
  const handleManualRefresh = () => {
    setLoading(true);
    setRefreshCount((prev) => prev + 1);
    toast.info("Memperbarui data...");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-center">Data tidak ditemukan</p>
      </div>
    );

  const latitude = item?.latitude ?? null;
  const longitude = item?.longitude ?? null;
  return (
    <div className="w-full px-6 mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Tambahkan tombol refresh manual */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleManualRefresh}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          {loading ? "Memperbarui..." : "Refresh Data"}
        </button>
      </div>

      <div className="flex flex-wrap mt-6 -mx-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Map Section */}
        <div className="w-full max-w-full px-3 lg:flex-none mt-2 z-0">
          <div className="flex-auto p-4 rounded-2xl border-0 shadow-2xl bg-white">
            <h1 className="ml-5 mb-3 font-bold text-gray-500">MAPS</h1>
            {latitude !== null && longitude !== null ? (
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                className="h-96 rounded-2xl shadow-md"
              >
                <MapWithCenter latitude={latitude} longitude={longitude} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>Lokasi Pelanggaran " {[latitude, longitude]} "</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-gray-500 text-center">
                Koordinat tidak tersedia
              </p>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-full px-3 lg:flex-none mt-2">
          <div className="flex-auto p-4 rounded-2xl border-0 shadow-2xl bg-white">
            <h1 className="ml-5 mb-3 font-bold text-gray-500">
              BUKTI PELANGGARAN
            </h1>
            {item.bukti ? (
              <img
                src={item.bukti}
                alt="Bukti Pelanggaran"
                className="h-96 w-full object-contain rounded-2xl shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = carousel; // Fallback image
                }}
              />
            ) : (
              <p className="text-gray-500 text-center">
                Tidak ada bukti tersedia
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-4 pb-4 mx-auto">
        <DetailBoxPetugas
          nama={item.nama || "N/A"}
          identitas_petugas={item.identitas_petugas || "N/A"}
          tanggaldanwaktu={item.tanggaldanwaktu || "N/A"}
          latitude={latitude || "N/A"}
          longitude={longitude || "N/A"}
          lokasi={item.lokasi || "N/A"}
          akurasi={item.akurasi || "N/A"}
          status_post={item.status_post || "N/A"}
          status={item.status || "N/A"}
          hari={item.hari || "N/A"}
        />
      </div>
    </div>
  );
};
