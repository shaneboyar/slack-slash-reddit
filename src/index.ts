import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import BaseRouter from "./routes";

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", BaseRouter);

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.info("Express server started on port: " + port);
});
