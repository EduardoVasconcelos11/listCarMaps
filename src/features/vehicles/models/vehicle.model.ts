export interface Vehicle {
  id: string
  placa: string
  frota: string | null
  tipo: string
  modelo: string
  status: string
}

export interface VehicleApi {
  id: string
  plate: string
  fleet: string | null
  type: string
  model: string
  nameOwner: string
  status: string
  createdAt: string
}
