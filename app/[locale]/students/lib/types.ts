import z from "zod";
export const StudentSchema = z.object({
  fullName: z.string().min(1),
  studentId: z.string().min(1),
  groupCode: z.boolean(),
  gender: z.enum(["male", "female", "other"]),
  religion: z.enum(["muslim", "christian", "other"]),
  nationalId: z.string().min(14),
  administration: z.string().min(1),
  directorate: z.string().min(1),
  phoneNumber: z.string().refine(
    (value) => {
      return /^\d{11}$/.test(value);
    },
    {
      message: "Phone number must be 11 digits",
    }
  ),
  educationType: z.string().min(1),
  birthYear: z
    .number()
    .refine((value) => value > 1900 && value <= new Date().getFullYear()),
  birthMonth: z.number().refine((value) => value > 0 && value <= 12),
  birthDay: z.number().refine((value) => value > 0 && value <= 31),
  birthPlace: z.string().min(1),
  governorateId: z.number(),
  nationality: z.enum(["egyptian", "foreigner"]),
  address: z.string().min(1),
});

export type Student = z.infer<typeof StudentSchema>;
