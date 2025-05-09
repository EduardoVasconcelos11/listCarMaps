import React from 'react';
import Header from '../core/components/Header';
import MapComponent from '../features/vehicles/components/MapComponent';
import VehicleTable from '../features/vehicles/components/VehicleTable';
import Footer from '../core/components/Footer';

const Dashboard: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-[#000F17]">
    <Header />
    <main className="flex-grow p-4">
      <MapComponent />
      <div className="mt-4">
        <VehicleTable />
      </div>
    </main>
    <Footer />
  </div>
);

export default Dashboard;
