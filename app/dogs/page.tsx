"use client";
import {
  Button,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Select, initTE, Input } from "tw-elements";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import { dogSearchSchema } from "../validationSchema";
import LoginErrorDialog from "../components/LoginErrorDialog";

const breeds_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/breeds";

type dogSearchInputs = z.infer<typeof dogSearchSchema>;

const Dogs = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dogSearchInputs>({
    resolver: zodResolver(dogSearchSchema),
  });
  const returnToLoginPage = () => {
    router.push("/");
  }

  const [breeds, setBreeds] = React.useState([]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    console.log(errors);
    return;
  });

  useEffect(() => {
    const init = async () => {
      initTE({ Select, Input });
    };
    init();
  }, []);

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
      <LoginErrorDialog isAuthenticated={isAuthenticated} returnToLoginPage={returnToLoginPage} />
      <form className="my-2 space-y-3 max-w-xl" onSubmit={onSubmit}>
        <select
          data-te-select-init
          data-te-select-clear-button="true"
          multiple
          data-te-select-placeholder="Select Breeds"
          {...register("breeds")}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        {/* <TextFieldRoot>
          <TextFieldInput placeholder="Zip Codes (Please Separate by Commas)" />
        </TextFieldRoot> */}
        <TextFieldRoot>
          <TextFieldInput
            placeholder="Age Min"
            type="number"
            {...register("agemin", {
              setValueAs: (value) => Number(value),
            })}
          />
        </TextFieldRoot>
        <ErrorMessage>{errors.agemin?.message}</ErrorMessage>
        <TextFieldRoot>
          <TextFieldInput
            placeholder="Age Max"
            type="number"
            {...register("agemax", {
              setValueAs: (value) => Number(value),
            })}
          />
        </TextFieldRoot>
        <ErrorMessage>{errors.agemax?.message}</ErrorMessage>
        <Button>Get Dogs</Button>
      </form>
    </div>
  );
};

export default Dogs;
