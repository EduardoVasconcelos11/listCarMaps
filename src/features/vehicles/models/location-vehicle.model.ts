export interface LocationVehicle {
  id: string
  plate: string
  fleet: string | null
  equipmentId: string
  name: string
  ignition: string
  lat: number
  lng: number
  createdAt: string
}
