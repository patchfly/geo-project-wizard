import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GeoJSON from "ol/format/GeoJSON";
import { useFormContext } from "react-hook-form";
import { isGeoJSONValid } from "../../utils";

export const AreaOfInterestStep = ({
  setAreaOfInterestData,
}: {
  setAreaOfInterestData: (data: GeoJSON) => void;
}) => {
  const form = useFormContext();

  const handleError = (
    message = "Error parsing JSON file. Please try again.",
  ) => {
    form.setValue("areaOfInterest", undefined);
    form.setError("areaOfInterest", {
      message,
    });
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.clearErrors("areaOfInterest");
      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (typeof reader.result === "string") {
            const parsedData = JSON.parse(reader.result);
            if (isGeoJSONValid(parsedData)) {
              setAreaOfInterestData(parsedData);
            } else {
              handleError(
                "Provided file is not a valid GeoJSON. Please select different file.",
              );
            }
          } else {
            handleError();
          }
        } catch {
          handleError();
        }
      };

      reader.onerror = () => handleError();
      reader.readAsText(file);
    }
  };

  return (
    <FormItem>
      <FormLabel htmlFor="areaOfInterest">Area of interest</FormLabel>
      <FormControl>
        <Input
          type="file"
          id="areaOfInterest"
          accept=".GeoJSON, .json"
          {...form.register("areaOfInterest")}
          onChange={handleFileChange}
        />
      </FormControl>
      <FormDescription>
        {form.getValues("areaOfInterest")?.[0]?.name
          ? `Currently uploaded: ${form.getValues("areaOfInterest")[0].name}`
          : "Please provide GeoJSON file for your area of interest."}
      </FormDescription>
      <FormMessage>
        {form.formState.errors.areaOfInterest?.message?.toString()}
      </FormMessage>
    </FormItem>
  );
};
