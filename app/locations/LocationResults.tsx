import React from "react";
import { Location } from "../types";
import { Flex } from "@radix-ui/themes";
import LocationCard from "./LocationCard";

const LocationResults = ({
  location_list,
}: {
  location_list: Array<Location>;
}) => {
  return (
    <Flex gap="3" wrap="wrap">
      {location_list.map((location: Location) => {
        return <LocationCard key={location.zip_code} location={location} />;
      })}
    </Flex>
  );
};

export default LocationResults;
