import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import React from "react";
import axios from "axios";
import { z } from "zod";
import { locationSearchSchema } from "../validationSchema";
import { useGlobalContext } from "../Context/store";

type locationSearchInputs = z.infer<typeof locationSearchSchema>;
interface Props {
  requestBody: locationSearchInputs;
  setRequestBody: React.Dispatch<React.SetStateAction<locationSearchInputs>>;
  numResults: number
}
const locations_search_url =
  process.env.NEXT_PUBLIC_BASE_URL + "/locations/search";

const LocationPagination = ({ requestBody, setRequestBody, numResults }: Props) => {
  const { setLocationList, setIsAuthenticated } = useGlobalContext();
  const changePage = async (from: number) => {
    try {
      const response = await axios.post(locations_search_url, { ...requestBody, from }, {
        withCredentials: true,
      });
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      } else {
        setIsAuthenticated(true);
        setLocationList(response.data.results);
        setRequestBody({ ...requestBody, from });
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
    return;
  }

  const checkIfNext = () => {
    if (!requestBody.from) {
      if (numResults <= 25) {
        return false;
      }
    } else {
      if (requestBody.from + 25 >= numResults) {
        return false;
      }
    }
    return true;
  }

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={!requestBody.from}
        onClick={() => changePage(requestBody.from ? requestBody.from - 25 : 0)}
        data-testid="backward-pagination"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={!checkIfNext()}
        onClick={() => changePage(requestBody.from ? requestBody.from + 25 : 25)}
        data-testid="forward-pagination"
      >
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default LocationPagination;
