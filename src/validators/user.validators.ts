import z from "zod";

const allowedSpecialChars = "!@#$%^&*()_+[]{}:;\"'|<>,.?/";
export const signupInputSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .min(2, { message: "First name must be at lease 2 characters" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(24, { message: "Password must be less than 24 characters" })
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(
      new RegExp(
        `[${allowedSpecialChars
          .split("")
          .map((c) => `\\${c}`)
          .join("")}]`
      ),
      "At least one common special character"
    ),
});

export type SignupInput = z.infer<typeof signupInputSchema>;
