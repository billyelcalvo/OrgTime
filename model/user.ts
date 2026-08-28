import {z} from 'zod';
import "../zod-extend"
export const UserSchema = z.object({
    id : z.uuid(),
    name: z.string(),
    email: z.email(),
    password: z.string().min(4).max(32)
}).openapi("User"); 

export const CreateUserSchema = UserSchema.omit({id: true}).openapi("CreateUser");

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>