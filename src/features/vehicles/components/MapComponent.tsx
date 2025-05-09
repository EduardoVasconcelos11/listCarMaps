import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent: React.FC = () => {
  const position: [number, number] = [-9.597, -35.954]; // Pilar, Alagoas

  return (
    <div className="h-100 w-full p-6 mb-6 bg-[#001622] border-[#002D44] rounded-md border-1">
      <div>
        <span className='text-white font-bold'>Mapa rastreador</span>
      </div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-75 mt-3 w-full rounded-md border-1">
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
