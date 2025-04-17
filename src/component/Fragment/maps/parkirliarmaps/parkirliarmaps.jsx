import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationMarker = ({ onLocationClick }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationClick(lat, lng);
    },
  });

  const locateUser = () => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationClick(e.latlng.lat, e.latlng.lng);
      map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
    });
  };

  // Automatically locate user when component is mounted
  useEffect(() => {
    locateUser();
  }, []); // Empty dependency array ensures this runs only once on mount

  return position === null ? null : (
    <>
      <Marker position={position}></Marker>
      <button
        className="bg-blue-200"
        onClick={locateUser}
        onTouchStart={locateUser}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        GPS
      </button>
    </>
  );
};

const ParkirLiarmaps = ({ onLocationClick }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[-6.2, 106.816666]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onLocationClick={onLocationClick} />
      </MapContainer>
    </div>
  );
};

export default ParkirLiarmaps;
