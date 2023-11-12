'use client';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FavoriteDog } from "../types";

interface GlobalContextProps {
  favoriteList: Array<FavoriteDog>;
  setFavoriteList: Dispatch<SetStateAction<Array<FavoriteDog>>>;
  dogIds: Array<string>;
  setDogIds: Dispatch<SetStateAction<Array<string>>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  favoriteList: [],
  setFavoriteList: (): FavoriteDog[] => [],
  dogIds: [],
  setDogIds: (): string[] => [],
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteList, setFavoriteList] = useState<Array<FavoriteDog>>([]);
  const [dogIds, setDogIds] = useState<Array<string>>([]);

  return (
    <GlobalContext.Provider value={{ favoriteList, setFavoriteList, dogIds, setDogIds }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
