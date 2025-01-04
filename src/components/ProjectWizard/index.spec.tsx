import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProjectWizard from ".";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";

const setAreaOfInterestDataMock = vi.fn();
const handleGoBackClickMock = vi.fn();

function renderWithFormProvider(element: ReactNode) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      defaultValues: {
        name: "",
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  render(<Wrapper>{element}</Wrapper>);
}

describe("ProjectWizard", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component", () => {
    renderWithFormProvider(
      <ProjectWizard
        isPending={false}
        setAreaOfInterestData={setAreaOfInterestDataMock}
        step={"details"}
        handleGoBackClick={handleGoBackClickMock}
      />,
    );

    const title = screen.getByText(/Create project/i);
    expect(title).toBeInTheDocument();
  });

  it("should render details step", () => {
    renderWithFormProvider(
      <ProjectWizard
        isPending={false}
        setAreaOfInterestData={setAreaOfInterestDataMock}
        step={"details"}
        handleGoBackClick={handleGoBackClickMock}
      />,
    );

    const nameLabel = screen.getByLabelText(/Name/i);
    expect(nameLabel).toBeInTheDocument();

    const descriptionLabel = screen.getByLabelText(/Description/i);
    expect(descriptionLabel).toBeInTheDocument();

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeInTheDocument();

    const backButton = screen.queryByText(/Back/i);
    expect(backButton).not.toBeInTheDocument();
  });

  it("should render date range step", async () => {
    renderWithFormProvider(
      <ProjectWizard
        isPending={false}
        setAreaOfInterestData={setAreaOfInterestDataMock}
        step={"dateRange"}
        handleGoBackClick={handleGoBackClickMock}
      />,
    );

    const dateRangeLabel = screen.getByText(/Date range/);
    expect(dateRangeLabel).toBeInTheDocument();

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeInTheDocument();

    const backButton = screen.getByText(/Back/i);
    expect(backButton).toBeInTheDocument();
    await userEvent.click(backButton);
    expect(handleGoBackClickMock).toBeCalledTimes(1);
  });

  it("should render area of interest step", async () => {
    renderWithFormProvider(
      <ProjectWizard
        isPending={false}
        setAreaOfInterestData={setAreaOfInterestDataMock}
        step={"areaOfInterest"}
        handleGoBackClick={handleGoBackClickMock}
      />,
    );

    const areaOfInterestLabel = screen.getByText(/Area of interest/);
    expect(areaOfInterestLabel).toBeInTheDocument();

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();

    const backButton = screen.getByText(/Back/i);
    expect(backButton).toBeInTheDocument();
    await userEvent.click(backButton);
    expect(handleGoBackClickMock).toBeCalledTimes(1);
  });

  it("should display loading state", async () => {
    renderWithFormProvider(
      <ProjectWizard
        isPending={true}
        setAreaOfInterestData={setAreaOfInterestDataMock}
        step={"areaOfInterest"}
        handleGoBackClick={handleGoBackClickMock}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeDisabled();

    const backButton = screen.getByRole("button", { name: /Back/i });
    expect(backButton).toBeDisabled();

    const loadingIcon = screen.getByTestId("loader");
    expect(loadingIcon).toBeInTheDocument();
  });
});
