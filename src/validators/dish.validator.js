import { z } from "zod";

export const createDishSchema =
  z.object({
    name: z
      .string()
      .min(2, "Dish name is required"),

    description: z
      .string()
      .optional(),

    image: z
      .string()
      .optional(),

    price: z
      .number()
      .positive("Price must be greater than 0"),

    available: z
      .boolean()
      .optional(),

    categoryId: z
      .number()
      .int()
      .positive(),
  });