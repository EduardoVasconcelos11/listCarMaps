import { useState, useEffect } from "react"

//Colocar em models
export interface Vehicle {
  id: number
  placa: string
  frota: string
  tipo: string
  modelo: string
  status: string
}

export function useVehicleTableViewModel() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      await new Promise((r) => setTimeout(r, 300))

      const newVehicles = Array.from({ length: 10 }).map((_, idx) => ({
        id: (page - 1) * 10 + idx + 1,
        placa: `ABC-${idx + 100}`,
        frota: `Frota ${Math.floor(Math.random() * 5) + 1}`,
        tipo: "Caminhão",
        modelo: `Modelo ${Math.floor(Math.random() * 100)}`,
        status: Math.random() > 0.5 ? "Ativo" : "Inativo"
      }))

      setVehicles((prev) => [...prev, ...newVehicles])
      if (page >= 5) setHasMore(false)
    }

    fetchVehicles()
  }, [page])

  return {
    vehicles,
    hasMore,
    nextPage: () => setPage((prev) => prev + 1),
  }
}
