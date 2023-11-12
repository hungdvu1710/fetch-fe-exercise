import React from "react";
import { FavoriteDog } from "../types";
import { useGlobalContext } from "../Context/store";
import FavDogCard from "./FavDogCard";

const FavDogs = () => {
  const { favoriteList } = useGlobalContext();
  return (
    <div>
      {favoriteList.map((dog: FavoriteDog) => {
        return <FavDogCard key={dog.id} props={dog} />;
      })}
    </div>
  );
};

export default FavDogs;
