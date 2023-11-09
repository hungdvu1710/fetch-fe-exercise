import React, { useEffect } from "react";
import DogCard from "./DogCard";
import axios from "axios";
import { Flex, Grid } from "@radix-ui/themes";

const dogs_search_with_ids_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs";

interface DogCardProps {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

const DogResults = ({ dogIds }: { dogIds: Array<number> }) => {
  const [dogs, setDogs] = React.useState([]);

  const getDogsWithIds = async () => {
    const response = await axios.post(dogs_search_with_ids_url, dogIds, {
      withCredentials: true
    });

    setDogs(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getDogsWithIds();
  }, []);

  return (
  <Grid columns="6" gap="3" width="auto">
    {dogs.map((dog: DogCardProps) => {
      return <DogCard props={dog} key={dog.id} />;
    })}  
  </Grid>
  );
};

export default DogResults;
