import { useEffect, useState } from "react"
import { http } from "../../../core/service/http"
import { ENDPOINTS } from "../../../core/utils/EndPoints"

interface LocationVehicle {
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

interface ApiResponse {
  content: {
    locationVehicles: LocationVehicle[]
  }
}

export function useMapViewModel() {
  const [positions, setPositions] = useState<LocationVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  let interval: NodeJS.Timeout

  async function load() {
    try {
      const data = await http<ApiResponse>(`${ENDPOINTS.VEHICLES}?type=tracked&page=1&perPage=40`)

      if (!data.content || !data.content.locationVehicles) {
        throw new Error("Nenhum veículo rastreado encontrado")
      }

      const latestLocations = getLatestLocationsPerPlate(data.content.locationVehicles)
      setPositions(latestLocations)
    } catch (err: any) {
      setError(err.message || "Erro ao buscar posições")
    } finally {
      setLoading(false)
    }
  }

  load()
  interval = setInterval(load, 2 * 60 * 1000)

  return () => clearInterval(interval)
}, [])

  return { positions, loading, error }
}

function getLatestLocationsPerPlate(data: LocationVehicle[]): LocationVehicle[] {
  const map = new Map<string, LocationVehicle>()

  for (const loc of data) {
    const existing = map.get(loc.plate)

    if (!existing || new Date(loc.createdAt) > new Date(existing.createdAt)) {
      map.set(loc.plate, loc)
    }
  }

  return Array.from(map.values())
}
