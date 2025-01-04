import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";
import { TryAgain } from ".";

const mockReset = vi.fn();

describe("TryAgain", () => {
  it("should render the correct title and description", () => {
    render(<TryAgain reset={mockReset} />);

    const title = screen.getByText(/Something went wrong/i);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      /Sorry for the inconvenience. Please try again./i,
    );
    expect(description).toBeInTheDocument();
  });

  it('should call the reset function when "Try again" button is clicked', async () => {
    render(<TryAgain reset={mockReset} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
