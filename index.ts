import Express from "express";
import {PrismaClient} from "./generated/prisma/client";
import { PrismaPg} from "@prisma/adapter-pg";
import {router} from "./routes/routes"
import "dotenv/config";
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from './docs/openapi';

const app = Express();
app.use(Express.json());

const port = 3000;

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL || ""});
const prisma = new PrismaClient({adapter});

export default prisma;

app.use('/api',router);

const openApiDocument = generateOpenApiDocument();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port,() =>{
    console.log(`Server running on port :${port}`);
});
