import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import React from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

interface Props {
  value: "tracked" | "others"
  onChange: (value: "tracked" | "others") => void
  onSearch: (term: string) => void
}

const FilterBar: React.FC<Props> = ({ value, onChange, onSearch }) => {
  const [searchInput, setSearchInput] = React.useState("")

  const handleSearch = () => {
    onSearch(searchInput.trim())
  }

  return (
    <div className="flex flex-wrap items-center justify-between bg-deep-navy p-4 text-white border-b-2 border-[#001E2E]">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">Lista</span>

        <RadioGroup
          value={value}
          onValueChange={(v) => onChange(v as "tracked" | "others")}
          className="flex gap-4"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="tracked" id="tracked" />
            <span className="text-sm">Rastreados</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="others" id="others" />
            <span className="text-sm">Outros</span>
          </label>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <Input
          type="text"
          placeholder="Buscar por placa ou frota"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
    </div>
  )
}

export default FilterBar
