import { render, screen, within } from "@testing-library/react";
import Dogs from "@/app/dogs/page";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import selectEvent from "react-select-event";
import { GlobalContextProvider } from "@/app/Context/store";

jest.mock("next/navigation", () => {
  const router = {
    push: jest.fn(),
    query: {},
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

const mockSearchWithIdsURLResult = [
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg",
    name: "Emory",
    age: 10,
    breed: "Chihuahua",
    zip_code: "48333",
    id: "testId1",
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg",
    name: "Jena",
    age: 8,
    breed: "Chihuahua",
    zip_code: "25275",
    id: "testId2",
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg",
    name: "Jenifer",
    age: 14,
    breed: "Chihuahua",
    zip_code: "11962",
    id: "testId3",
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1152.jpg",
    name: "Carolyne",
    age: 3,
    breed: "Chihuahua",
    zip_code: "17089",
    id: "testId4",
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1235.jpg",
    name: "Brandy",
    age: 5,
    breed: "Chihuahua",
    zip_code: "28451",
    id: "testId5",
  },
  {
    img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1271.jpg",
    name: "Seamus",
    age: 2,
    breed: "Chihuahua",
    zip_code: "09189",
    id: "testId6",
  },
];

jest.mock("axios");
const dogs_search_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs/search";
const dogs_search_with_ids_url = process.env.NEXT_PUBLIC_BASE_URL + "/dogs";

describe("Dog Page Correct Rendering", () => {
  it("should render the form", () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    render(<Dogs />);

    const form = screen.getByRole("form");
    const formHeading = screen.getByRole("heading", {
      name: "Let’s look for your dogs",
    });
    const breedSelect = screen.getByLabelText("breeds");
    const zipCodesSelect = screen.getByPlaceholderText(
      "Type your Zip Codes separated by commas"
    );
    const agemin = screen.getByPlaceholderText("Age Min");
    const agemax = screen.getByPlaceholderText("Age Max");
    const sort = screen.getByText("Sort By");
    const resultsPerPage = screen.getByPlaceholderText("Results Per Page");

    expect(form).toBeInTheDocument();
    expect(formHeading).toBeInTheDocument();
    expect(breedSelect).toBeInTheDocument();
    expect(zipCodesSelect).toBeInTheDocument();
    expect(agemin).toBeInTheDocument();
    expect(agemax).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
    expect(resultsPerPage).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should select multiple breeds", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            "Affenpinscher",
            "Afghan Hound",
            "African Hunting Dog",
            "Airedale",
            "American Staffordshire Terrier",
            "Appenzeller",
            "Australian Terrier",
            "Basenji",
            "Basset",
            "Beagle",
          ]),
      })
    ) as jest.Mock;
    render(<Dogs />);

    const form = screen.getByRole("form");
    const breedSelect = screen.getByLabelText("breeds");
    await selectEvent.select(breedSelect, ["Affenpinscher", "Afghan Hound"]);
    expect(form).toHaveFormValues({
      breeds: ["Affenpinscher", "Afghan Hound"],
    });
  });
});

describe("Search for Dogs", () => {
  describe("Successful Submission", () => {
    it("should call with no input", async () => {
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
      render(<Dogs />);
      const mockedAxios = jest.fn().mockResolvedValue({
        data: {
          success: true,
        },
      });
      axios.get = mockedAxios;

      const searchButton = screen.getByRole("button", { name: "Get Dogs" });
      await userEvent.click(searchButton);

      expect(mockedAxios).toHaveBeenCalledWith(dogs_search_url, {
        params: {
          agemax: undefined,
          agemin: 0,
          breeds: undefined,
          size: undefined,
          sort: undefined,
          zipCodes: undefined,
        },
        withCredentials: true,
      });
    });

    it("should call with all inputs", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              "Affenpinscher",
              "Afghan Hound",
              "African Hunting Dog",
              "Airedale",
              "American Staffordshire Terrier",
              "Appenzeller",
              "Australian Terrier",
              "Basenji",
              "Basset",
              "Beagle",
            ]),
        })
      ) as jest.Mock;
      render(<Dogs />);
      const mockedAxios = jest.fn();
      axios.get = mockedAxios;

      const breedSelect = screen.getByLabelText("breeds");
      const zipCodesSelect = screen.getByPlaceholderText(
        "Type your Zip Codes separated by commas"
      );
      const agemin = screen.getByPlaceholderText("Age Min");
      const agemax = screen.getByPlaceholderText("Age Max");
      const sort = screen.getByLabelText("sort");
      const resultsPerPage = screen.getByPlaceholderText("Results Per Page");
      const searchButton = screen.getByRole("button", { name: "Get Dogs" });

      await userEvent.type(zipCodesSelect, "12345, 12346, 12347");
      await userEvent.type(agemin, "1");
      await userEvent.type(agemax, "7");
      await userEvent.type(resultsPerPage, "25");
      await selectEvent.select(breedSelect, ["Affenpinscher", "Afghan Hound"]);
      await selectEvent.select(sort, "Breed DESC");
      await userEvent.click(searchButton);

      expect(mockedAxios).toHaveBeenCalledWith(dogs_search_url, {
        params: {
          agemax: 7,
          agemin: 1,
          breeds: ["Affenpinscher", "Afghan Hound"],
          size: 25,
          sort: "breed:desc",
          zipCodes: ["12345", "12346", "12347"],
        },
        withCredentials: true,
      });
    });
  });
  describe("Failed Submission", () => {
    it("should not call with invalid age", async () => {
      render(<Dogs />);
      const mockAxios = jest.fn();
      axios.get = mockAxios;

      const searchButton = screen.getByRole("button", { name: "Get Dogs" });
      const agemin = screen.getByPlaceholderText("Age Min");
      const agemax = screen.getByPlaceholderText("Age Max");
      await userEvent.type(agemin, "7");
      await userEvent.type(agemax, "1");
      await userEvent.click(searchButton);

      expect(mockAxios).toHaveBeenCalledTimes(0);
      expect(
        screen.getByText("Age Min must be less than or equal to Age Max")
      ).toBeInTheDocument();
    });
    it("should not call without user login", async () => {
      render(<Dogs />, {
        wrapper: ({ children }) => (
          <GlobalContextProvider>{children}</GlobalContextProvider>
        ),
      });
      const mockedAxios = jest.fn().mockRejectedValue(() => {
        throw new Error("Unauthorized");
      });
      axios.get = mockedAxios;

      const searchButton = screen.getByRole("button", { name: "Get Dogs" });
      await userEvent.click(searchButton);
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      const LoginErrorMessage = screen.getByText("You need to log in first");
      expect(LoginErrorMessage).toBeInTheDocument();
    });
  });
});

describe("Dog Results", () => {
  it("should render the results", async () => {
    render(<Dogs />, {
      wrapper: ({ children }) => (
        <GlobalContextProvider>{children}</GlobalContextProvider>
      ),
    });
    const searchButton = screen.getByRole("button", { name: "Get Dogs" });

    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        resultIds: [
          "testId1",
          "testId2",
          "testId3",
          "testId4",
          "testId5",
          "testId6",
        ],
        total: 6,
      },
    });

    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockSearchWithIdsURLResult,
    });

    await userEvent.click(searchButton);

    const dogResults = await screen.findAllByTestId("dog-card");
    expect(dogResults).toHaveLength(6);
  });
  describe("With Pagination", () => {
    it("should render and enable both way pagination", async () => {
      render(<Dogs />);
      const searchButton = screen.getByRole("button", { name: "Get Dogs" });

      axios.get = jest.fn().mockResolvedValue({
        status: 200,
        data: {
          next: "/dogs/search?from=50",
          prev: "/dogs/search?from=0",
          resultIds: ["1", "2", "3"],
          total: 0,
        },
      });

      await userEvent.click(searchButton);

      const forwardPagination = screen.getByTestId("forward-pagination");
      const backwardPagination = screen.getByTestId("backward-pagination");

      expect(forwardPagination).toBeEnabled();
      expect(backwardPagination).toBeEnabled();
    });
    it("should enable just backward pagination", async () => {
      render(<Dogs />);
      const searchButton = screen.getByRole("button", { name: "Get Dogs" });

      axios.get = jest.fn().mockResolvedValue({
        status: 200,
        data: {
          prev: "/dogs/search?from=0",
          resultIds: ["1", "2", "3"],
          total: 0,
        },
      });

      await userEvent.click(searchButton);

      const forwardPagination = screen.getByTestId("forward-pagination");
      const backwardPagination = screen.getByTestId("backward-pagination");

      expect(forwardPagination).toBeDisabled();
      expect(backwardPagination).toBeEnabled();
    });
    it("should enable just forward pagination", async () => {
      render(<Dogs />);
      const searchButton = screen.getByRole("button", { name: "Get Dogs" });

      axios.get = jest.fn().mockResolvedValue({
        status: 200,
        data: {
          next: "/dogs/search?from=25",
          resultIds: ["1", "2", "3"],
          total: 0,
        },
      });

      await userEvent.click(searchButton);

      const forwardPagination = screen.getByTestId("forward-pagination");
      const backwardPagination = screen.getByTestId("backward-pagination");

      expect(forwardPagination).toBeEnabled();
      expect(backwardPagination).toBeDisabled();
    });
  });
  it("should show the no results message", async () => {
    render(<Dogs />, {
      wrapper: ({ children }) => (
        <GlobalContextProvider>{children}</GlobalContextProvider>
      ),
    });
    const mockedAxios = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        next: "/dogs/search?agemin=0&zipCodes%5B0%5D=123123&size=25&from=25",
        resultIds: [],
        total: 0,
      },
    });
    axios.get = mockedAxios;

    const searchButton = screen.getByRole("button", { name: "Get Dogs" });
    await userEvent.click(searchButton);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    const noResultsMessage = screen.getByText("No results found");
    expect(noResultsMessage).toBeInTheDocument();
  });
});

describe("Favorite Dogs", () => {
  beforeAll(() => {
    const ResizeObserver = jest.fn();
    ResizeObserver.mockImplementation(() => {
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
    window.ResizeObserver = ResizeObserver;
  });

  it("should render the favorite dogs as user click", async () => {
    render(<Dogs />, {
      wrapper: ({ children }) => (
        <GlobalContextProvider>{children}</GlobalContextProvider>
      ),
    });

    const searchButton = screen.getByRole("button", { name: "Get Dogs" });

    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        resultIds: [
          "testId1",
          "testId2",
          "testId3",
          "testId4",
          "testId5",
          "testId6",
        ],
        total: 6,
      },
    });

    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockSearchWithIdsURLResult,
    });

    await userEvent.click(searchButton);

    const favoriteDogs = screen.getByRole("button", { name: "Favorite" });

    const dogCard1FavoriteCheckbox = screen.getByTestId("dog-card-fav-check-testId1");
    const dogCard2FavoriteCheckbox = screen.getByTestId("dog-card-fav-check-testId2");
    const dogCard3FavoriteCheckbox = screen.getByTestId("dog-card-fav-check-testId3");

    await userEvent.click(dogCard1FavoriteCheckbox);
    await userEvent.click(dogCard2FavoriteCheckbox);
    await userEvent.click(dogCard3FavoriteCheckbox);

    await userEvent.hover(favoriteDogs);
    await userEvent.click(favoriteDogs);

    const favDogCards = screen.getAllByTestId("fav-dog-card");

    expect(favDogCards).toHaveLength(3);

    const favDogCard1 = within(favDogCards[0]);
    const favDogCard2 = within(favDogCards[1]);
    const favDogCard3 = within(favDogCards[2]);

    expect(favDogCard1.getByText("Emory")).toBeInTheDocument();
    expect(favDogCard2.getByText("Jena")).toBeInTheDocument();
    expect(favDogCard3.getByText("Jenifer")).toBeInTheDocument();
  });

  it("should remove the favorite dogs as user click", async () => {
    render(<Dogs />, {
      wrapper: ({ children }) => (
        <GlobalContextProvider>{children}</GlobalContextProvider>
      ),
    });

    const searchButton = screen.getByRole("button", { name: "Get Dogs" });

    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        resultIds: [
          "testId1",
          "testId2",
          "testId3",
          "testId4",
          "testId5",
          "testId6",
        ],
        total: 6,
      },
    });

    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockSearchWithIdsURLResult,
    });

    await userEvent.click(searchButton);

    const favoriteDogs = screen.getByRole("button", { name: "Favorite" });

    const dogCard1FavoriteCheckbox = screen.getByTestId("dog-card-fav-check-testId1");
    const dogCard2FavoriteCheckbox = screen.getByTestId("dog-card-fav-check-testId2");

    await userEvent.click(dogCard1FavoriteCheckbox);
    await userEvent.click(dogCard2FavoriteCheckbox);

    await userEvent.hover(favoriteDogs);
    await userEvent.click(favoriteDogs);

    const favDogCards = screen.getAllByTestId("fav-dog-card");

    const favDogCard1 = within(favDogCards[0]);
    const favDogCard2 = within(favDogCards[1]);

    expect(favDogCard1.getByText("Emory")).toBeInTheDocument();
    expect(favDogCard2.getByText("Jena")).toBeInTheDocument();

    // click again to remove
    await userEvent.click(dogCard1FavoriteCheckbox);
    expect(favDogCard1.queryByText("Emory")).not.toBeInTheDocument();
    expect(dogCard1FavoriteCheckbox).not.toBeChecked();

    await userEvent.click(favoriteDogs);

    await userEvent.click(favDogCard2.getByTestId("remove-fav-dog"));
    expect(favDogCard2.queryByText("Jena")).not.toBeInTheDocument();
  });
});
