import { z } from "zod";

export const mappingSchema = z
  .object({
    fullName: z.string(),
    address: z.string(),
    status: z.string(),
    studentId: z.string(),
  })
  .refine(
    (data) => {
      // Check if any of the fields have the value '<unset>'
      return !Object.values(data).some((value) => value === "<unset>");
    },
    {
      message: 'Fields cannot be "<unset>"',
    }
  );
