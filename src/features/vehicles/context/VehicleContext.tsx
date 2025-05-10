// context/VehicleContext.tsx
import React, { createContext, useContext } from "react"
import type { Vehicle } from "../models/vehicle.model"
import type { LocationVehicle } from "../models/location-vehicle.model"


interface VehicleContextType {
  vehicles: Vehicle[]
  locations: LocationVehicle[]
}

const VehicleContext = createContext<VehicleContextType>({ vehicles: [], locations: [] })

export const useVehicleContext = () => useContext(VehicleContext)

export const VehicleProvider: React.FC<{
  children: React.ReactNode
  value: VehicleContextType
}> = ({ children, value }) => (
  <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
)
