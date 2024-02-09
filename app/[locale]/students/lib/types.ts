import z from "zod";
export const StudentSchema = z.object({
  fullName: z.string().min(1),
  status: z.enum(["active", "inactive"]),
  address: z.string().min(1),
});

export type Student = z.infer<typeof StudentSchema>;

