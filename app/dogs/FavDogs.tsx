import React, { useState } from "react";
import { FavoriteDog } from "../types";
import { useGlobalContext } from "../Context/store";
import FavDogCard from "./FavDogCard";
import { Button, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import MatchedDogCard from "./MatchedDogCard";

const dogs_match_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/match";

const FavDogs = () => {
  const { favoriteList, setIsAuthenticated } = useGlobalContext();
  const [ matchedId, setMatchedId ] = useState('');

  const handleClick = async () => {
    const data = favoriteList.map((dog: FavoriteDog) => dog.id);
    try {
      const response = await axios.post(dogs_match_url, data, {
        withCredentials: true,
      });
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      } else {
        const { match } = response.data;
        setMatchedId(match);
        return;
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  return (
    <div className="space-y-3 ml-3">
      {favoriteList.length === 0 && <Heading>Your favorite Dogs will appear here</Heading>}
      {favoriteList.length > 0 && <Button className="mt-2" onClick={handleClick}>Let&rsquo;s match you with a great dog!!!</Button>}
      {matchedId && <MatchedDogCard matchedId={matchedId} />}
      <Flex gap="3" wrap="wrap">
        {favoriteList.map((dog: FavoriteDog) => {
          return <FavDogCard key={dog.id} props={dog} />;
        })}
      </Flex>
    </div>
  );
};

export default FavDogs;
