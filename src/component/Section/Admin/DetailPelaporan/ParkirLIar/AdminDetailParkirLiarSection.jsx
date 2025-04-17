import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { AdminDetailBoxParkir } from "../../../../Fragment/Admin/DetailTable/DetailBox/AdminDetailboxParkir/AdminDetailBoxParkir";
import logo from "../../../../../../public/assets/img/carousel-1.jpg";
import { useParams } from "react-router-dom";
import { AdminGetDetailParkir } from "../../../../../config/Admin/Pelaporan/ParkirLIar/ParkirLiar.admin";
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
export const AdminDetailParkirLiarSection = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await AdminGetDetailParkir(id);
        setItem(response.data || {});
        toast.success("Fetching berhasil!");
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

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
      <div className="flex flex-wrap mt-6 -mx-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Map Section */}
        <div className="w-full max-w-full px-3 lg:flex-none  mt-2">
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
            <h1 className=" ml-5 mb-3 font-bold text-gray-500 ">
              BUKTI PELANGGARAN
            </h1>

            {item.bukti ? (
              <img
                src={item.bukti}
                alt="Bukti Pelanggaran"
                className="h-96 w-full object-contain rounded-2xl shadow-md"
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
        <AdminDetailBoxParkir
          jenis_kendaraan={item.jenis_kendaraan || "N/A"}
          tanggaldanwaktu={item.tanggaldanwaktu || "N/A"}
          latitude={latitude || "N/A"}
          longitude={longitude || "N/A"}
          lokasi={item.lokasi || "N/A"}
          status_post={item.status_post || "N/A"}
          status={item.status || "N/A"}
          deskripsi_masalah={item.deskripsi_masalah || "Tidak ada deskripsi"}
          hari={item.hari || "N/A"}
        />
      </div>
    </div>
  );
};
