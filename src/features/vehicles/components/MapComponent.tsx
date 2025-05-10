import React, { useState } from "react"
import {
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
  OverlayView
} from "@react-google-maps/api"
import { Car } from "lucide-react"
import { useMapViewModel } from "../viewmodel/useMapViewModel"

const containerStyle = {
  width: "100%",
  height: "400px"
}

const MapComponent: React.FC = () => {
  const { positions, loading, error } = useMapViewModel()
  const [selected, setSelected] = useState<string | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const defaultCenter = positions[0]
    ? { lat: positions[0].lat, lng: positions[0].lng }
    : { lat: -10.0, lng: -50.0 }

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2)
  })

  return (
    <div className="w-full p-6 mb-6 bg-[#001622] border-[#002D44] rounded-md border-1">
      <div>
        <span className="text-white font-bold">Mapa rastreador</span>
      </div>

      {loading && <p className="text-white mt-2">Carregando localização...</p>}
      {error && <p className="text-red-500 mt-2">Erro: {error}</p>}

      {isLoaded && positions.length > 0 && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={6}
        >
          {positions.map((vehicle) => (
            <OverlayView
              key={vehicle.id}
              position={{ lat: vehicle.lat, lng: vehicle.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelected(vehicle.id)}
              >
                <div className="relative flex items-center justify-center">
                  <div className="rounded-full bg-[#FF4B00] border-[3px] border-white p-2 shadow-lg">
                    <Car className="text-white" size={24} />
                  </div>
                  <div className="absolute bottom-[-6px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#FF4B00]" />
                </div>

              </div>
            </OverlayView>
          ))}

          {positions.map(vehicle => (
            selected === vehicle.id && (
              <InfoWindow
                key={`info-${vehicle.id}`}
                position={{ lat: vehicle.lat, lng: vehicle.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <p><strong>Placa:</strong> {vehicle.plate}</p>
                  <p><strong>Ignição:</strong> {vehicle.ignition}</p>
                  <p><strong>Rastreador:</strong> {vehicle.name}</p>
                  <p><strong>Frota:</strong> {vehicle.fleet ?? "N/A"}</p>
                </div>
              </InfoWindow>
            )
          ))}
        </GoogleMap>
      )}
    </div>
  )
}

export default MapComponent
