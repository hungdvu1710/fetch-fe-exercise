import { render, screen } from "@testing-library/react";
import Dogs from "@/app/dogs/page";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
});

describe("Dog Page Correct Rendering", () => {
  it('should render the form', () => {
    render(<Dogs />);
    const formHeading = screen.getByRole("heading", { name: "Let’s look for your dogs" });
    const breedSelect = screen.getByText("Select your breeds");
    const zipCodesSelect = screen.getByPlaceholderText("Type your Zip Codes separated by commas");
    const agemin = screen.getByPlaceholderText("Age Min");
    const agemax = screen.getByPlaceholderText("Age Max");
    const sort = screen.getByText("Sort By");
    const resultsPerPage = screen.getByPlaceholderText("Results Per Page");

    expect(formHeading).toBeInTheDocument();
    expect(breedSelect).toBeInTheDocument();
    expect(zipCodesSelect).toBeInTheDocument();
    expect(agemin).toBeInTheDocument();
    expect(agemax).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
    expect(resultsPerPage).toBeInTheDocument();
  });
});