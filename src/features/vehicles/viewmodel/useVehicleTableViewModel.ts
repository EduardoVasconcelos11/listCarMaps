import { useEffect, useState } from "react"
import { http } from "../../../core/service/http"
import { ENDPOINTS } from "../../../core/utils/EndPoints"
import type { LocationVehicle } from "../models/location-vehicle.model"
import type { Vehicle } from "../models/vehicle.model"
import type { APIResponse } from "../repository/dto/vehicle-response.dto"

function getLatestLocationsPerPlate(data: LocationVehicle[] = []): LocationVehicle[] {
  const map = new Map<string, LocationVehicle>()

  for (const loc of data) {
    const existing = map.get(loc.plate)
    if (!existing || new Date(loc.createdAt) > new Date(existing.createdAt)) {
      map.set(loc.plate, loc)
    }
  }

  return Array.from(map.values())
}

export function useVehicleTableViewModel(type: "tracked" | "others") {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [locations, setLocations] = useState<LocationVehicle[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<string>("") 

  const fetchVehicles = async (currentPage: number, reset = false, vehicle:string = '') => {
    if (loading || (!hasMore && !reset)) return
    setLoading(true)

    try {
      const queryParams = new URLSearchParams({
        type,
        page: currentPage.toString(),
        perPage: "20"
      })

      console.log('Antes '+filter);
      if (vehicle.trim() !== "") {
        queryParams.set("filter", vehicle.trim())
      }
      console.log('depois '+filter);

      const response = await http<APIResponse>(`${ENDPOINTS.VEHICLES}?${queryParams.toString()}`)

      const mappedVehicles = response.content.vehicles.map((v): Vehicle => ({
        id: v.id,
        placa: v.plate,
        frota: v.fleet,
        tipo: v.type,
        modelo: v.model,
        status: v.status
      }))

      setVehicles(prev => {
        const merged = reset ? mappedVehicles : [...prev, ...mappedVehicles]
        return Array.from(new Map(merged.map(v => [v.id, v])).values())
      })

      setLocations(prev => {
        const merged = reset ? response.content.locationVehicles : [...prev, ...response.content.locationVehicles]
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

  const search = (term: string) => {
    console.log('Antes de setar', term);
    setFilter(term)
    setVehicles([])
    console.log('Depois de setar', term);
    setLocations([])
    setPage(1)
    setHasMore(true)
    fetchVehicles(1, true, term)
  }

  useEffect(() => {
    fetchVehicles(1, true)
  }, [type])

  return {
    vehicles,
    locations,
    hasMore,
    loading,
    nextPage: () => fetchVehicles(page),
    search
  }
}
