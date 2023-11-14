"use client";
import { Heading } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import LoginErrorDialog from "../components/LoginErrorDialog";
import DogResults from "./DogResults";
// import DogSearchForm from "./DogSearchForm";
import DogPagination from "../components/DogPagination";
import NavBar from "../components/NavBar";
import { useGlobalContext } from "../Context/store";
import DogSearchForm from "./DogSearchForm";

const breeds_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/breeds";

const Dogs = () => {
  const [paginationUrls, setPaginationUrls] = useState({ prev: "", next: "" });
  const [breeds, setBreeds] = React.useState<Array<string>>([]);
  const { dogIds, setIsAuthenticated } = useGlobalContext();

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
      <NavBar />
      <Heading>Let&rsquo;s look for your dogs</Heading>
      <LoginErrorDialog />
      <DogSearchForm
        breeds={breeds}
        setPaginationUrls={setPaginationUrls}
      />
      {dogIds.length > 0 && (
        <DogResults />
      )}
      <DogPagination
        setPaginationUrls={setPaginationUrls}
        next={paginationUrls.next}
        prev={paginationUrls.prev}
      />
    </div>
  );
};

export default Dogs;
