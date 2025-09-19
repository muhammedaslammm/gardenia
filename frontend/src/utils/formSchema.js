import { z } from "zod";

const formSchema = z.object({
  client_name: z.string().min(3, "Fullname is required"),
  client_email: z.string().email("Invalid Email Address"),
  phone_number: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digit"),
});

export default formSchema;
