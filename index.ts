import Express from "express";
import {PrismaClient} from "./generated/prisma/client";
import { PrismaPg} from "@prisma/adapter-pg";
import {router} from "./routes/routes"
import "dotenv/config";

const app = Express();
app.use(Express.json());

const port = 3000;

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL || ""});
const prisma = new PrismaClient({adapter});

export default prisma;

app.use('/api',router);

app.listen(port,() =>{
    console.log(`Server running on port :${port}`);
});
