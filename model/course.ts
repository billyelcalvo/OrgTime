import  {z } from 'zod';
import '../zod-extend'
export const CourseSchema = z.object({
    id : z.uuid().optional(),
    name : z.string(),
    initTime: z.iso.time({precision: 0}).transform((str)=> new Date(`1970-01-01T${str}Z`))
    .openapi({example: "08:00:00"}),
    finalTime: z.iso.time({precision: 0}).transform((str)=> new Date(`1970-01-01T${str}Z`))
    .openapi({example: "10:00:00"})
}).openapi("Course");

export type Course = z.infer<typeof CourseSchema>;