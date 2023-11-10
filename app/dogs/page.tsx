"use client";
import { Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoginErrorDialog from "../components/LoginErrorDialog";
import DogResults from "./DogResults";
import DogSearchForm from "./DogSearchForm";
import Pagination from "../components/Pagination";

const breeds_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/breeds";

const Dogs = ({
  searchParams,
}: {
  searchParams: {
    page: number;
    size: number;
  };
}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [paginationUrls, setPaginationUrls] = useState({ prev: "", next: "" });
  const [breeds, setBreeds] = React.useState([]);
  const [dogIds, setDogIds] = React.useState([]);

  //pre-load breeds
  const getBreeds = async () => {
    try {
      const response = await fetch(breeds_url, { credentials: "include" });
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      } else {
        setIsAuthenticated(true);
      }
      const fetch_breeds = await response.json();
      setBreeds(fetch_breeds);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <div className="space-y-3">
      <Heading>Let&rsquo;s look for your dogs</Heading>
      <LoginErrorDialog isAuthenticated={isAuthenticated} />
      <DogSearchForm
        breeds={breeds}
        setDogIds={setDogIds}
        setPaginationUrls={setPaginationUrls}
      />
      {dogIds.length > 0 && <DogResults dogIds={dogIds} />}
      <Pagination
        setDogIds={setDogIds}
        setPaginationUrls={setPaginationUrls}
        next={paginationUrls.next}
        prev={paginationUrls.prev}
      />
    </div>
  );
};

export default Dogs;
