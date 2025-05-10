import { useEffect, useState } from "react"
import { http } from "../../../core/service/http"
import { ENDPOINTS } from "../../../core/utils/EndPoints"
import type { LocationVehicle } from "../models/location-vehicle.model"
import type { Vehicle } from "../models/vehicle.model"
import type { APIResponse } from "../repository/dto/vehicle-response.dto"

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

export function useVehicleTableViewModel() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [locations, setLocations] = useState<LocationVehicle[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchVehicles = async (currentPage: number) => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const response = await http<APIResponse>(
        `${ENDPOINTS.VEHICLES}?type=tracked&page=${currentPage}&perPage=20`
      )

      const mappedVehicles = response.content.vehicles.map((v): Vehicle => ({
        id: v.id,
        placa: v.plate,
        frota: v.fleet,
        tipo: v.type,
        modelo: v.model,
        status: v.status
      }))

      setVehicles((prev) => {
        const merged = [...prev, ...mappedVehicles]
        const unique = Array.from(new Map(merged.map(v => [v.id, v])).values())
        return unique
      })

      setLocations((prev) => {
        const merged = [...prev, ...response.content.locationVehicles]
        return getLatestLocationsPerPlate(merged)
      })

      setHasMore(response.content.page < response.content.totalPages)
      setPage(currentPage + 1)
    } catch (error) {
      console.error("Erro ao buscar veículos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles(1)
  }, [])

  return {
    vehicles,
    locations,
    hasMore,
    loading,
    nextPage: () => fetchVehicles(page)
  }
}
