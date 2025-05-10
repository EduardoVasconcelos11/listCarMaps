import React from 'react'
import Header from '../core/components/Header'
import Footer from '../core/components/Footer'
import FilterBar from '../core/components/FilterBar'
import MapComponent from '../features/vehicles/components/MapComponent'
import { useVehicleTableViewModel } from '../features/vehicles/viewmodel/useVehicleTableViewModel'
import VehicleTable from '../features/vehicles/components/VehicleTable'

const Dashboard: React.FC = () => {
  const {
    vehicles,
    locations,
    loading,
    hasMore,
    nextPage
  } = useVehicleTableViewModel()

  return (
    <div className="flex flex-col min-h-screen bg-[#000F17]">
      <Header />
      <main className="flex-grow p-4">
        <FilterBar />
        <div className="mt-4">
          <MapComponent positions={locations} loading={loading} />
          <div className="mt-4">
            <VehicleTable
              vehicles={vehicles}
              hasMore={hasMore}
              loading={loading}
              nextPage={nextPage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
