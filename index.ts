import Express from "express";
import {PrismaClient} from "./generated/";
import { PrismaPg} from "@prisma/adapter-pg";

const app = Express();
app.use(Express.json());

const port = 3000;

