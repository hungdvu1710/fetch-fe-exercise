import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
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

describe("LogInForm Correct Rendering", () => {
  it('should render the "Please Login" Heading', () => {
    render(<Home />);
    const logInHeading = screen.getByRole("heading", { name: "Please Login" });

    expect(logInHeading).toBeInTheDocument();
  });
  it('should render the "Log In" button', () => {
    render(<Home />);
    const logInButton = screen.getByRole("button", { name: "Log In" });

    expect(logInButton).toBeInTheDocument();
  });
  it('should render the "Name" input', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText("Name");

    expect(nameInput).toBeInTheDocument();
  });
  it('should render the "Email" input', () => {
    render(<Home />);
    const emailInput = screen.getByPlaceholderText("Email");

    expect(emailInput).toBeInTheDocument();
  });
});

describe("Log In", () => {
  describe("with valid inputs", () => {
    it("calls the onSubmit function", async () => {
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
      render(<Home />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const logInButton = screen.getByRole("button", { name: "Log In" });

      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "Test@email.com");
      await userEvent.click(logInButton);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John Doe",
            email: "Test@email.com",
          }),
        }
      );
    });
  });

  describe("with invalid inputs", () => {
    it("no name input", async () => {
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
      render(<Home />);
      const emailInput = screen.getByPlaceholderText("Email");
      const logInButton = screen.getByRole("button", { name: "Log In" });

      await userEvent.type(emailInput, "Test@email.com");
      await userEvent.click(logInButton);
      const nameError = screen.getByText("Name is required");

      expect(nameError).toBeInTheDocument();
      expect(mockFetch).toHaveBeenCalledTimes(0);
    });

    it("no email input", async () => {
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
      render(<Home />);
      const nameInput = screen.getByPlaceholderText("Name");
      const logInButton = screen.getByRole("button", { name: "Log In" });

      await userEvent.type(nameInput, "John Doe");
      await userEvent.click(logInButton);
      const emailError = screen.getByText("Email is required");

      expect(emailError).toBeInTheDocument();
      expect(mockFetch).toHaveBeenCalledTimes(0);
    });

    it("invalid email input", async () => {
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
      render(<Home />);
      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const logInButton = screen.getByRole("button", { name: "Log In" });

      await userEvent.type(emailInput, "Test");
      await userEvent.type(nameInput, "John Doe");
      await userEvent.click(logInButton);
      const emailError = screen.getByText("This is not a valid email.");

      expect(emailError).toBeInTheDocument();
      expect(mockFetch).toHaveBeenCalledTimes(0);
    });
  });
});
