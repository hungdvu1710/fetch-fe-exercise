import { Avatar, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect } from "react";
import { DogCardProps } from "../types";
import Head from "next/head";

const dogs_search_with_ids_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs";

const MatchedDogCard = ({ matchedId }: { matchedId: string }) => {
  const [matchedDog, setMatchedDog] = React.useState<DogCardProps>({
    name: "",
    breed: "",
    age: 0,
    img: "",
    id: matchedId,
    zip_code: "",
  });
  useEffect(() => {
    const getDogsWithIds = async () => {
      const response = await axios.post(dogs_search_with_ids_url, [matchedId], {
        withCredentials: true,
      });
      console.log(response.data);
      setMatchedDog(response.data[0]);
    };

    getDogsWithIds();
  }, [matchedId]);

  return (
    <Card size="3" style={{ width: 500 }}>
      <Heading size="3">Your Match!!!</Heading>
      <Flex gap="4" align="center">
        <Avatar
          size="6"
          src={matchedDog.img}
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="4" weight="bold">
          {matchedDog.name}
          </Text>
          <Text as="div" size="4" color="gray">
            Age: {matchedDog.age} - Breed: {matchedDog.breed}
          </Text>
          <Text as="div" size="4" color="gray">
            Zip Code: {matchedDog.zip_code}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default MatchedDogCard;
