import { z } from "zod";

const formSchema = z.object({
  client_name: z.string().min(3, "Fullname is required"),
  phone_number: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digit"),
  event_name: z.string().min(1, "Select one event"),
  event_date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (val) => {
        const currentDate = new Date();
        const selectedDate = new Date(val);
        currentDate.setHours(0, 0, 0, 0);
        return selectedDate > currentDate;
      },
      {
        message: "Choose a valid date",
      }
    ),
});

export default formSchema;
