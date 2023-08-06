import express from "express";
import noteRoutes from "./routes/noteRouter";
import errorHandler from "./errorHandler";
require("dotenv").config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const app = express();

app.use(express.json());
app.use("/notes", noteRoutes);
app.use(errorHandler);
app.listen(PORT, () => console.log("server is started"));
