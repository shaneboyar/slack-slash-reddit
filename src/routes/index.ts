import { Router } from "express";
import {
  DELETE_VALUE,
  deleteMessage,
  SlackMessage,
  publishMessage
} from "../shared/Slack";
import Client from "../shared/RedditClient";

// Init router and path
const router = Router();
const R = new Client();
R.build();

router.post("/search", async (req, res, next) => {
  const message = await R.search(req.body.text);
  res.json(message);
});

router.post("/response", (req, res, next) => {
  const payload = JSON.parse(req.body.payload);
  console.log("payload: ", payload);
  if (payload.actions[0].value === DELETE_VALUE && payload.response_url) {
    deleteMessage(payload.response_url);
  } else {
    const messageBlock = JSON.parse(payload.actions[0].value);
    const message: SlackMessage = {
      text: "Test",
      blocks: [messageBlock]
    };
    deleteMessage(payload.response_url);
    publishMessage(payload.channel.id, message);
  }
});

// Export the base-router
export default router;
