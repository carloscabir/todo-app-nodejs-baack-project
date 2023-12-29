import z from "zod"

const todoSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(1).trim(),
  completed: z.boolean({
    invalid_type_error: "Checked must be a boolean",
  }).default(false),
})

export const validateTodo = (input) => todoSchema.safeParse(input)

export const validatePartialTodo = (input) => todoSchema.partial().safeParse(input)
