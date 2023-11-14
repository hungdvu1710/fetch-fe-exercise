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
import { Location } from "../types";
import LocationResults from "./LocationResults";
import LocationPagination from "../components/LocationPagination";

type locationSearchInputs = z.infer<typeof locationSearchSchema>;
const locations_search_url =
  process.env.NEXT_PUBLIC_BASE_URL + "/locations/search";

const LocationSearchForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
  const [location_list, setLocationList] = React.useState<Array<Location>>([]);

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.post(locations_search_url, data, {
      withCredentials: true,
    });
    setRequestBody(data);
    const { results, total } = response.data;
    setNumResults(total);
    setLocationList(results);
    return;
  });

  return (
    <div className="space-y-3 ml-3 mr-3">
      <form onSubmit={onSubmit} className="space-y-3">
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
      {location_list.length > 0 && (
        <LocationResults location_list={location_list} />
      )}
      {location_list.length > 0 && (
        <LocationPagination
          requestBody={requestBody}
          setLocationList={setLocationList}
          setRequestBody={setRequestBody}
          numResults={numResults}
        />
      )}
    </div>
  );
};

export default LocationSearchForm;
