export interface City {
  name: string;
  ukName?: string;
  enName?: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
export interface AutocompleteCity {
  name: string;
  lat: number;
  lon: number;
  label: string;
  id: string;
}