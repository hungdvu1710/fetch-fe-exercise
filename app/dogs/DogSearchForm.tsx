import {
  Button,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { Select, initTE, Input } from "tw-elements";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { dogSearchSchema } from "../validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";

type dogSearchInputs = z.infer<typeof dogSearchSchema>;
const dogs_search_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/search";

const DogSearchForm = ({
  setDogIds,
  breeds,
}: {
  breeds: Array<string>;
  setDogIds: React.Dispatch<React.SetStateAction<Array<never>>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dogSearchInputs>({
    resolver: zodResolver(dogSearchSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.get(dogs_search_url, {
      params: data,
      withCredentials: true
    });
    const dogs_list = response.data;
    setDogIds(dogs_list.resultIds);
    console.log(dogs_list);
    return;
  });

  useEffect(() => {
    const init = async () => {
      await initTE({ Select, Input });
    };
    init();
  }, []);

  return (
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
  );
};

export default DogSearchForm;
