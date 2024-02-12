import { z } from "zod";
export const mappingSchema = z
  .object({
    fullName: z.string().min(1),
    address: z.string().min(1),
    status: z.string().min(1),
    studentId: z.string().min(1),
  })
  .refine(
    (data) => {
      // Check if any of the fields have the value '<unset>'
      return Object.values(data).some((value) => value === "<unset>");
    },
    {
      message: 'Fields cannot be "<unset>"',
    }
  );
