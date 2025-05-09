import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const FilterBar: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between bg-deep-navy p-4 text-white border-b-2 border-[#001E2E]">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">Lista</span>

        <RadioGroup defaultValue="rastreados" className="flex gap-4" name="filter">
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="rastreados" id="rastreados" />
            <span className="text-sm">Rastreados</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="outros" id="outros" />
            <span className="text-sm">Outros</span>
          </label>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <Input type="text" placeholder="Buscar por placa ou frota" />
        <Button>Teste</Button>
      </div>
    </div>
  )
}

export default FilterBar
