import express from "express";
import { PORT } from "./config/env.js"
import connectToDatabase from "./database/mongoDb.js";

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import workflowRouter from "./routes/workflow.routes.js";

import errorMiddleware from "./middlewares/errors.middlewares.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use ("/api/v1/workflows", workflowRouter);


app.use(errorMiddleware);


app.get("/", (req, res) => {
  res.send("Welcome to the subscription Tracking Api!");
}); 

 const port = PORT || 3000; 

app.listen(port, async () => {
  console.log(
    `Subscription Tracking API is running on http://localhost:${port}`
  );

 await connectToDatabase()
  
});

export default app;
