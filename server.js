import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";
import router from "./routes.js";
import { Log } from "./logger.js";

const app = express();
app.use(bodyParser.json());


app.use(async (req, res, next) => {
  await Log("backend", "debug", "middleware", `Incoming ${req.method} ${req.url}`);
  next();
});

app.use("/", router);

const PORT = 3000;
connectDB().then(() => {
  app.listen(PORT, async () => {
    console.log("Server running")
    await Log("backend", "info", "service", `Server running at http://localhost:${PORT}`);
  });
});
