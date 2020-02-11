import dotenv from "dotenv";
dotenv.config();
import { logger } from "./shared/Logger";
import cookieParser from "cookie-parser";
import express from "express";
import BaseRouter from "./routes";

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", BaseRouter);

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info("Express server started on port: " + port);
});
