import React from 'react';
import { Button } from '../../components/ui/button';

const FilterBar: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-deep-navy p-4 rounded-md text-white">
      {/* Esquerda: Label e radios */}
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">Lista</span>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="filter"
            className="accent-blue-500"
            defaultChecked
          />
          <span className="text-sm">Rastreados</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="filter"
            className="accent-blue-500"
          />
          <span className="text-sm">Outros</span>
        </label>
      </div>

      {/* Direita: Input + botão */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <input
          type="text"
          placeholder="Buscar por placa ou frota"
          className="px-4 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button>Teste</Button>
      </div>
    </div>
  );
};

export default FilterBar;
