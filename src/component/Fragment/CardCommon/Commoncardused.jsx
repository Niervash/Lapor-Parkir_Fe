import React, { useState, useEffect } from "react";
import { StatsCardDashboard } from "../statistikCard/StatsCardDashboard";
import { TableParkirBeranda } from "../Table/Tableberanda/ParkirLiar/TableParkirBeranda.jsx";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TablePetugasBeranda } from "../Table/Tableberanda/PetugasLiar/TablePetugasBeranda.jsx";
import { getAlldataParkirMaps } from "../../../config/User/Pelaporan/ParkirLIar/ParkirLIar.js";
import { GetDataPetugasMaps } from "../../../config/User/Pelaporan/PetugasLIar/PetugasLiar.js";
import { GetItem } from "../../../config/SetItem.js";

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

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Komponen untuk animasi flyTo ke lokasi GPS
const FlyToLocation = ({ location }) => {
  const map = useMap(); // Mengakses instance peta

  useEffect(() => {
    if (location) {
      map.flyTo(location, 13, { duration: 2 }); // Animasi flyTo ke lokasi dengan durasi 2 detik
    }
  }, [location, map]);

  return null; // Komponen ini tidak merender apa pun
};

export const CommonCardused = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [parkiritem, setParkirItem] = useState([]);
  const [petugasitem, setPetugasItem] = useState([]);
  const [userLocation, setUserLocation] = useState([-6.2088, 106.8456]); // Default location: Jakarta

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { Id_Pengguna } = await GetItem();

        const parkirResponse = await getAlldataParkirMaps(Id_Pengguna);
        console.log(parkirResponse.data);
        setParkirItem(parkirResponse.data);

        const petugasResponse = await GetDataPetugasMaps(Id_Pengguna);
        console.log(petugasResponse.data.rows);
        setPetugasItem(petugasResponse.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Jika gagal mendapatkan lokasi, tetap gunakan lokasi default (Jakarta)
          setUserLocation([-6.2088, 106.8456]);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Jika browser tidak mendukung geolocation, gunakan lokasi default (Jakarta)
      setUserLocation([-6.2088, 106.8456]);
    }
  }, []);

  return (
    <div>
      <div class="w-full px-6 py-6 mx-auto">
        <StatsCardDashboard />
        <div className="flex flex-wrap mt-6 -mx-3">
          <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
            <div className="border-black/12.5  shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
              {/* Maps */}
              <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                <h6 className="font-bold text-md text-gray-500">
                  Maps overview
                </h6>
                <p className="mb-0 text-sm leading-normal ">
                  <i className="fa fa-arrow-up text-emerald-500"></i>
                </p>
              </div>

              <div className="flex-auto p-4 rounded-2xl border-0">
                <MapContainer
                  center={userLocation} // Center map on user's location or default location
                  zoom={13}
                  className="h-96 rounded-2xl shadow-md"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {/* Komponen untuk animasi flyTo ke lokasi GPS */}
                  <FlyToLocation location={userLocation} />

                  {userLocation && (
                    <Marker position={userLocation} icon={blueIcon}>
                      <Popup>Lokasi Anda</Popup>
                    </Marker>
                  )}
                  {parkiritem.map((item, index) => (
                    <Marker
                      key={index}
                      position={[item.latitude, item.longitude]}
                      icon={redIcon}
                    >
                      <Popup>Lokasi Pelanggaran Parkir Liar</Popup>
                    </Marker>
                  ))}
                  {petugasitem.map((item, index) => (
                    <Marker
                      key={index}
                      position={[item.latitude, item.longitude]}
                      icon={yellowIcon}
                    >
                      <Popup>Lokasi Petugas</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
            {/* End Maps */}
          </div>

          <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
            <div
              slider
              class="relative w-full h-full overflow-hidden rounded-2xl"
            >
              <div
                slide
                class="absolute w-full h-full transition-all duration-500"
              >
                <img
                  class="object-cover h-full"
                  src="../assets/img/carousel-1.jpg"
                  alt="carousel image"
                />
                <div class="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
                  <div class="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
                    <i class="top-0.75 text-xxs relative text-slate-700 ni ni-camera-compact"></i>
                  </div>
                  <h5 class="mb-1 text-white">Ur report will help Us</h5>
                  <p class="">
                    There’s nothing I really wanted to do in life that I wasn’t
                    able to get good at.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap mt-6 -mx-3">
          <div class="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
            <TableParkirBeranda Tittle="PL Table's " />
          </div>
          <div class="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
            <TablePetugasBeranda Tittle="PTL Table's " />
          </div>
        </div>
      </div>
    </div>
  );
};
