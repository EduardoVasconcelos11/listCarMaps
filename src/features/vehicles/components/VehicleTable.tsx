import React from "react"
import { useVehicleTableViewModel } from "../viewmodel/useVehicleTableViewModel"
import { useInfiniteScroll } from "../../../core/hooks/useInfiniteScroll"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"

const VehicleTable: React.FC = () => {
  const { vehicles, hasMore, nextPage, loading } = useVehicleTableViewModel()
  const sentinelRef = useInfiniteScroll({ hasMore, onLoadMore: nextPage, loading })


  return (
    <div className="overflow-auto max-h-[500px] border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Frota</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.placa}</TableCell>
              <TableCell>{vehicle.frota}</TableCell>
              <TableCell>{vehicle.tipo}</TableCell>
              <TableCell>{vehicle.modelo}</TableCell>
              <TableCell>{vehicle.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={sentinelRef} className="h-6" />
    </div>
  )
}

export default VehicleTable
