import express, { Request, Response } from "express";
// import * as cors from "cors"
import noteRoutes from "./routes/noteRouter";
import errorHandler from "./errorHandler";
console.log(process.env.PORT);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

// app.use(cors())
app.use(express.json());
app.use("/notes", noteRoutes);
app.use(errorHandler);
app.listen(PORT, () => console.log("server is started"));
