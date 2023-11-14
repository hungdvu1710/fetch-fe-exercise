import { z } from "zod";
import { Coordinates } from "./types";

export const loginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email."),
});

export const dogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  agemin: z.number({invalid_type_error: "Age Min must be a number"}).optional(),
  agemax: z.number({invalid_type_error: "Age Max must be a number"}).optional(),
  size: z.number({invalid_type_error: "Size must be a number"}).optional(),
  from: z.number({invalid_type_error: "From must be a number"}).optional(),
  zipCodes: z.array(z.string()).optional(),
  sort: z.string().optional(),
}).refine((data) => {
  if (data.agemin !== undefined && data.agemax !== undefined) {
    if (data.agemin > data.agemax) {
      return false;
    }
  }
  return true;
}, {
  message: "Age Min must be less than or equal to Age Max",
  path: ["agemin"],
});

// Space for Coordinates Schema

// interface geoBoundingBox {
//   top?: Coordinates,
//   left?: Coordinates,
//   bottom?: Coordinates,
//   right?: Coordinates,
//   bottom_left?: Coordinates,
//   top_left?: Coordinates
// }

// const coordinatesSchema = z.object({
//   // Define the schema for the Coordinates interface properties
//   lat: z.number(),
//   lon: z.number(),
// });

// const isValidGeoBoundingBox = (box) => {
//   const hasTopLeftRight = (box.top && box.left && box.right && box.bottom) !== undefined;
//   const hasBottomTop = (box.bottom_right && box.top) !== undefined;
//   return hasTopLeftRight || hasBottomTop;
// }


// const geoBoundingBoxSchema = z.object({
//   top: coordinatesSchema.optional(),
//   left: coordinatesSchema.optional(),
//   bottom: coordinatesSchema.optional(),
//   right: coordinatesSchema.optional(),
//   bottom_left: coordinatesSchema.optional(),
//   top_left: coordinatesSchema.optional(),
// }).refine(isValidGeoBoundingBox, {
//   message: 'Invalid GeoBoundingBox: Must contain one of the specified combinations of properties',
// });

export const locationSearchSchema = z.object({
  city: z.string().optional(),
  states: z.array(z.string()).optional(),
  from: z.number({invalid_type_error: "From must be a number"}).default(0).optional(),
  size: z.number().default(25),
  // geoBoundingBox: geoBoundingBoxSchema.optional(),
})