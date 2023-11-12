import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FavoriteDog } from "../types";

const FavDogCard = ({ props }: { props: FavoriteDog }) => {
  return (
    <Card style={{ maxWidth: 240 }}>
      <Flex gap="3" align="center">
        <Avatar
          size="3"
          src={props.img}
          radius="full"
          fallback="T"
        />
        <Box>
          <Text as="div" size="2" weight="bold">
            {props.name}
          </Text>
          <Text as="div" size="2" color="gray">
            Age: {props.age} - Breed: {props.breed}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default FavDogCard;
