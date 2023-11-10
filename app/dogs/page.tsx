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
  const returnToLoginPage = () => {
    router.push("/");
  };

  const [breeds, setBreeds] = React.useState([]);
  const [dogIds, setDogIds] = React.useState([]);
  const [total, setTotal] = React.useState(0);

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
    <div>
      <Heading>Let&rsquo;s look for your dogs</Heading>
      <LoginErrorDialog
        isAuthenticated={isAuthenticated}
        returnToLoginPage={returnToLoginPage}
      />
      <DogSearchForm
        breeds={breeds}
        setDogIds={setDogIds}
        setTotal={setTotal}
      />
      {dogIds.length > 0 && <DogResults dogIds={dogIds} />}
      <Pagination itemCount={total} pageSize={searchParams.size} currentPage={searchParams.page} />
    </div>
  );
};

export default Dogs;
