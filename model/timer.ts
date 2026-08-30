import {z} from "zod";
import '../zod-extend'
export const TimerSchema = z.object({
    id : z.uuid().optional(),
    name : z.string().min(1).max(100),
    hours: z.number().max(6),
    minutes: z.number().max(59),
    seconds: z.number().max(59),
    userId: z.uuid()
}).openapi("Timer");

export type Timer = z.infer<typeof TimerSchema>;