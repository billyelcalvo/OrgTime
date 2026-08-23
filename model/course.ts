import * as z from 'zod';

export const CourseSchema = z.object({
    id : z.uuid().optional(),
    name : z.string(),
    initTime: z.iso.date(),
    finalTime: z.iso.date()
})

export type Course = z.infer<typeof CourseSchema>;