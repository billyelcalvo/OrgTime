import {z} from 'zod';
import "../zod-extend"
export const UserSchema = z.object({
    id : z.uuid(),
    name: z.string(),
    email: z.email(),
    password: z.string().min(72)
}).openapi("User"); 

export const CreateUserSchema = UserSchema.omit({id: true})
.extend({
    password: z.string().min(5).max(36)
}).openapi("CreateUser");

export const LoginUser = UserSchema.omit({id: true, name : true}).
extend({password: z.string().min(5).max(36)}).openapi("LoginUser");

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>