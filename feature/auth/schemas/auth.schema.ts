import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email({ message: "Please enter valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const signInSchema = z.object({
  email: z.email({ message: "Please enter valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type signUpSchemaType = z.infer<typeof signUpSchema>
export type signInSchemaType = z.infer<typeof signInSchema>
