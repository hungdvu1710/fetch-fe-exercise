import React from "react";
import { FavoriteDog } from "../types";
import { useGlobalContext } from "../Context/store";
import FavDogCard from "./FavDogCard";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";

const dogs_match_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/match";

const FavDogs = () => {
  const { favoriteList } = useGlobalContext();
  const handleClick = async () => {
    const data = favoriteList.map((dog: FavoriteDog) => dog.id);
    const response = await axios.post(dogs_match_url, data, {
      withCredentials: true,
    });

    const { match } = response.data;

    console.log(match);
    return;
  }

  return (
    <div className="space-y-3">
      {favoriteList.length > 0 && <Button className="ml-3 mt-2" onClick={handleClick}>Let&rsquo;s match you with a great dog!!!</Button>}
      <Flex gap="3" className="m-3" wrap="wrap" align="stretch">
        {favoriteList.map((dog: FavoriteDog) => {
          return <FavDogCard key={dog.id} props={dog} />;
        })}
      </Flex>
    </div>
  );
};

export default FavDogs;
