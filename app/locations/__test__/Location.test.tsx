import { render, screen } from "@testing-library/react";
import LocationSearch from "@/app/locations/page";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import selectEvent from "react-select-event";
import { GlobalContextProvider } from "@/app/Context/store";
const locations_search_url =
  process.env.NEXT_PUBLIC_BASE_URL + "/locations/search";

jest.mock("next/navigation", () => {
  const router = {
    push: jest.fn(),
    query: {},
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

const mockLocationSearchResult = {
  "results": [
      {
          "city": "Holtsville",
          "latitude": 40.922326,
          "county": "Suffolk",
          "state": "NY",
          "zip_code": "00501",
          "longitude": -72.637078
      },
      {
          "city": "Holtsville",
          "latitude": 40.922326,
          "county": "Suffolk",
          "state": "NY",
          "zip_code": "00544",
          "longitude": -72.637078
      },
      {
          "city": "Adjuntas",
          "latitude": 18.165273,
          "county": "Adjuntas",
          "state": "PR",
          "zip_code": "00601",
          "longitude": -66.722583
      },
      {
          "city": "Aguada",
          "latitude": 18.393103,
          "county": "Aguada",
          "state": "PR",
          "zip_code": "00602",
          "longitude": -67.180953
      },
      {
          "city": "Aguadilla",
          "latitude": 18.455913,
          "county": "Aguadilla",
          "state": "PR",
          "zip_code": "00603",
          "longitude": -67.14578
      },
      {
          "city": "Aguadilla",
          "latitude": 18.49352,
          "county": "Aguadilla",
          "state": "PR",
          "zip_code": "00604",
          "longitude": -67.135883
      },
      {
          "city": "Aguadilla",
          "latitude": 18.465162,
          "county": "Aguadilla",
          "state": "PR",
          "zip_code": "00605",
          "longitude": -67.141486
      },
      {
          "city": "Maricao",
          "latitude": 18.172947,
          "county": "Maricao",
          "state": "PR",
          "zip_code": "00606",
          "longitude": -66.944111
      },
      {
          "city": "Anasco",
          "latitude": 18.288685,
          "county": "Anasco",
          "state": "PR",
          "zip_code": "00610",
          "longitude": -67.139696
      },
      {
          "city": "Angeles",
          "latitude": 18.279531,
          "county": "Utuado",
          "state": "PR",
          "zip_code": "00611",
          "longitude": -66.80217
      },
      {
          "city": "Arecibo",
          "latitude": 18.450674,
          "county": "Arecibo",
          "state": "PR",
          "zip_code": "00612",
          "longitude": -66.698262
      },
      {
          "city": "Arecibo",
          "latitude": 18.458093,
          "county": "Arecibo",
          "state": "PR",
          "zip_code": "00613",
          "longitude": -66.732732
      },
      {
          "city": "Arecibo",
          "latitude": 18.429675,
          "county": "Arecibo",
          "state": "PR",
          "zip_code": "00614",
          "longitude": -66.674506
      },
      {
          "city": "Bajadero",
          "latitude": 18.444792,
          "county": "Arecibo",
          "state": "PR",
          "zip_code": "00616",
          "longitude": -66.640678
      },
      {
          "city": "Barceloneta",
          "latitude": 18.447092,
          "county": "Barceloneta",
          "state": "PR",
          "zip_code": "00617",
          "longitude": -66.544255
      },
      {
          "city": "Boqueron",
          "latitude": 17.998531,
          "county": "Cabo Rojo",
          "state": "PR",
          "zip_code": "00622",
          "longitude": -67.187318
      },
      {
          "city": "Cabo Rojo",
          "latitude": 18.062201,
          "county": "Cabo Rojo",
          "state": "PR",
          "zip_code": "00623",
          "longitude": -67.149541
      },
      {
          "city": "Penuelas",
          "latitude": 18.023535,
          "county": "Penuelas",
          "state": "PR",
          "zip_code": "00624",
          "longitude": -66.726156
      },
      {
          "city": "Camuy",
          "latitude": 18.477891,
          "county": "Camuy",
          "state": "PR",
          "zip_code": "00627",
          "longitude": -66.85477
      },
      {
          "city": "Castaner",
          "latitude": 18.269187,
          "county": "Lares",
          "state": "PR",
          "zip_code": "00631",
          "longitude": -66.864993
      },
      {
          "city": "Rosario",
          "latitude": 18.113284,
          "county": "San German",
          "state": "PR",
          "zip_code": "00636",
          "longitude": -67.039706
      },
      {
          "city": "Sabana Grande",
          "latitude": 18.087322,
          "county": "Sabana Grande",
          "state": "PR",
          "zip_code": "00637",
          "longitude": -66.934911
      },
      {
          "city": "Ciales",
          "latitude": 18.33616,
          "county": "Ciales",
          "state": "PR",
          "zip_code": "00638",
          "longitude": -66.472087
      },
      {
          "city": "Utuado",
          "latitude": 18.250027,
          "county": "Utuado",
          "state": "PR",
          "zip_code": "00641",
          "longitude": -66.698957
      },
      {
          "city": "Dorado",
          "latitude": 18.43606,
          "county": "Dorado",
          "state": "PR",
          "zip_code": "00646",
          "longitude": -66.281954
      }
  ],
  "total": 75
}

describe("Location Page Correct Rendering", () => {
  it("should render the form", () => {
    render(<LocationSearch />);

    const form = screen.getByRole("form");
    const formHeading = screen.getByRole("heading", {
      name: "Let’s find the Zip Codes for your location",
    });
    const stateSelect = screen.getByLabelText("states");
    const city = screen.getByPlaceholderText("City");

    expect(form).toBeInTheDocument();
    expect(formHeading).toBeInTheDocument();
    expect(stateSelect).toBeInTheDocument();
    expect(city).toBeInTheDocument();
  });

  it("should select multiple states", async () => {
    render(<LocationSearch />);

    const form = screen.getByRole("form");
    const stateSelect = screen.getByLabelText("states");

    expect(stateSelect).toBeInTheDocument();

    await selectEvent.select(stateSelect, ["Alabama", "Alaska"]);
    expect(form).toHaveFormValues({
      states: ["AL", "AK"],
    });
  });
});

describe("Search for Locations", () => {
  describe("Successful Submission", () => {
    it("should call with no input", async () => {
      render(<LocationSearch />);
      const mockedAxios = jest.fn().mockResolvedValue({
        data: {
          success: true,
        },
      });
      axios.post = mockedAxios;

      const searchButton = screen.getByRole("button", { name: "Search" });
      await userEvent.click(searchButton);

      expect(mockedAxios).toHaveBeenCalledWith(
        locations_search_url,
        {
          city: "",
          size: 25,
        },
        { withCredentials: true }
      );
    });

    it("should call with all inputs", async () => {
      render(<LocationSearch />);
      const mockedAxios = jest.fn();
      axios.post = mockedAxios;

      const stateSelect = screen.getByLabelText("states");
      const city = screen.getByPlaceholderText("City");
      const searchButton = screen.getByRole("button", { name: "Search" });

      await userEvent.type(city, "testCity");
      await selectEvent.select(stateSelect, ["Alaska", "Alabama"]);
      await userEvent.click(searchButton);

      expect(mockedAxios).toHaveBeenCalledWith(
        locations_search_url,
        {
          city: "testCity",
          size: 25,
          states: ["AK", "AL"],
        },
        { withCredentials: true }
      );
    });
  });
  describe("Failed Submission", () => {
    it("should not call without user login", async () => {
      render(<LocationSearch />, {
        wrapper: ({ children }) => (
          <GlobalContextProvider>{children}</GlobalContextProvider>
        ),
      });
      const mockedAxios = jest.fn().mockRejectedValue(() => {
        throw new Error("Unauthorized");
      });
      axios.post = mockedAxios;

      const searchButton = screen.getByRole("button", { name: "Search" });
      await userEvent.click(searchButton);
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      const LoginErrorMessage = screen.getByText("You need to log in first");
      expect(LoginErrorMessage).toBeInTheDocument();
    });
  });
});

describe("Location Results", () => {
  beforeEach(() => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockLocationSearchResult,
    });
  });
  it("should render the results", async () => {
    render(<LocationSearch />, {
      wrapper: ({ children }) => (
        <GlobalContextProvider>{children}</GlobalContextProvider>
      ),
    });
    const searchButton = screen.getByRole("button", { name: "Search" });

    await userEvent.click(searchButton);

    const locationResults = await screen.findAllByTestId("location-card");
    expect(locationResults).toHaveLength(25);
  });
  describe("With Pagination", () => {
    it("should render and enable just forward pagination", async () => {
      render(<LocationSearch />, {
        wrapper: ({ children }) => (
          <GlobalContextProvider>{children}</GlobalContextProvider>
        ),
      });
      const searchButton = screen.getByRole("button", { name: "Search" });

      await userEvent.click(searchButton);

      const forwardPagination = screen.getByTestId("forward-pagination");
      const backwardPagination = screen.getByTestId("backward-pagination");

      expect(forwardPagination).toBeEnabled();
      expect(backwardPagination).toBeDisabled();
    });
    it("should render and enable just backward pagination", async () => {
      render(<LocationSearch />, {
        wrapper: ({ children }) => (
          <GlobalContextProvider>{children}</GlobalContextProvider>
        ),
      });
      const searchButton = screen.getByRole("button", { name: "Search" });

      await userEvent.click(searchButton);

      const forwardPagination = screen.getByTestId("forward-pagination");
      const backwardPagination = screen.getByTestId("backward-pagination");

      await userEvent.click(forwardPagination);
      await userEvent.click(forwardPagination);

      expect(forwardPagination).toBeDisabled();
      expect(backwardPagination).toBeEnabled();
    });
    it("should render and enable both way pagination", async () => {
      render(<LocationSearch />, {
        wrapper: ({ children }) => (
          <GlobalContextProvider>{children}</GlobalContextProvider>
        ),
      });
      const searchButton = screen.getByRole("button", { name: "Search" });

      await userEvent.click(searchButton);

      const forwardPagination = screen.getByTestId("forward-pagination");
      const backwardPagination = screen.getByTestId("backward-pagination");

      await userEvent.click(forwardPagination);

      expect(forwardPagination).toBeEnabled();
      expect(backwardPagination).toBeEnabled();
    });
  });
  it("should show the no results message", async () => {
    render(<LocationSearch />, {
      wrapper: ({ children }) => (
        <GlobalContextProvider>{children}</GlobalContextProvider>
      ),
    });
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        results: [],
        total: 0,
      },
    });

    const searchButton = screen.getByRole("button", { name: "Search" });
    await userEvent.click(searchButton);
    const noResultsMessage = screen.getByText("No results found");
    expect(noResultsMessage).toBeInTheDocument();
  });
});