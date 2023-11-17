import { render, screen, within } from "@testing-library/react";
import FavDogs from "../FavDogs";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import selectEvent from "react-select-event";
import { GlobalContextProvider } from "@/app/Context/store";

describe("Render favorite dogs", () => {
  it("should render the favorite dogs", async () => {});
  it("should render heading when there's no faorite dogs", async () => {});
});

describe("Request matched dog", () => {
  it("should render the matched dog from favorite dogs", async () => {});
  it("should show login error when user not logged in", async () => {});
});