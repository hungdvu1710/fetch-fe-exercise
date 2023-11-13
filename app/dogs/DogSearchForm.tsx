import { Button, Flex, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { dogSearchSchema } from "../validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";
import { useGlobalContext } from "../Context/store";

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
  setPaginationUrls: React.Dispatch<React.SetStateAction<{ prev: string; next: string; }>>;
}) => {
  const { setDogIds } = useGlobalContext();

  useEffect(() => {
    const init = async () => {
      const { Select, initTE, Input } = await import("tw-elements");
      initTE({ Select, Input });
    };
    init();
  }, []);


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
      withCredentials: true,
    });
    const dogs_list = response.data;
    setDogIds(dogs_list.resultIds);

    setPaginationUrls({
      next: response.data.next ?? '',
      prev: response.data.prev ?? '',
    })
    return;
  });

  return (
    <form className="my-2 space-y-3 max-w-xl" onSubmit={onSubmit}>
      <div>
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
        <label data-te-select-label-ref>Select Breeds</label>
      </div>
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
            setValueAs: (value) => {
              if (!value) return undefined
              return  Number(value)
            },
          })}
        />
      </TextFieldRoot>
      <ErrorMessage>{errors.agemax?.message}</ErrorMessage>
      <Flex gap="3">
        <div className="w-1/3">
          <select
            data-te-select-init
            data-te-select-placeholder="Sort By"
            {...register("sort")}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label data-te-select-label-ref>Sort By</label>
        </div>
        <TextFieldRoot className="w-1/3">
          <TextFieldInput
            placeholder="Results Per Page"
            type="number"
            {...register("size", {
              setValueAs: (value) => {
                if (!value) return undefined
                return  Number(value)
              },
            })}
            className="h-full"
          />
        </TextFieldRoot>
      </Flex>
      <Button>Get Dogs</Button>
    </form>
  );
};

export default DogSearchForm;
