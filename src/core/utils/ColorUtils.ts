const colorPalette = [
  "#FF4B00", "#00C49A", "#FFBB28", "#8884D8",
  "#FF69B4", "#00BFFF", "#8BC34A", "#CDDC39",
]

export function getColorByVehicleId(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colorPalette.length
  return colorPalette[index]
}
