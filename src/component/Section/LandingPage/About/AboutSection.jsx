import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GetAllData } from "../../../../config/LandingPage/Xinput";
import L from "leaflet";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const AboutSection = () => {
  const [parkiritem, setParkirItem] = useState([]);
  const [petugasitem, setPetugasItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllData();
        setParkirItem(response.data.laporan);
        setPetugasItem(response.data.petugas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter out items with invalid coordinates
  const validParkirItems = parkiritem.filter(
    (item) => item.latitude != null && item.longitude != null
  );
  const validPetugasItems = petugasitem.filter(
    (item) => item.latitude != null && item.longitude != null
  );

  return (
    <section className="bg-gray-50" id="about">
      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          {/* Tmpt Maps */}
          <MapContainer
            center={[-6.2088, 106.8456]} // Center map on Jakarta
            zoom={13}
            className="h-96 rounded-2xl shadow-md mt-16 md:mt-0 z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {validParkirItems.map((item, index) => (
              <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                icon={redIcon}
              >
                <Popup>Lokasi Pelanggaran Parkir Liar</Popup>
              </Marker>
            ))}
            {validPetugasItems.map((item, index) => (
              <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                icon={yellowIcon}
              >
                <Popup>Lokasi Petugas</Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="text-gray-500 sm:text-lg mt-5">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Kami menangani parkir liar untuk lingkungan yang lebih baik.
            </h2>
            <p className="mb-8 font-light lg:text-xl">
              Menyederhanakan proses pelaporan parkir liar untuk memastikan
              ketertiban dan keselamatan publik. Memberdayakan warga untuk
              bertindak tanpa kompleksitas metode pelaporan tradisional.
            </p>
            <ul
              role="list"
              className="pt-8 space-y-5 border-t border-gray-200 my-7"
            >
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900">
                  Laporan pelanggaran parkir real-time
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900">
                  Template pelaporan yang mudah digunakan
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900">
                  Pelacakan pelanggaran yang efisien
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900">
                  Otomatisasi laporan tanpa batas
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-medium leading-tight text-gray-900">
                  Manajemen pengetahuan parkir
                </span>
              </li>
            </ul>
            <p className="font-light lg:text-xl">
              Menyediakan pengalaman pelaporan yang cepat dan efektif untuk
              mengatasi masalah parkir liar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
