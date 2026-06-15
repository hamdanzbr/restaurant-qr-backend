import { z } from "zod";

export const createCategorySchema =
  z.object({
    name: z
      .string()
      .min(
        2,
        "Category name required"
      )
      .max(
        50,
        "Category name too long"
      ),

    description: z
      .string()
      .max(200)
      .optional(),
  });