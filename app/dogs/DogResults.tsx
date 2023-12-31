import React, { useEffect } from "react";
import DogCard from "./DogCard";
import axios from "axios";
import { Grid } from "@radix-ui/themes";
import { useWindowSize, useEventListener } from "usehooks-ts";
import { DogCardProps } from "../types";
import { useGlobalContext } from "../Context/store";

const dogs_search_with_ids_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs";

const DogResults = () => {
  const { dogIds } = useGlobalContext();
  const [dogs, setDogs] = React.useState([]);
  const { width } = useWindowSize();
  const [numCols, setNumCols] = React.useState(
    Math.floor(window.innerWidth / 300)
  );

  const handleResize = () => {
    if (width < 300) {
      setNumCols(1);
    } else if (width < 600) {
      setNumCols(2);
    } else if (width < 900) {
      setNumCols(3);
    } else if (width < 1200) {
      setNumCols(4);
    } else if (width < 1600) {
      setNumCols(5);
    } else {
      setNumCols(6);
    }
  };

  useEventListener("resize", handleResize);

  useEffect(() => {
    const getDogsWithIds = async () => {
      const response = await axios.post(dogs_search_with_ids_url, dogIds, {
        withCredentials: true,
      });
      setDogs(response.data);
    };

    getDogsWithIds();
  }, [dogIds]);

  return (
    <Grid columns={numCols.toString()} gap="6" width="auto">
      {dogs.map((dog: DogCardProps) => {
        return <DogCard props={dog} key={dog.id} />;
      })}
    </Grid>
  );
};

export default DogResults;
