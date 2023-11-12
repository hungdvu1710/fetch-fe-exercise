import React from "react";
import { Card, Inset, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";
import { DogCardProps, FavoriteDog } from "../types";
import { useGlobalContext } from "../Context/store";

const DogCard = ({ props }: { props: DogCardProps }) => {
  const { favoriteList, setFavoriteList } = useGlobalContext();
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    if (!checked) {
      setChecked(true);
      const newFavDog = {
        age: props.age,
        breed: props.breed,
        id: props.id,
        name: props.name,
        img: props.img,
      }
      setFavoriteList((prev) => [...prev, newFavDog]);
    } else {
      const updatedFavList = favoriteList.filter((dog: FavoriteDog) => dog.id !== props.id);
      setFavoriteList(updatedFavList)
      setChecked(false);
    }
  }

  return (
    <Card>
      <Inset clip="padding-box" side="top" pb="current">
        <Image
          src={props.img}
          alt={props.name}
          width={200}
          height={300}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <Text as="div" size="4" weight="bold">
        <Strong>{props.name}</Strong>
      </Text>
      <div className="space-x-2">
        <input type="checkbox" id={props.id} onChange={handleChange}/>
        <label htmlFor={props.id}>Favorite</label>
      </div>
      <Text as="div" size="3">
        Age: {props.age} - Breed: {props.breed}
      </Text>
    </Card>
  );
};

export default DogCard;
