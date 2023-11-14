export interface FavoriteDog {
  age: number;
  breed: string;
  id: string;
  name: string;
  img: string;
}

export interface DogCardProps {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface Coordinates {
  lat: number;
  lon: number;
}

