import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Buat custom icon marker
const createMarkerIcon = () => {
  return L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div style="
        position: relative;
        width: 30px;
        height: 30px;
        background: #4285F4;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
      ">
        <div style="
          position: absolute;
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const LocationMarker = ({ onLocationClick }) => {
  const map = useMap();
  const [position, setPosition] = React.useState(null);

  const handleLocationFound = (e) => {
    const { lat, lng } = e.latlng;
    setPosition(e.latlng);
    onLocationClick(lat, lng);
    map.flyTo(e.latlng, 16);
  };

  const locateUser = () => {
    map.locate({
      setView: true,
      maxZoom: 16,
      timeout: 10000,
      enableHighAccuracy: true,
    });
  };

  React.useEffect(() => {
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onLocationClick(lat, lng);
    });

    map.on("locationfound", handleLocationFound);
    map.on("locationerror", (e) => {
      alert("Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin diberikan.");
      console.error(e.message);
    });

    return () => {
      map.off("click");
      map.off("locationfound", handleLocationFound);
      map.off("locationerror");
    };
  }, [map, onLocationClick]);

  return (
    <>
      <button
        onClick={locateUser}
        className="leaflet-control-locate"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "8px",
          borderRadius: "4px",
          cursor: "pointer",
          boxShadow: "0 1px 5px rgba(0,0,0,0.4)",
          border: "none",
        }}
        title="Lokasi Saya"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#4285F4"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      </button>
      {position && (
        <Marker
          position={position}
          icon={createMarkerIcon()}
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              setPosition(e.target.getLatLng());
              onLocationClick(lat, lng);
            },
          }}
          draggable={true}
        >
          <Popup>
            <div>
              <strong>Lokasi Terpilih</strong>
              <br />
              Lat: {position.lat.toFixed(6)}
              <br />
              Lng: {position.lng.toFixed(6)}
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export const Petugasliarmaps = ({ onLocationClick }) => {
  return (
    <MapContainer
      center={[-6.2, 106.816666]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationClick={onLocationClick} />
    </MapContainer>
  );
};
