import { z } from "zod";

import { TodoStatus } from "@/src/generated/prisma/browser"; // adjust to your generated client path
export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),

  email: z.email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const notesSchema = z.object({
  title: z.string().max(100, "title cant be more then 60 charactor"),
  content: z.string(),
});

export const taskSchema = z.object({
  title: z.string().max(100, "title cant be more then 60 charactor"),
  description: z.string(),
  dueDate: z.coerce.date().optional(),
  status: z.nativeEnum(TodoStatus).optional(),
});

export const eventSchema = z.object({
  title: z.string().max(100, "title cant be more then 60 charactor"),
  description: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});
