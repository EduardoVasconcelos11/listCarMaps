import React from "react"
import { useInfiniteScroll } from "../../../core/hooks/useInfiniteScroll"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../components/ui/table"
import type { Vehicle } from "../models/vehicle.model"

interface VehicleTableProps {
  vehicles: Vehicle[]
  hasMore: boolean
  loading: boolean
  nextPage: () => void
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  hasMore,
  loading,
  nextPage
}) => {
  
  const sentinelRef = useInfiniteScroll<HTMLTableRowElement>({
    hasMore,
    onLoadMore: nextPage,
    loading,
  });


  return (
    <div className="overflow-auto max-h-[500px] border rounded-md bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Placa</TableHead>
            <TableHead>Frota</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle, index) => {
            const isLast = index === vehicles.length - 1

            return (
              <TableRow
                key={vehicle.id}
                ref={isLast ? sentinelRef : null}
              >
                <TableCell>{vehicle.placa}</TableCell>
                <TableCell>{vehicle.frota ?? "—"}</TableCell>
                <TableCell>{vehicle.tipo}</TableCell>
                <TableCell>{vehicle.modelo}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {loading && (
        <p className="text-sm text-gray-400 px-4 py-2 bg-[#001622]">Carregando...</p>
      )}
    </div>
  )
}

export default VehicleTable
