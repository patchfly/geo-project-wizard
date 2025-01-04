import { createProjectMutation } from "@/api/createProject";
import ProjectPreview from "@/components/ProjectPreview";
import ProjectWizard from "@/components/ProjectWizard";
import { getFormSchema, Step, steps } from "@/components/ProjectWizard/utils";
import { TryAgain } from "@/components/TryAgain";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import GeoJSON from "ol/format/GeoJSON";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateProjectView = () => {
  const [areaOfInterestData, setAreaOfInterestData] = useState<GeoJSON>();
  const [step, setStep] = useState<Step>(steps[0]);
  const {
    isError,
    isPending,
    isSuccess,
    mutate: createProject,
    reset: resetMutation,
  } = useMutation({
    mutationFn: createProjectMutation,
  });

  const formSchema = getFormSchema(step);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const reset = () => {
    form.reset();
    setStep(steps[0]);
    setAreaOfInterestData(undefined);
    resetMutation();
  };

  const onNext = ({
    name,
    description,
    dateRange,
  }: z.infer<typeof formSchema>) => {
    const stepsLength = steps.length;
    const currentStepIndex = steps.indexOf(step);

    if (currentStepIndex + 1 < stepsLength) {
      setStep(steps[currentStepIndex + 1]);
    } else {
      if (!dateRange?.from || !dateRange.to || !areaOfInterestData) {
        throw new Error("Something went wrong.");
      }
      createProject({
        name,
        description,
        startDate: dateRange.from,
        endDate: dateRange.to,
        areaOfInterest: JSON.stringify(areaOfInterestData),
      });
    }
  };

  const handleGoBackClick = () => {
    const stepIndex = steps.indexOf(step);
    if (stepIndex > 0) {
      setStep(steps[stepIndex - 1]);
    }
  };

  if (isError) {
    return <TryAgain reset={reset} />;
  }

  if (areaOfInterestData && isSuccess) {
    return (
      <ProjectPreview
        geoData={areaOfInterestData}
        title={form.getValues("name")}
        restart={reset}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onNext)}
        className="w-full flex justify-center"
      >
        <ProjectWizard
          isPending={isPending}
          setAreaOfInterestData={setAreaOfInterestData}
          step={step}
          handleGoBackClick={handleGoBackClick}
        />
      </form>
    </Form>
  );
};

export default CreateProjectView;
