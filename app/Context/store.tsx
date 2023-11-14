'use client';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FavoriteDog, Location } from "../types";

interface GlobalContextProps {
  favoriteList: Array<FavoriteDog>;
  setFavoriteList: Dispatch<SetStateAction<Array<FavoriteDog>>>;
  dogIds: Array<string>;
  setDogIds: Dispatch<SetStateAction<Array<string>>>;
  locationList: Array<Location>;
  setLocationList: Dispatch<SetStateAction<Array<Location>>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  favoriteList: [],
  setFavoriteList: (): FavoriteDog[] => [],
  dogIds: [],
  setDogIds: (): string[] => [],
  locationList: [],
  setLocationList: (): Location[] => [],
  isAuthenticated: true,
  setIsAuthenticated: (): boolean => true,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteList, setFavoriteList] = useState<Array<FavoriteDog>>([]);
  const [dogIds, setDogIds] = useState<Array<string>>([]);
  const [locationList, setLocationList] = useState<Array<Location>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <GlobalContext.Provider value={{ favoriteList, setFavoriteList, dogIds, setDogIds, locationList, setLocationList, isAuthenticated, setIsAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
