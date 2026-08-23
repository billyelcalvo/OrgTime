import * as z from 'zod';

export const NotificationSchema = z.object({
        id : z.uuid().optional(),
        idCourse: z.uuid()
});

export type Notification = z.infer<typeof NotificationSchema>;