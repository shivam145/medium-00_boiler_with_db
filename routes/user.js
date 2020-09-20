import { Router } from "express";
let router = Router();
import { publishToQueue } from "../services/MQService";

router.post("/msg", async (req, res, next) => {
  let { queueName, payload, priority } = req.body;
  setTimeout(() => {
    publishToQueue(queueName, payload, priority);
  }, 2000);
  res.statusCode = 200;
  res.data = { "message-sent": true };
  next();
});

export default router;
