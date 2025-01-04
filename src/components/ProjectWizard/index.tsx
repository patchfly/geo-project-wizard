import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DetailsStep } from "./components/DetailsStep";
import { DateRangeStep } from "./components/DateRangeStep";
import { AreaOfInterestStep } from "./components/AreaOfInterestStep";
import { Step } from "./utils";
import { Loader } from "lucide-react";
import GeoJSON from "ol/format/GeoJSON";

interface ProjectWizardProps {
  isPending: boolean;
  setAreaOfInterestData: (data: GeoJSON) => void;
  step: Step;
  handleGoBackClick: () => void;
}

const ProjectWizard = ({
  isPending,
  setAreaOfInterestData,
  step,
  handleGoBackClick,
}: ProjectWizardProps) => {
  const renderStep = () => {
    switch (step) {
      case "details":
        return <DetailsStep />;
      case "dateRange":
        return <DateRangeStep />;
      case "areaOfInterest":
        return (
          <AreaOfInterestStep setAreaOfInterestData={setAreaOfInterestData} />
        );
    }
  };

  return (
    <Card className="w-full sm:max-w-[500px] max-sm:border-none max-sm:shadow-none">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Fill in a few details to create a new project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[260px]">
        {isPending ? (
          <div className="flex justify-center items-center w-full h-[236px]">
            <Loader className="animate-spin" />
          </div>
        ) : (
          renderStep()
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step !== "details" && (
          <Button
            type="button"
            variant="outline"
            onClick={handleGoBackClick}
            disabled={isPending}
          >
            Back
          </Button>
        )}
        <Button type="submit" className="ml-auto" disabled={isPending}>
          {step === "areaOfInterest" ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectWizard;
