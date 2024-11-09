import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const LocationMarker = ({ onLocationClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationClick(lat, lng); // Call the function to update the parent component
    },
  });

  return null; // This component does not render anything itself
};

const ParkirLiarmaps = ({ onLocationClick }) => {
  return (
    <MapContainer
      center={[-6.2, 106.816666]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationClick={onLocationClick} />{" "}
      {/* Add the location marker for handling clicks */}
    </MapContainer>
  );
};

export default ParkirLiarmaps;
