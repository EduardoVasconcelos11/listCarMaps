import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {
  const position: [number, number] = [-9.597, -35.954]; // Pilar, Alagoas

  return (
    <div className="h-96 w-full">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Veículo localizado aqui.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
