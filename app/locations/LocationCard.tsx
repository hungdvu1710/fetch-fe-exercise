import React from "react";
import { Location } from "../types";
import { Card, Text } from "@radix-ui/themes";

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <Card variant="classic" style={{ maxWidth: 300 }} data-testId="location-card">
      <Text as="div" size="2" weight="bold">
        {location.city}, {location.state}
      </Text>
      <Text as="div" size="2" weight="bold">
        County: {location.county}
      </Text>
      <Text as="div" color="gray" size="2">
        Zip Code: {location.zip_code}
      </Text>
      <Text as="div" color="gray" size="2">
        Latitude: {location.latitude} - Longitude: {location.longitude}
      </Text>
    </Card>
  );
};

export default LocationCard;
