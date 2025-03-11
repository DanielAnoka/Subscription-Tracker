import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";
import { createSubscription,getSubscriptions,getAllSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/",authorize, getAllSubscriptions);

subscriptionRouter.get("/:id", (req, res) =>
  res.send("Get a subscription details")
);

subscriptionRouter.get("/user/:id", authorize,getSubscriptions
);

subscriptionRouter.post("/",authorize,createSubscription
);

subscriptionRouter.put("/:id", (req, res) => res.send("Update a subscription"));

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send("CANCEL a subscription")
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send("Delete a subscription")
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send("Get upcoming renewals")
);

export default subscriptionRouter;
