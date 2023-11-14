import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useGlobalContext } from "../Context/store";
import React from "react";
import axios from "axios";

interface Props {
  prev?: string;
  next?: string;
  setPaginationUrls: React.Dispatch<
    React.SetStateAction<{ prev: string; next: string }>
  >;
}

const DogPagination = ({ prev, next, setPaginationUrls }: Props) => {
  const { setDogIds } = useGlobalContext();
  // return null if there's no need for pagination
  if (!next && !prev) return null;

  const changePage = async (url: string | undefined) => {
    if (!url) return;
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + url, {
      withCredentials: true,
    });
    const dogs_list = response.data;
    setDogIds(dogs_list.resultIds);
    setPaginationUrls({
      next: response.data.next ?? "",
      prev: response.data.prev ?? "",
    });
    return;
  };

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={!prev}
        onClick={() => changePage(prev)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={!next}
        onClick={() => changePage(next)}
      >
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default DogPagination;
