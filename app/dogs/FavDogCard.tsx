import { Avatar, Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import React from "react";
import { FavoriteDog } from "../types";
import { Cross2Icon } from '@radix-ui/react-icons';
import { useGlobalContext } from "../Context/store";


const FavDogCard = ({ props }: { props: FavoriteDog }) => {
  const { favoriteList, setFavoriteList } = useGlobalContext();
  const handleClick = () => {
    const updatedFavList = favoriteList.filter((dog: FavoriteDog) => dog.id !== props.id);
    setFavoriteList(updatedFavList)
  }

  return (
    <Card style={{ maxWidth: 300 }}>
      <Flex gap="3" align="center">
        <Avatar size="3" src={props.img} radius="full" fallback="T" />
        <Box>
          <Flex align="center" justify="between">
            <Text as="div" size="3" weight="bold">
              {props.name}
            </Text>
            <IconButton size="1" color="red" radius="large" variant="ghost" asChild onClick={handleClick}>
              <Cross2Icon />
            </IconButton>
          </Flex>
          <Text as="div" size="2" color="gray">
            Age: {props.age} - Breed: {props.breed}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default FavDogCard;
