import { Router } from "express";
let router = Router();
import { publishToQueue } from "../services/MQService";

router.post("/msg", async (req, res, next) => {
  let { queueName, payload, priority } = req.body;

  await publishToQueue(queueName, payload, priority);

  res.statusCode = 200;
  res.data = { "message-sent": true };
  next();
});

export default router;
