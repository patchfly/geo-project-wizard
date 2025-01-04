import GeoJSON from "ol/format/GeoJSON";
import { z } from "zod";

export const NAME_MAX_LENGTH = 32;
export const AREA_OF_INTEREST_FILE_TYPES = [
  "application/geo+json",
  "application/json",
];
export const AREA_OF_INTEREST_FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 1MB

export const steps = ["details", "dateRange", "areaOfInterest"] as const;
export type Step = (typeof steps)[number];

export const getFormSchema = (step: Step) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Project name is required" })
      .max(NAME_MAX_LENGTH),
    description: z.string().optional(),
    dateRange: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .optional()
      .refine(
        (val) =>
          steps.indexOf(step) < steps.indexOf("dateRange") ||
          (val?.from && val.to),
        {
          message: "Date range is required",
        },
      ),
    areaOfInterest: z
      .instanceof(FileList)
      .optional()
      .refine(
        (files) =>
          steps.indexOf(step) < steps.indexOf("areaOfInterest") || files?.[0],
        {
          message: "Area of interest is required",
        },
      )
      .refine(
        (files) =>
          !files?.[0] || AREA_OF_INTEREST_FILE_TYPES.includes(files[0].type),
        {
          message: "Invalid file type",
        },
      )
      .refine(
        (files) =>
          !files?.[0] || files[0].size <= AREA_OF_INTEREST_FILE_SIZE_LIMIT,
        {
          message: "File is too big",
        },
      ),
  });

export const isGeoJSONValid = (data: JSON): boolean => {
  // TODO: is there a better way to validate GeoJSON?
  try {
    const geoJSONFormat = new GeoJSON();
    geoJSONFormat.readFeatures(data);
    return true;
  } catch {
    return false;
  }
};
