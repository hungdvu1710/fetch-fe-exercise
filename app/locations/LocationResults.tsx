import React from "react";
import { Location } from "../types";
import { Flex } from "@radix-ui/themes";
import LocationCard from "./LocationCard";
import { useGlobalContext } from "../Context/store";

const LocationResults = () => {
  const { locationList } = useGlobalContext();
  return (
    <Flex gap="3" wrap="wrap">
      {locationList.map((location: Location) => {
        return <LocationCard key={location.zip_code} location={location} />;
      })}
    </Flex>
  );
};

export default LocationResults;
