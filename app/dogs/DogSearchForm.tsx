import { Button, Flex, Heading, Text, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import React from "react";
import { set, useForm } from "react-hook-form";
import { dogSearchSchema } from "../validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";
import { useGlobalContext } from "../Context/store";
import CustomSelect from "../components/CustomSelect";

type dogSearchInputs = z.infer<typeof dogSearchSchema>;
const dogs_search_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/search";

const sortOptions = [
  { value: "breed:asc", label: "Breed ASC" },
  { value: "breed:desc", label: "Breed DESC" },
  { value: "name:asc", label: "Name ASC" },
  { value: "name:desc", label: "Name DESC" },
  { value: "age:asc", label: "Age ASC" },
  { value: "age:desc", label: "Age DESC" },
];

const DogSearchForm = ({
  breeds,
  setPaginationUrls,
}: {
  breeds: Array<string>;
  setPaginationUrls: React.Dispatch<
    React.SetStateAction<{ prev: string; next: string }>
  >;
}) => {
  const { setDogIds, setIsAuthenticated } = useGlobalContext();
  const [hasResults, setHasResults] = React.useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<dogSearchInputs>({
    resolver: zodResolver(dogSearchSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.get(dogs_search_url, {
        params: data,
        withCredentials: true,
      });
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      } else {
        setIsAuthenticated(true);
        const dogs_list = response.data;
        setDogIds(dogs_list.resultIds);
        if (dogs_list.resultIds.length == 0) setHasResults(false);
        else setHasResults(true);

        setPaginationUrls({
          next: response.data.next ?? "",
          prev: response.data.prev ?? "",
        });
      }
    } catch (error) {
      setIsAuthenticated(false);
    }

    return;
  });

  return (
    <form className="my-2 space-y-3 max-w-xl" onSubmit={onSubmit} aria-label="dog search form">
      <CustomSelect
        control={control}
        selectName={"breeds"}
        data={breeds.map((breed) => ({ value: breed, label: breed }))}
        placeholder="Select your breeds"
        isMulti={true}
        isClearable={true}
      />
      <TextFieldRoot>
        <TextFieldInput
          placeholder="Type your Zip Codes separated by commas"
          id="zipCodes"
          {...register("zipCodes", {
            setValueAs: (value) => {
              if (!value) return undefined;
              return value.split(",").map((e: string) => e.trim());
            },
          })}
        />
      </TextFieldRoot>
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
            setValueAs: (value) => {
              if (!value) return undefined;
              return Number(value);
            },
          })}
        />
      </TextFieldRoot>
      <ErrorMessage>{errors.agemax?.message}</ErrorMessage>
      <Flex gap="3">
        <CustomSelect
          className="w-1/3"
          control={control}
          selectName={"sort"}
          data={sortOptions}
          placeholder="Sort By"
          isMulti={false}
          isClearable={false}
        />
        <TextFieldRoot className="w-1/3">
          <TextFieldInput
            placeholder="Results Per Page"
            type="number"
            {...register("size", {
              setValueAs: (value) => {
                if (!value) return undefined;
                return Number(value);
              },
            })}
            className="h-full"
          />
        </TextFieldRoot>
      </Flex>
      <Button>Get Dogs</Button>
      {!hasResults && <Heading as="h3" size="3" color="gray">No results found</Heading>}
    </form>
  );
};

export default DogSearchForm;
