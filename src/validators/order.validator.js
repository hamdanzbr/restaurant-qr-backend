import { z } from "zod";

export const createOrderSchema =
  z.object({
    tableId: z.number(),

    customerName: z
      .string()
      .min(2)
      .optional(),

    customerMobile: z
      .string()
      .optional(),

    notes: z
      .string()
      .optional(),

    items: z
      .array(
        z.object({
          dishId: z.number(),
          quantity: z.number().min(1),
        })
      )
      .min(1),
  });