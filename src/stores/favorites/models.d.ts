export interface FavoriteCity {
  id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
}
export type ToggleFavoriteResult = "added" | "removed" | "max";