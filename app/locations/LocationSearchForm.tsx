"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { locationSearchSchema } from "../validationSchema";
import {
  Button,
  Heading,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import statesData from "../utils/states.json";
import Select from "react-select";
import LocationResults from "./LocationResults";
import LocationPagination from "../components/LocationPagination";
import { useGlobalContext } from "../Context/store";

type locationSearchInputs = z.infer<typeof locationSearchSchema>;
const locations_search_url =
  process.env.NEXT_PUBLIC_BASE_URL + "/locations/search";

const LocationSearchForm = () => {
  const { locationList, setLocationList, setIsAuthenticated } = useGlobalContext();
  const {
    register,
    handleSubmit,
    control,
  } = useForm<locationSearchInputs>({
    resolver: zodResolver(locationSearchSchema),
  });

  const [requestBody, setRequestBody] = React.useState<locationSearchInputs>({
    states: [],
    city: "",
    size: 25,
    from: 0,
  });
  const [numResults, setNumResults] = React.useState(0);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(locations_search_url, data, {
        withCredentials: true,
      });
      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      } else {
        setIsAuthenticated(true);
        setRequestBody(data);
      const { results, total } = response.data;
      setNumResults(total);
      setLocationList(results);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
    return;
  });

  return (
    <div className="space-y-3 ml-3 mr-3">
      <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
        <Heading>Let&rsquo;s find the Zip Codes for your location</Heading>
        <Controller
          name="states"
          control={control}
          render={({ field: { onChange, name, ref } }) => (
            <Select
              ref={ref}
              name={name}
              placeholder="Select a state"
              isClearable
              isSearchable
              isMulti
              options={statesData}
              onChange={(e: any) =>
                e.value
                  ? onChange(e.value)
                  : onChange(e.map((c: any) => c.value))
              }
            />
          )}
        ></Controller>
        <TextFieldRoot>
          <TextFieldInput placeholder="City" {...register("city")} />
        </TextFieldRoot>
        <Button>Search</Button>
      </form>
      <LocationResults />
      {locationList.length > 0 && (
        <LocationPagination
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          numResults={numResults}
        />
      )}
    </div>
  );
};

export default LocationSearchForm;
