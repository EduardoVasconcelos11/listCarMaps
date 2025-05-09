import React from 'react';

const VehicleTable: React.FC = () => {
  // Dados de exemplo
  const vehicles = [
    { id: 1, name: 'Veículo 1', status: 'Ativo' },
    { id: 2, name: 'Veículo 2', status: 'Inativo' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="py-2 px-4 border-b">{vehicle.id}</td>
              <td className="py-2 px-4 border-b">{vehicle.name}</td>
              <td className="py-2 px-4 border-b">{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
