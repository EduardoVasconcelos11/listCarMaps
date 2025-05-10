import type { VehicleApi } from "../../models/vehicle.model"
import type { LocationVehicle } from "../../models/location-vehicle.model"

export interface APIResponse {
  content: {
    vehicles: VehicleApi[]
    locationVehicles: LocationVehicle[]
    totalPages: number
    page: number
    perPage: number
  }
}
