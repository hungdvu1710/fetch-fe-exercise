import React from "react";
import { Card, Inset, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";

/* 
age: 5
breed: "Afghan Hound"
id: "UXGFTIcBOvEgQ5OCx5kh"
img: "https://frontend-take-home.fetch.com/dog-images/n02088094-Afghan_hound/n02088094_10263.jpg"
name: "Trisha"
zip_code: "24431" */

interface DogCardProps {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

const DogCard = ({ props }: { props: DogCardProps }) => {
  return (
    <Card>
      <Inset clip="padding-box" side="top" pb="current">
        <Image
          src={props.img}
          alt={props.name}
          width={200}
          height={140}
          style={{
            objectFit: "cover",
            height: "200px",
            width: "100%",
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <Text as="div" size="4" weight="bold">
        <Strong>{props.name}</Strong>
      </Text>
      <Text as="div" size="3">
        Age: {props.age} - Breeds: {props.breed}
      </Text>
    </Card>
  );
};

export default DogCard;
