import { useEffect, useState } from "react"
import { http } from "../../../core/service/http"
import { ENDPOINTS } from "../../../core/utils/EndPoints"

export interface Vehicle {
  id: string
  placa: string
  frota: string | null
  tipo: string
  modelo: string
  status: string
}

interface VehicleApi {
  id: string
  plate: string
  fleet: string | null
  type: string
  model: string
  nameOwner: string
  status: string
  createdAt: string
}

interface APIResponse {
  content: {
    vehicles: VehicleApi[]
    totalPages: number
    page: number
    perPage: number
  }
}

export function useVehicleTableViewModel() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
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

      const mapped = response.content.vehicles.map((v): Vehicle => ({
        id: v.id,
        placa: v.plate,
        frota: v.fleet,
        tipo: v.type,
        modelo: v.model,
        status: v.status
      }))

      setVehicles((prev) => {
        const merged = [...prev, ...mapped]
        const unique = Array.from(new Map(merged.map(v => [v.id, v])).values())
        return unique
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
    hasMore,
    loading,
    nextPage: () => fetchVehicles(page)
  }
}
