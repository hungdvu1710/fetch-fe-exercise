import React from "react";
import LocationSearchForm from "./LocationSearchForm";
import NavBar from "../components/NavBar";
import LoginErrorDialog from "../components/LoginErrorDialog";

const LocationSearch = () => {
  return (
    <div>
      <NavBar />
      <LoginErrorDialog />
      <LocationSearchForm />
    </div>
  );
};

export default LocationSearch;
