import * as z from "zod";

export const TimerSchema = z.object({
    id : z.uuid().optional(),
    name : z.string().min(1).max(100),
    hours: z.number(),
    minutes: z.number(),
    seconds: z.number()
});

export type Timer = z.infer<typeof TimerSchema>;